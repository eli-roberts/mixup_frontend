import React from 'react'
import { Container, Button } from 'reactstrap'
import './LoggedIn.css'

const HomeLoggedIn = props => {


  return(
    <>
      <Container className="main-container">
      
        <Container className="header-container">
          <h1>Welcome to MixUp!</h1>
        </Container>
        <Container className="subheader-container">
          <h3>Feeling creative? Take a look around!</h3>
        </Container>
        <hr className="text-container-div"/>
        <Container className="button-container">
          <Button onClick={() => {props.history.push('/tracks/new')}}>Create a Track</Button>
          <Button onClick={() => {props.history.push('/tracks')}}>Check out Some Tracks</Button>
          <Button onClick={() => {props.history.push('/tracks/remixable')}}>Remix a Track</Button>
        </Container>
      </Container>
    </>
  )
}

export default HomeLoggedIn