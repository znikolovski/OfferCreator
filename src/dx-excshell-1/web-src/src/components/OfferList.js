/* 
* <license header>
*/

import React, { useState }  from 'react'
import { Heading, View, Content, Link, Image, Text, TextArea, StatusLight, ActionButton, Button, ActionMenu, Edit, Card, Delete, Flex, TableView, TableHeader, Column, TableBody, Row, Cell, IllustratedMessage} from '@adobe/react-spectrum'
import NotFound from '@spectrum-icons/illustrations/NotFound';
import EditIcon from '@spectrum-icons/workflow/Edit';
import {Item, ListView} from '@react-spectrum/list';

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
    {name: 'Content Fragment', uid: 'cfpath', width: 200},
    {name: 'Experience Fragment', uid: 'xfpath', width: 200}

  ];

  
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
      
      console.log('res', res);

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
              <Cell>{item.title}</Cell>
              <Cell>{item.description}</Cell>
              <Cell>{item.modifiedby}</Cell>
              <Cell><StatusLight variant="positive"><ActionButton width="size-800" onClick={() => openInNewTab(item.cfedit)}><EditIcon width="size-175" marginEnd="size-130" /><Text> Edit</Text></ActionButton></StatusLight>
                </Cell>
              <Cell><ActionButton onClick={() => openInNewTab(item.cfedit)}><Text>Create</Text></ActionButton></Cell>
            </Row>
 //           <Row key={item.name}>{(key) => <Cell>{item[key]}</Cell>}</Row>
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