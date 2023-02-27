import React, { useState }  from 'react'
import { Heading, View, Button, Content, NavLink, Link, Image, Flex, Text, Form, ProgressCircle, TextField, TextArea, ActionButton, TableView, TableHeader, Column, TableBody, Row, Cell, StatusLight,
  Picker, Edit, Delete, NumberField} from '@adobe/react-spectrum'
import actions from '../config.json'
import actionWebInvoke from '../utils'
import { async } from 'regenerator-runtime'

function OfferPreview({ offerData, setOfferData , props }) {
  
 

  console.log('offerData', offerData);

  async function invokeAction () {
    console.log("Create Offer invoked")
    const headers =  {}
    const params =  { prompt: offerData.offerPrompt, generations: offerData.offerGenerations}
        // set the authorization header and org from the ims props object
        if (props.ims.token && !headers.authorization) {
          headers.authorization = `Bearer ${props.ims.token}`
        }
        if (props.ims.org && !headers['x-gw-ims-org-id']) {
          headers['x-gw-ims-org-id'] = props.ims.org
        }

    try {
      const actionResponse = await actionWebInvoke(actions["dx-excshell-1/generateCopy"], headers, params)
      formattedResult = actionResponse
      setOfferData({ ...offerData, offerTitle : formattedResult.title, offerDescription: formattedResult.description })
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
        width="1200px"
        name='promptArea'
        onChange={(value) =>
          setOfferData({ ...offerData, offerPrompt : value })
        }
      />

      <NumberField
        label="Variations"
        defaultValue={1}
        minValue={1}
        onChange={(value) =>
          setOfferData({ ...offerData, offerGenerations : value })}
      />
      
      <Flex direction="row" height="size-800" gap="size-100" >
        <Button onPress={invokeAction.bind(this)}>Copywrite</Button>
      </Flex>

      <Flex direction="row" height="size-1250" gap="size-100" >
      <TextArea
        label="Offer Title"
        value={offerData.offerTitle}
        onChange={(value) =>
          setOfferData({ ...offerData, offerTitle : value })
        }
        height="size-1250"
        width="size-3600"
       /> 
       <TextArea
        label="Offer Description"
        value={offerData.offerDescription}
        onChange={(value) =>
          setOfferData({ ...offerData, offerDescription : value })
        }
        height="size-1250"
        width="size-3600"
       /> 
       </Flex>
      </Flex>
    </div>
  );
}

export default OfferPreview;
