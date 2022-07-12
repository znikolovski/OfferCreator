/* 
* <license header>
*/

import React, { useState }  from 'react'
import { Heading, View, Content, Link, Image, Flex, Text, Form, ProgressCircle, TextField, TextArea, ActionButton, StatusLight,
  Picker, Edit, Delete} from '@adobe/react-spectrum'
import {Item, ListView} from '@react-spectrum/list'

import PropTypes from 'prop-types'
import {useAsyncList} from '@react-stately/data'


import actions from '../config.json'
import actionWebInvoke from '../utils'

const OfferCreator = (props) => {
  const [state, setState] = useState({
    actionResponseError: null,
    actionHeaders: null,
    actionParams: null,
    cfTitle: null,
    cfHeading: null,
    actionParamsValid: null,
    actionInvokeInProgress: false,
    actionResult: null
  })





  return (
    <View width="size-6000">
      <Heading level={1}>Offer Creator</Heading>
      

      <Form maxWidth="size-3600">

      
        <TextField 
            label="Title" isRequired necessityIndicator="label"
            onChange={(input) =>
              setState({ ...state, actionParams : {"title":state.cfTitle, "description":state.cfHeading}, cfTitle: input })
            }
        />

        <TextArea
            label="Description"
            onChange={(input) =>
              setState({ ...state, actionParams : {"title":state.cfTitle, "description":state.cfHeading}, cfHeading: input})
            }
        />

        <Flex>
          <ActionButton
                variant="primary"
                type="button"
                onPress={invokeAction.bind(this)}
              ><Text>Create</Text></ActionButton>

              <ProgressCircle
                aria-label="loading"
                isIndeterminate
                isHidden={!state.actionInvokeInProgress}
                marginStart="size-100"
              />
        </Flex>

   

      </Form>

      {state.actionResponseError && (
        <View padding={`size-100`} marginTop={`size-100`} marginBottom={`size-100`} borderRadius={`small `}>
          <StatusLight variant="negative">Failure! See the complete error in your browser console.</StatusLight>
        </View>
      )}
      {!state.actionResponseError && state.actionResponse && (
        <View padding={`size-100`} marginTop={`size-100`} marginBottom={`size-100`} borderRadius={`small `}>
          <StatusLight variant="positive">Content Fragment created successfully!</StatusLight>
        </View>
      )}

 
    </View>
  )

  async function invokeAction () {
    console.log("Create Offer invoked")
    setState({ ...state, actionInvokeInProgress: true, actionResult: 'calling action ... ' })
    const headers = state.actionHeaders || {}
    const params = state.actionParams || {}
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
      setState({
        ...state,
        actionResponse,
        actionResult:formattedResult,
        actionResponseError: null,
        actionInvokeInProgress: false
      })
      console.log(`Response :`, actionResponse)
    } catch (e) {
      console.error(e)
      
    }
  }

}

OfferCreator.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any
}

export default OfferCreator