import React from "react"
import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router-dom"

import Home from './homepage/Home.js'
import App from '../TestUpload.js'


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
      </>
  )
}

export default ApplicationView