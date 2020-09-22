import React, {useState, useEffect, useRef} from 'react'
import api from '../../hooks/api'
import {Button, Input} from 'reactstrap'
import TrackFile from './TrackFile.js'
import axios from 'axios'


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

  const fileName = useRef()
  const fileDesc = useRef()
  const trackFiles = []
  
  const getTrackData = () => {
    api.get('tracks', trackId)
    .then(data => {
      setTrack(data)
      getGenre(data.genre)
      getCreator(data.creatorId)
    })
  }

  const getGenre = (url) => {
    api.getGenre(url)
    .then(genre => {
      setGenre(genre.genre_name)
    })
  }

  const getTracks = () => {
    api.getAll('tracks')
    .then(tracks => {
      for(const track in tracks){
        console.log(track)
      }
    })
  }

  const getCreator = (url) => {
    api.getCreator(url)
    .then(creator => {
      setCreator(creator.artist_name)
      setCreatorId(creator.id)
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
    // const postData = new FormData()
    // for(const key in fileToPost){
    //   postData.append(key, fileToPost[key])
    // }
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
    const currentUser = parseInt(localStorage.getItem("user_id"))
    console.log(creatorId, currentUser)
  }

  const toggleUploadDiv = () => {
    setUploadDiv(!uploadDiv)
  }
  

  useEffect(() => {
    getTrackData()
  }, [])

  return(
    <>
      <h1>{trackData.track_name} - {trackCreator}</h1>
      <h2>{trackGenre} | {trackData.bpm} BPM</h2>
      <Button onClick={createRemix}>Remix</Button>
      <hr />
      <div className="add_file"> 
        <h3>Track Files</h3> 
        <Button outline color="success" size="sm" onClick={toggleUploadDiv}>+</Button>
      </div>
      <div hidden={uploadDiv}>
        <Input placeholder="File Name" innerRef={fileName}/>
        <Input placeholder="File Description" innerRef={fileDesc}/>
        <input type="file" accept="audio/*" onChange={onUpload}/>
        <Button onClick={handleUpload}>Upload</Button>
      </div>
    </>
  )
}

export default TrackDetail