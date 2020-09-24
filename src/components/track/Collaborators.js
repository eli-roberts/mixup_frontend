import React, {useState, useEffect} from 'react'
import {Button} from 'reactstrap'
import api from '../../hooks/api'

const CollaboratorList = props => {
  // const [isLoading, setIsLoading] = useState(true)
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [artistInfo, setArtistInfo] = useState({'artist_name': 'test', 'id': 0})
  const collabData = props.data
  
  const removeCollaborator = () => {
    api.delete('collaborators', collabData.collabId)
  }

  const getArtistInfo = () => {
    api.getLinkedData(collabData.artist)
    .then(setArtistInfo)
  }

  const getCurrentUser = () => {
    if(artistInfo.id == localStorage.getItem('user_id')){
      setIsCurrentUser(true)
      // setIsLoading(false)
    }
  }

  useEffect(() => {
    getArtistInfo()
  },[props.data])

  useEffect(() => {
    getCurrentUser()
  }, [artistInfo])

  // if(isLoading){
  //   return null
  // }

  return(
    <>
      <p>{artistInfo.artist_name} </p>
      {props.creator
      ?
      <>
        <Button onClick={removeCollaborator}>Remove Collaborator</Button>
      </>
      :
      null
      }
      {isCurrentUser ? <><Button onClick={removeCollaborator}>Remove Collaborator</Button></> : null}
    </>
  )
}
export default CollaboratorList