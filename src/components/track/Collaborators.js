import React, {useState, useEffect} from 'react'
import {Button} from 'reactstrap'
import api from '../../hooks/api'

const CollaboratorList = props => {
  const [currentUser, setCurrentUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isCurrentUser, setIsCurrentUser] = useState(false)

  const collabData = props.data
  const removeCollaborator = () => {
    api.delete('collaborators', collabData.collabId)
  }
  const getCurrentUser = () => {
    api.get('artists', parseInt(localStorage.getItem('user_id')))
      .then(res => {
        setCurrentUser(res.id)
        if(res.id === collabData.id){
          setIsCurrentUser(true)
        }
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  if(isLoading){
    return null
  }

  return(
    <>
      <p>{collabData.name} </p>
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