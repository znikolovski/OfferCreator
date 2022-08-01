import React, { useState }  from 'react'
import { Heading, View, Button, Content, Link, Image, Flex, Text, Form, ProgressCircle, TextField, Switch, ActionButton, TableView, TableHeader, Column, TableBody, Row, Cell, StatusLight,
  Picker, Edit, Delete, TextArea} from '@adobe/react-spectrum'

function OfferIntent({ offerData, setOfferData  }) {
  return (
    <div className="offer-intent">

      <TextArea 
        isRequired
        value={offerData.keymessage}
        onChange={(input) =>
          setOfferData({ ...offerData, keymessage : input })
        }
        width="size-3600"
        maxWidth="100%"  />

    </div>
  );
}

export default OfferIntent;
