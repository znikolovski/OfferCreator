/* 
* <license header>
*/

import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Heading, Header, ActionGroup, ActionButton, Text,Button, View, TagGroup, Item, Avatar, Image, Selection, ProgressCircle, Flex } from '@adobe/react-spectrum'
import EditIcon from '@spectrum-icons/workflow/Edit';
import UploadToCloud from '@spectrum-icons/workflow/UploadToCloud';
import { actionWebInvoke } from '../utils';
import actions from '../config.json'

function PreviewSideBar ({offerData, items, setOfferData, setItems, props}) {
  const [aemUploading, setIsAEMUploading] = useState(false);

  let showDetails = true;

  const updateVariation = (variation) => {
    console.log("Updating selected audience: ", variation)
    console.log("Audience: ", items[variation - 1])
    setOfferData({ ...offerData, activeAudience: items[variation - 1]})
  }

  async function invokeOfferCreatorAction () {
        setIsAEMUploading(true);
        console.log("Offer Creation Action invoked")
        const headers =  {}
        const cfData = [];
        
        // set the authorization header and org from the ims props object
        if (props.ims.token && !headers.authorization) {
            headers.authorization = `Bearer ${props.ims.token}`
        }
        if (props.ims.org && !headers['x-gw-ims-org-id']) {
            headers['x-gw-ims-org-id'] = props.ims.org
        }

        try {
          for (let index = 0; index < items.length; index++) {
            const item = items[index];
            const params =  { name: item.name, selectedImage: item.selectedImage, prompt: item.fireflyPrompt}
            console.log(params)
            const actionResponse = await actionWebInvoke(actions["dx-excshell-1/createImage"], headers, params)
            console.log('Response received', actionResponse)
            const newItem = {
              firefallReponse: item.firefallReponse,
              imagePath: actionResponse,
              id: item.id,
              name: item.name,
              description: item.keywords
            }
            cfData.push(newItem);
          }

          const actionResponse = await actionWebInvoke(actions["dx-excshell-1/createOffer"], headers, {cfData: cfData})
          console.log('Response received', actionResponse)
          setIsAEMUploading(false);
          return actionResponse;
        } catch (e) {
          console.error(e)
          
        }
    }

  console.log('Show Details: ', showDetails);

  const layoutItems = [
    {id: 1, name: 'Web Banner 1920 x 390'},
    {id: 2, name: 'Web Banner 1300 x 435'},
    {id: 3, name: 'Web Banner 440 x 770'},
    {id: 4, name: 'Email Banner 1920 x 450'},
    {id: 5, name: 'App 150 x 150'},
    {id: 6, name: 'Digital Signage 1080 x 1920'}
  ];

  return (
    <View position='sticky' top='size-0' start='size-0' >
      <View isHidden={!showDetails}>

        <Header><strong>Segments</strong></Header>
        <ActionGroup selectionMode="single" defaultSelectedKeys={[items[0].id]} marginTop="10px" marginBottom="20px" onAction={updateVariation} >
          {items.map(function(item){
            return <Item key={item.id}>{item.name}</Item>;
          })}
        </ActionGroup>

        <Header><strong>Layouts</strong></Header>
        <TagGroup items={layoutItems} aria-label="Layouts TagGroup" marginBottom="20px">
            {item => <Item>{item.name}</Item>}
        </TagGroup>

        <Flex direction="row" height="size-800" gap="size-100" marginTop="size-200">
        <Button width="size-1400" aria-label="Upload NBC to AEM" marginTop="20px" marginEnd="10px" onPress={() => invokeOfferCreatorAction()}><UploadToCloud width="size-200" /><Text>Send to AEM</Text></Button>
          <ProgressCircle
              aria-label="loading"
              isIndeterminate
              isHidden={!aemUploading}
              marginStart="size-100"
          />
          </Flex>
        </View>
 
      </View>
  )
}

export default PreviewSideBar
