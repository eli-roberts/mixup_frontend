import React, {useState, useEffect} from 'react'
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap'
import api from '../../hooks/api'
import './TrackCard.css'

const TrackCard = props => {
  const trackData = props.data
  const [trackCreator, setCreator] = useState()

  const getCreator = () => {
    api.getCreator(trackData.creatorId)
    .then(creator => {
      setCreator(creator.artist_name)
    })

  }

  useEffect(() => {
    getCreator()
  },[])

  return(
    <>
      <Card className="track-card">
        <CardTitle>{trackData.track_name}</CardTitle>
        <CardSubtitle>Produced By: {trackCreator}</CardSubtitle>
      </Card>
    </>
  )
}

export default TrackCard