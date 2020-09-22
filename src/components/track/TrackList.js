import React, {useState, useEfect, useEffect} from 'react'
import api from '../../hooks/api'
import TrackCard from './TrackCard.js'
import {Button} from 'reactstrap'


const TrackList = props => {
  const [tracks, setTracks] = useState([])
  
  
  const getTracks = () => {
    api.getAll("tracks")
    .then(response => {
      console.table(response)
      setTracks(response)
      console.table(tracks)
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
        <Button onClick={()=> console.log(tracks)}>Test</Button>
      </div>
    </>
  )
}

export default TrackList