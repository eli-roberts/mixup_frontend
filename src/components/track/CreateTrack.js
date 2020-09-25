import React, {useState, useEffect, useRef} from 'react'
import {InputGroup, InputGroupAddon, InputGroupButtonDropdown, Input, InputGroupText, Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Container} from 'reactstrap'
import api from '../../hooks/api'
import './CreateTrack.css'


const CreateTrack = props => {
  const [genres, setGenres] = useState([])
  const [dropdown, setDropdown] = useState(false)

  const trackName = useRef()
  const [remixable, setRemixable] = useState(false)
  const [genreSelection, selectGenre] = useState("Genre")
  const [genreId, setGenreId] = useState(0)
  const bpm = useRef()
  const [collaboratorName, setCollabName] = useState()
  const [collaborators, setCollaborators] = useState([])
  
  const getGenres = () => {
    api.getAll('genres')
      .then(genreList => {
        const genreArr = []
        for(const genre in genreList){
          const genreData = {key: genreList[genre].id, value: genreList[genre].genre_name}
          genreArr.push(genreData)
        }
        setGenres(genreArr)
      })
    
  }

  const addToCollaborators = () => {
    if(collaboratorName){
        const collabToAdd = collaborators
        collabToAdd.push(collaboratorName)
        setCollaborators(collabToAdd)
        setCollabName("")
      return
    }
    else{
      return window.alert('Please specify a user to add as a collaborator.')
    }
  }
  const toggleDrop = () => {
    setDropdown(!dropdown)
  }
  const genreDropdown = (genre) => {
    selectGenre(genre.value)
    setGenreId(genre.key)
  }
  const submit = () => {
    const newTrackData = {
      "track_name": trackName.current.value,
      "genre_name": genreId,
      "open_for_remix": remixable,
      "bpm": bpm.current.value
    }
    api.post("tracks", newTrackData)
      .then(res => {
        if(collaborators.length > 0){
          for(const collaborator in collaborators){
            const newCollaborator = {
              'track_id': res.id,
              'artist_name': collaborators[collaborator]
            }
            api.post('collaborators', newCollaborator)
          }
        }
        props.history.push(`/tracks/${res.id}`)
      })
  }

  useEffect(() => {
    getGenres()
  },[])
  
  return (
    <>
      <Container className="create-form-container">
        <div className="create-track-input">
          <InputGroup className="track-name-input">
            <InputGroupAddon addonType="prepend">
              <InputGroupText className='input-addon'>Track Name</InputGroupText>
            </InputGroupAddon>
            <Input className="input-field" placeholder="Track Name" innerRef={trackName}/>
          </InputGroup>

          <br />
        
          <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="input-addon-1">Select Genre</InputGroupText>
          </InputGroupAddon>
            <Dropdown isOpen={dropdown} toggle={toggleDrop}>
              <DropdownToggle caret>
                {genreSelection}
              </DropdownToggle>
              <DropdownMenu className="dropdown-main">
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
              <InputGroupText className="input-addon">
                Available to remix?
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupAddon addonType="append">
              <InputGroupText className="checkbox-bg">
                <Input className="checkbox" addon type="checkbox" onChange={() => setRemixable(!remixable)}/>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <br/>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="input-addon">
                Track Tempo
              </InputGroupText>
            </InputGroupAddon>
            <Input className="input-field" type="number" innerRef={bpm}/>
          </InputGroup>
          <br/>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="input-addon">
                Add Collaborator?
              </InputGroupText>
            </InputGroupAddon>
              <Input className="input-field" placeholder="Username" onChange={(e) => setCollabName(e.currentTarget.value)} value={collaboratorName}/>
              <Button className="add-collab-btn" outline size='sm' onClick={addToCollaborators}>+</Button>
          </InputGroup>
          <br/>
        <Button onClick={submit} className="submit-btn">Submit</Button>
        </div>
      </Container>
    </>
  )
}


export default CreateTrack