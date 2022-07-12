/* 
* <license header>
*/

import React, { useState }  from 'react'
import { Heading, View, Content, Link, Image, Text, TextArea, ActionMenu, Edit, Delete} from '@adobe/react-spectrum'
import {Item, ListView} from '@react-spectrum/list'

import PropTypes from 'prop-types'
import {useAsyncList} from '@react-stately/data'


import actions from '../config.json'
import actionWebInvoke from '../utils'

const OfferList = (props) => {
  const [state, setState] = useState({
    actionResponseError: null,
    actionHeaders: null,
    actionParams: null,
    actionInvokeInProgress: false,
    actionResult: null
  })

  let assetList = useAsyncList({
    async load({signal}) {
      const headers = state.actionHeaders || {}
      const params = state.actionParams || {}

      // set the authorization header and org from the ims props object
      if (props.ims.token && !headers.authorization) {
        headers.authorization = `Bearer ${props.ims.token}`
      }
      if (props.ims.org && !headers['x-gw-ims-org-id']) {
        headers['x-gw-ims-org-id'] = props.ims.org
      }
      
      
      
      setState({ ...state, actionInvokeInProgress: true, actionResult: 'calling action ... ' })
      let res = await actionWebInvoke(actions['getOffers'], headers, params);
      setState({ ...state, actionInvokeInProgress: false, actionResult: ' ' })
      
      console.log('res', res);

      return {
        items: res

      }
    }
  });



  return (
    <View width="size-6000">
      <Heading level={1}>Offers</Heading>

      <ListView
        items={assetList.items}
        selectionMode="multiple"
        aria-label="Static ListView items example"
        maxWidth="size-6000"
      >
         {(item) => (
          <Item key={item.id} textValue={item.title}>
              <Text>{item.title} - {item.description} </Text>
          </Item>
          )}
      </ListView>

      {state.actionResponseError && (
        <View padding={`size-100`} marginTop={`size-100`} marginBottom={`size-100`} borderRadius={`small `}>
          <StatusLight variant="negative">Failure! See the complete error in your browser console.</StatusLight>
        </View>
      )}

      <TextArea
            label="Debug"
            isReadOnly={true}
            width="size-6000"
            height="size-6000"
            maxWidth="100%"
            value={state.actionResult}
          />
    </View>
  )
}

OfferList.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any
}

export default OfferList