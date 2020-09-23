import React, {useState, useEffect, useRef} from 'react'
import api from '../../hooks/api'
import {Button, Input} from 'reactstrap'
import TrackFile from './TrackFile.js'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import CollaboratorList from './Collaborators.js'


const TrackDetail = props => {
  const trackId = props.id

  const [trackData, setTrack] = useState({})
  const [trackGenre, setGenre] = useState()
  const [trackCreator, setCreator] = useState()
  const [creatorId, setCreatorId] = useState()
  const [uploadDiv, setUploadDiv] = useState(true)
  const [fileToPost, setFile] = useState()
  const [fileLink, setFileLink] = useState("")
  const [uploadLink, setUploadLink] = useState("")
  const [currentUserName, setCurrentUser] = useState()
  const [currentGenreId, setGenreId] = useState()
  const [deleteHidden, setDeleteHidden] = useState(true)
  const [files, setFiles] = useState([])
  const [trackCollabs, setTrackCollabs] = useState([])
  const [collabIds, setCollabIds] = useState([])
  const [collabNames, setCollabNames] = useState([])
  const fileName = useRef()
  const fileDesc = useRef()
  const [currIsCreator, setCurrCreator] = useState(false)
  

  const getCurrentUser = () => {
    api.get('artists', parseInt(localStorage.getItem('user_id')))
      .then(res => {
        setCurrentUser(res.artist_name)
      })
  }
  const getTrackData = () => {
    api.get('tracks', trackId)
    .then(data => {
      setTrack(data)
      getGenre(data.genre)
      getCreator(data.creatorId)
      getCurrentUser()
    })
  }

  const deleteTrack = () => {
    api.delete('tracks', trackData.id)
    props.history.push('/tracks')
    window.location.reload()
  }

  const getGenre = (url) => {
    api.getGenre(url)
    .then(genre => {
      setGenre(genre.genre_name)
      setGenreId(genre.id)
    })
  }

  const getFiles = (id) => {

    const trackFiles = []
    api.getTrackFiles(id)
    .then(files => {
      for(const file in files){
        trackFiles.push(files[file])
      }
      setFiles(trackFiles)
    })
  }

  const getCollaborators = (trackId) => {
    const collabs = []
    const names = []
    const ids = []
    api.getWithParam('collaborators', 'track', trackId)
      .then(collaborators => {
        for(const x in collaborators){
          collabs.push(collaborators[x])

        }
        console.log(collabs)
        for(const x in collabs){
          api.getLinkedData(collabs[x].artist)
          .then(artist => {
            names.push({'name': artist.artist_name, 'id': artist.id, 'collabId': collabs[x].id })
            ids.push(artist.id)
          })
        }
        console.log(names, ids)
        setCollabNames(names)
        setCollabIds(ids)
      })
  }

  const getCreator = (url) => {
    api.getCreator(url)
    .then(creator => {
      setCreator(creator.artist_name)
      setCreatorId(creator.id)
      if(creator.id === parseInt(localStorage.getItem('user_id'))){
        setDeleteHidden(false)
        setCurrCreator(true)
      }
    })
  }

  const onUpload = (e) => {
    if(fileName.current.value === ""){
      window.alert("Please input a file name and then reupload your file.")
    }
    const file = e.target.files[0]
    if(!file){
      return window.alert("No file was uploaded.")
    }
    getSignedUrl(file)
  }

  const getSignedUrl = (file) => {
    const trackName = trackData.track_name.replace(/ /g, "_") + "_"
    const currFileName = fileName.current.value
    const formattedFileName = currFileName.replace(/ /g, "_")
    let fileTypeFull = file.type
    let fileType = ""
    if(fileTypeFull.length > 9){
      fileType = fileTypeFull.slice(-4)
    }
    else{
      fileType = fileTypeFull.slice(-3)
    }
    const file_name = trackName + formattedFileName + "." + fileType
    axios.get("http://localhost:8000/create_signed_link", {params: {file_name}})
      .then(response => {
        const postData = new FormData()
        for(const property in response.data.signed_url.fields){
          postData.append(property, response.data.signed_url.fields[property])
        }
        postData.append('file', file)
        setFile(postData)
        setFileLink(response.data.url)
        setUploadLink(response.data.signed_url.url)
      })
    
  }

  const handleUpload = () => {
    axios.post(uploadLink, fileToPost)
    const newFile = {
      'file_name': fileName.current.value,
      'file_description': fileDesc.current.value,
      'track_id': trackData.id,
      'file_url': fileLink,
    }
    api.post('files', newFile)
    .then(res => {console.log(res)})
  }

  const createRemix = () => {
    console.log(files)
    const currentUser = parseInt(localStorage.getItem("user_id"))
    let remixId = 0
    if(creatorId === currentUser){
      return window.alert("You can't remix a track you created!")
    }
    const remixData = {
      "track_name": trackData.track_name + ' (' + currentUserName + ' Remix)',
      'genre_name': currentGenreId,
      'open_for_remix': false,
      'bpm': trackData.bpm
    }
    api.post('tracks', remixData)
    .then(res => {
      remixId = res.id
    })
    .then(() => {
      for(const file in files){
        const fileToRemix = {
          'file_name': files[file].name,
          'file_description': files[file].description,
          'track_id': remixId,
          'file_url': files[file].url,
        }
        api.post('files', fileToRemix)
      }
      props.history.push(`/tracks/${remixId}`)
      window.location.reload()
    })
  }

  const toggleUploadDiv = () => {
    setUploadDiv(!uploadDiv)
  }
  

  useEffect(() => {
    getTrackData()
    getFiles(trackId)
    getCollaborators()
  }, [])
  
  return(
    <>
      <h1>{trackData.track_name} - {trackCreator}</h1>
      <Button hidden={deleteHidden} onClick={deleteTrack}>Delete</Button>
      <Button hidden={deleteHidden} onClick={() => props.history.push(`/tracks/${trackId}/edit`)}>Edit</Button>
      <h2>{trackGenre} | {trackData.bpm} BPM</h2>
      <Button onClick={createRemix}>Remix</Button>
      <hr />
      <div className="track_files">
        <div className="add_file"> 
          <h3>Track Files</h3> 
          <Button outline color="success" size="sm" onClick={toggleUploadDiv}>+</Button>
        </div>
        <div hidden={uploadDiv}>
          <Input placeholder="File Name" innerRef={fileName}/>
          <Input placeholder="File Description" innerRef={fileDesc}/>
          <input type="file" accept="audio/*" onChange={onUpload}/>
          <Button onClick={handleUpload}>Upload</Button>
          {files.map(file => <TrackFile {...props} data={file} key={file.id}/>)}
        </div>
      </div>
      <div className="collaborators">
        <h3>Collaborators</h3>
        {collabNames.map(name => <CollaboratorList {...props} data={name} creator={currIsCreator} key={name.id}/>)}
      </div>
      <Button onClick={() => console.log(collabNames)}>Test</Button>
      
    </>
  )
}

export default withRouter(TrackDetail)