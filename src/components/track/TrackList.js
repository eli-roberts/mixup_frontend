import React, {useState, useEfect, useEffect} from 'react'
import api from '../../hooks/api'
import TrackCard from './TrackCard.js'
import {Button} from 'reactstrap'


const TrackList = props => {
  const [tracks, setTracks] = useState([])
  
  
  const getTracks = () => {
    api.getAll("tracks")
    .then(response => {
      setTracks(response)
    })
  }
  useEffect(() => {
    getTracks()
  },[])

  return(
    <>
      <h1>Hello</h1>
      <div className="track-cards">
        {tracks.map(track => <TrackCard {...props} data={track} key={track.id}/>)}
      </div>
    </>
  )
}

export default TrackList