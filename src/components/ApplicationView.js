import React, {useState} from "react"
import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router-dom"

import Home from './homepage/Home.js'
import App from '../TestUpload.js'
import CreateTrack from './track/CreateTrack.js'
import HomeLoggedIn from './homepage/HomeLoggedIn.js'
import TrackList from './track/TrackList.js'
import TrackDetail from './track/TrackDetails.js'
import RemixableTrackList from './track/RemixableTrackList'

const ApplicationView = props => {


  return (
    <>
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
        exact path="/tracks/new"
        render={
          props => {return <CreateTrack {...props}/>}
        }
      />

      <Route
        exact path="/home"
        render={
          props => {return <HomeLoggedIn {...props} />}
        }
      />

      <Route
      exact path="/tracks"
      render={
        props => {return <TrackList {...props} />}
        }
      />

      <Route
        exact path="/tracks/:id(\d+)" 
        render={
          props => {return <TrackDetail id={props.match.params.id}/>}
        }/>

        <Route
          exact path='/tracks/remixable'
          render={
            props => {return <RemixableTrackList {...props}/>}
          }/>



      </>  
  )
}

export default ApplicationView