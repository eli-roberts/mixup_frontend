import React, {useState, useEfect, useEffect} from 'react'
import api from '../../hooks/api'
import TrackCard from './TrackCard.js'


const RemixableTrackList = props => {
  const [tracks, setTracks] = useState([])
  
  
  const getTracks = () => {
    api.getRemixableOnly()
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

export default RemixableTrackList