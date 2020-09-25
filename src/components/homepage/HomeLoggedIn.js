import React from 'react'
import { Container, Button } from 'reactstrap'
import './LoggedIn.css'

const HomeLoggedIn = props => {

  const source1 = [
    'https://photofantastic.s3.us-east-2.amazonaws.com/banner1_gray.png',
    'https://photofantastic.s3.us-east-2.amazonaws.com/banner1_color.png'
  ]
  const source2 = [
    'https://photofantastic.s3.us-east-2.amazonaws.com/banner2_gray.png',
    'https://photofantastic.s3.us-east-2.amazonaws.com/banner2_color.png'
  ]
  const source3 = [
    'https://photofantastic.s3.us-east-2.amazonaws.com/banner3_gray.png',
    'https://photofantastic.s3.us-east-2.amazonaws.com/banner3_color.png'
  ]


  return(
    <>
      {/* <Container className="main-container">
      
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
        </Container> */}
        <Container className="banner-container">
          {/* <Container className="banner-1"></Container>
          <Container className="banner-2"></Container>
          <Container className="banner-3"></Container> */}
          <img className="banner-left" 
            src={source1[0]}
            onMouseOver={e => e.currentTarget.src = source1[1]}
            onMouseOut={e => e.currentTarget.src = source1[0]}
            onClick={() => {props.history.push('/tracks/new')}}
            />
          <img className="banner-center" 
            src={source2[0]}
            onMouseOver={e => e.currentTarget.src = source2[1]}
            onMouseOut={e => e.currentTarget.src = source2[0]}
            onClick={() => {props.history.push('/tracks')}}
            />
          <img className="banner-right" 
            src={source3[0]}
            onMouseOver={e => e.currentTarget.src = source3[1]}
            onMouseOut={e => e.currentTarget.src = source3[0]}
            onClick={() => {props.history.push('/tracks/remixable')}}
            />
        </Container>
      {/* </Container> */}
    </>
  )
}

export default HomeLoggedIn