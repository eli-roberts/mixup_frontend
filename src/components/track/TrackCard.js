import React, {useState, useEffect} from 'react'
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap'
import api from '../../hooks/api'
import './TrackCard.css'

const TrackCard = props => {
  const trackData = props.data
  const [trackCreator, setCreator] = useState()
  const [trackGenre, setGenre] = useState()

  const getCreator = () => {
    api.getCreator(trackData.creatorId)
    .then(creator => {
      setCreator(creator.artist_name)
    })

  }

  const getGenre = () => {
    api.getGenre(trackData.genre)
    .then(genre => {
      setGenre(genre.genre_name)
    })
  }

  useEffect(() => {
    getCreator()
    getGenre()
  },[])

  return(
    <>
      <Card className="track-card">
        <CardTitle className="card-title">{trackData.track_name}</CardTitle>
        <CardSubtitle className="card-producer">Produced By: {trackCreator}</CardSubtitle>
        <CardBody className="card-bpm">{trackData.bpm} BPM</CardBody>
        <CardBody className="card-genre">{trackGenre}</CardBody>
        <Button className="details-btn" onClick={() => props.history.push(`/tracks/${trackData.id}`)} size="sm">Details</Button>
      </Card>
    </>
  )
}

export default TrackCard