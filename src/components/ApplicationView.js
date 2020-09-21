import React from "react"
import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router-dom"

import Home from './homepage/Home.js'
import App from '../TestUpload.js'
import CreateTrack from './track/CreateTrack.js'
import HomeLoggedIn from './homepage/HomeLoggedIn.js'

const ApplicationView = props => {
  return (
    <>
      {/* //Navbar Here */}

      <Route 
        exact path="/" 
        render={
          props => {return <Home {...props} /> }
        } 
      />

      <Route
        exact path="/test"
        render={
          props => {return <App {...props}/>} 
        }
      />

      <Route
        exact path="/create"
        render={
          props => {return <CreateTrack {...props}/>}
        }
      />

      
      </>
      
  )
}

export default ApplicationView