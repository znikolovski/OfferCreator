import React, { useState }  from 'react'
import { Heading, View, Button, Content, NavLink, Link, Image, Flex, Text, Form, ProgressCircle, TextField, TextArea, ActionButton, TableView, TableHeader, Column, TableBody, Row, Cell, StatusLight,
  Picker, Edit, Delete, NumberField, Grid} from '@adobe/react-spectrum'
import actions from '../config.json'
import actionWebInvoke from '../utils'
import { async } from 'regenerator-runtime'
import PreviewSideBar from './PreviewSideBar'
import PreviewHome from './PreviewHome'

function OfferPreview({ offerData, items, setOfferData, setItems, props }) {

  console.log(offerData)

  return (
    <Grid
      areas={['sidebar content']}
      columns={['350px', '3fr']}
      rows={['auto']}
      gap='size-100'
    >
      <View 
          gridArea='sidebar'
          padding='size-200'>
          <PreviewSideBar offerData={offerData} items={items} setOfferData={setOfferData} setItems={setItems} props={props}></PreviewSideBar>
      </View>
      <View
        paddingTop='size-600'>
        <PreviewHome offerData={offerData} items={items} setOfferData={setOfferData} setItems={setItems}></PreviewHome>
      </View>
    </Grid>
  );
}

export default OfferPreview;
