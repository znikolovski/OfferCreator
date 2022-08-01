import React, { useState }  from 'react'
import { Heading, View, Button, Content, Link, Image, Flex, Text, Form, ProgressCircle, TextField, TextArea, ActionButton, TableView, TableHeader, Column, TableBody, Row, Cell, StatusLight,
  Picker, Edit, Delete} from '@adobe/react-spectrum'
import actions from '../config.json'
import actionWebInvoke from '../utils'
import { async } from 'regenerator-runtime'

function OfferPreview({ offerData, setOfferData , props }) {
  
 

  console.log('offerData', offerData);

  async function invokeAction () {
    console.log("Create Offer invoked")
    const headers =  {}
    const params =  {}
        // set the authorization header and org from the ims props object
        if (props.ims.token && !headers.authorization) {
          headers.authorization = `Bearer ${props.ims.token}`
        }
        if (props.ims.org && !headers['x-gw-ims-org-id']) {
          headers['x-gw-ims-org-id'] = props.ims.org
        }

    try {
      const actionResponse = await actionWebInvoke(actions["dx-excshell-1/createOffer"], headers, params)
      formattedResult = JSON.stringify(actionResponse,0,2)
      console.log(`Response :`, actionResponse)
    } catch (e) {
      console.error(e)
      
    }
  }

  async function writeCopy () {
    console.log ("Writing copy"); 
    newcopy = "Inviting our subscribers to trial our latest blend.";
    setOfferData({ ...offerData, offerCopy : newcopy })
  }

  return (

    
    <div className="other-info-container">
          <Flex direction="column" height="size-800" gap="size-100" marginTop="size-300">
  
      <TextArea
        label="Creative Brief"
        height="size-1250"
        width="size-3600"
        value={"Create an offer for " + offerData.keymessage + " targetting an audience of " + offerData.selectedAudience.name + "."}
      />
      
      <Flex direction="row" height="size-800" gap="size-100" >
        <ActionButton onPress={writeCopy.bind(this)}>Copywrite</ActionButton>
      </Flex>

      <TextArea
        label="Offer Copy"
        value={offerData.offerCopy}
        onChange={(value) =>
          setOfferData({ ...offerData, offerCopy : value })
        }
        height="size-1250"
        width="size-3600"
       />



      </Flex>
    </div>
  );
}

export default OfferPreview;
