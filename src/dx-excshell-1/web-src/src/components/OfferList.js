/* 
* <license header>
*/

import React, { useState }  from 'react'
import { Heading, View, Content, ContextualHelp, Link, Image, Text, TextArea, StatusLight, ActionButton, Button, ActionMenu, Edit, Card, Delete, Flex, TableView, TableHeader, Column, TableBody, Row, Cell, IllustratedMessage} from '@adobe/react-spectrum'
import NotFound from '@spectrum-icons/illustrations/NotFound';
import EditIcon from '@spectrum-icons/workflow/Edit';
import AddIcon from '@spectrum-icons/workflow/Add';


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

  function renderEmptyState() {
    return (
      <IllustratedMessage>
        <NotFound />
        <Heading>No results</Heading>
        <Content>No results found</Content>
      </IllustratedMessage>
    );
  }

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  let columns = [
    {name: 'Offer ID', uid: 'title', width: 100},
    {name: 'Description', uid: 'description', width: 400},
    {name: 'Modified by', uid: 'modifiedby', width: 200},
    {name: 'Status', uid: 'status', width: 120},
    {name: 'Content Fragment', uid: 'cfpath', width: 200},
    {name: 'Experience Fragment', uid: 'xfpath', width: 200}

  ];

  
   // invokes a the selected backend actions with input headers and params
  async function invokeXFCopyAction (offer) {
    console.log("Creating your XF for offer " + offer);

    const headers = state.actionHeaders || {}
    const params = state.actionParams || {}
          // set the authorization header and org from the ims props object
          if (props.ims.token && !headers.authorization) {
            headers.authorization = `Bearer ${props.ims.token}`
          }
          if (props.ims.org && !headers['x-gw-ims-org-id']) {
            headers['x-gw-ims-org-id'] = props.ims.org
          }
    
          let res = await actionWebInvoke(actions['copyXFandRename'], headers, params);
          console.log('copyXFandRename Action Result: ', res);
          
  }

  let list = useAsyncList({
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
      
      console.log('Offers (Content Fragments) returned: ', res);

      return {
        items: res

      }
    }
  });



  return (
    <View>
      <Heading level={1}>Offers</Heading>
      <Flex minHeight="size-3000" height="100%" width="100%" direction="column" gap="size-150">
      <TableView
          aria-label="A table that lists Offers"
          renderEmptyState={renderEmptyState}
          flex
          density="spacious" 
          >
          <TableHeader columns={columns}>
            {column => (
              <Column
                key={column.uid}
                width={column.width}
                align={column.uid === 'date' ? 'end' : 'start'}>
                {column.name}
              </Column>
            )}
          </TableHeader>
          <TableBody
          items={list.items}
          loadingState={list.loadingState}
        
        >
          {(item) => (
            <Row key={item.title}>
              <Cell>
                {item.title}
                <ContextualHelp variant="info">
                  <Heading>Preview coming soon</Heading>
                </ContextualHelp>
              </Cell>
              <Cell>{item.description}</Cell>
              <Cell>{item.modifiedby}</Cell>
              <Cell><StatusLight variant="positive"></StatusLight></Cell>
              <Cell><ActionButton width="size-800" aria-label="Edit Content Fragment" onPress={() => openInNewTab(item.cfedit)}><EditIcon width="size-175" marginEnd="size-130" /><Text> Edit</Text></ActionButton>
                </Cell>
              <Cell><ActionButton width="size-1000" aria-label="Create Experience Fragment" onPress={() => invokeXFCopyAction(item.title)}><AddIcon width="size-175" marginEnd="size-125" /><Text>Create</Text></ActionButton></Cell>
            </Row>
          )}
        </TableBody> 
      </TableView>
      </Flex>
      <Button marginTop="size-100"><Text>Create Offer</Text></Button>
      
    </View>
  )
}



OfferList.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any
}

export default OfferList