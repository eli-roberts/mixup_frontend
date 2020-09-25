import React, {useState, useEfect, useEffect} from 'react'
import api from '../../hooks/api'
import TrackCard from './TrackCard.js'
import './List.css'

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
      <div className="track-cards">
        {tracks.map(track => <TrackCard {...props} data={track} key={track.id}/>)}
      </div>
    </>
  )
}

export default TrackList