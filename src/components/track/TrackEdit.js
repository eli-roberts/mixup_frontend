import React, {useState, useEffect, useRef} from 'react'
import {InputGroup, InputGroupAddon, InputGroupButtonDropdown, Input, InputGroupText, Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Container} from 'reactstrap'
import api from '../../hooks/api'
import './CreateTrack.css'
import {withRouter} from 'react-router-dom'

const TrackEdit = props => {
  const trackId = props.id

  const [dropdown, setDropdown] = useState(false)
  const [genres, setGenres] = useState([])


  const [trackName, setTrackName] = useState()
  const [genreSelection, selectGenre] = useState()
  const [genreId, setGenreId] = useState(0)
  const [remixable, setRemixable] = useState(false)
  const [bpm, setBpm] = useState()

  const submit = () => {
    const updatedTrackData = {
      "track_name": trackName,
      "genre_name": genreId,
      "openForRemix": remixable,
      "bpm": bpm
    }
    api.put("tracks", trackId,  updatedTrackData)
      // .then(props.history.push(`/tracks/${trackId}`))
      .then(() => {return window.alert('Track update successful')})
  }


  const getTrackData = () => {
    api.get('tracks', trackId)
    .then(data => {
      setTrackName(data.track_name)
      setRemixable(data.openForRemix)
      setBpm(data.bpm)
      api.getAll('genres')
        .then(genres => {
          const genreArr = []
          for(const genre in genres){
            if(genres[genre].url == data.genre){
              setGenreId(genres[genre].id)
              selectGenre(genres[genre].genre_name)
            }
            const genreData = {key: genres[genre].id, value: genres[genre].genre_name}
            genreArr.push(genreData)
          }
          setGenres(genreArr)
        })
        
    })
  }

  const getGenres = () => {
    api.getAll('genres')
      .then(genreList => {

      })
    
  }

  const genreDropdown = (genre) => {
    selectGenre(genre.value)
    setGenreId(genre.key)
  }

  const toggleDrop = () => {
    setDropdown(!dropdown)
  }
  useEffect(() => {
    getTrackData()
    getGenres()
  },[])

  return (
    <>
      <Container className="temp">
        <div className="create-track-input">
          <InputGroup className="track-name-input">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Track Name</InputGroupText>
            </InputGroupAddon>
            <Input value={trackName} onChange={e => setTrackName(e.target.value)}/>
          </InputGroup>

          <br />
        
          <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Select Genre</InputGroupText>
          </InputGroupAddon>
            <Dropdown isOpen={dropdown} toggle={toggleDrop}>
              <DropdownToggle caret>
                {genreSelection}
              </DropdownToggle>
              <DropdownMenu>
                {genres.map(
                  genre => <DropdownItem  
                  key={genre.key} 
                  onClick={() => genreDropdown(genre)}>
                    {genre.value}
                      </DropdownItem>)}
              </DropdownMenu>
            </Dropdown>
          </InputGroup>
          <br/>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                Available to remix?
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <Input addon type="checkbox" onChange={() => setRemixable(!remixable)}/>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <br/>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                Track Tempo
              </InputGroupText>
            </InputGroupAddon>
            <Input type="number" value={bpm} onChange={e => setBpm(e.target.value)} />
          </InputGroup>
          <br/>
        <Button onClick={submit} className="submit-btn">Submit</Button>
        </div>
      </Container>
    </>
  )
}

export default withRouter(TrackEdit)