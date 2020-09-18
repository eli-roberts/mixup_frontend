import React, {useState, useEffect, useRef} from 'react'
import {InputGroup, InputGroupAddon, InputGroupButtonDropdown, Input, InputGroupText} from 'reactstrap'


const CreateTrack = props => {


  return (
    <>
      <h1>Create a Track</h1>
      <InputGroup>
        <InputGroupAddon type="prepend">
          <InputGroupText>Track Title:</InputGroupText>
        </InputGroupAddon>
        <Input/>
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon type="prepend">
          <InputGroupText>Genre:</InputGroupText>
        </InputGroupAddon>
        <Input/>
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon type="prepend">
          <InputGroupText>BPM:</InputGroupText>
        </InputGroupAddon>
        <Input/>
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon type="prepend">
          <InputGroupText>Add Collaborator?:</InputGroupText>
        </InputGroupAddon>
        <Input/>
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroupAddon type="prepend">
          <InputGroupText>Open For Remixes:</InputGroupText>
        </InputGroupAddon>
        <Input/>
      </InputGroup>
    </>
  )
}


export default CreateTrack