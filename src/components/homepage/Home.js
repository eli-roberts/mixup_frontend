import React, {useState, useRef} from 'react'
import { Modal, Button, Fade, Tooltip, Pagination, PaginationItem, PaginationLink, ModalHeader, ModalBody } from 'reactstrap'
import { register } from '../../hooks/auth'

const Home = props => {
  const [modalToggle, setModal] = useState(false)
  const [inputHidden, setInputHidden] = useState(true)
  const [active, setActive] = useState(true)
  const [buttonVal, setButton] = useState("Login")
  
  const username = useRef()
  const password = useRef()
  const verif_password = useRef()
  const email = useRef()
  
  const toggleModal = () => {
    setModal(!modalToggle)
  }

  const toggleRegister = () => {
    if(inputHidden === true){
      setInputHidden(!inputHidden)
      setButton("Register")
    }
    else{
      return
    }
  }

  const toggleLogin = () => {
    if(inputHidden === false){
      setInputHidden(!inputHidden)
      setButton("Login")
    }
    else{
      return
    }
  }
  
  const handleRegister

  return (
    <>

      <h1>Welcome to MixUp!</h1>
      <Button onClick={toggleModal}>Login</Button>
      <Button onClick={toggleModal}>Register</Button>

      <Modal isOpen={modalToggle} toggle={toggleModal} className="login-register-modal">
        <ModalHeader>
          <Pagination>
            <PaginationItem>
              <PaginationLink onClick={toggleLogin}>Login</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={toggleRegister}>Register</PaginationLink>
            </PaginationItem>
          </Pagination>
          <ModalBody>
            <input type="text" placeholder="test"/>
            <input type="password" placeholder="test2"/>
            <input hidden={inputHidden} type="password" placeholder="test3"/>
            <input hidden={inputHidden} type="text" placeholder="test4"/>
            <Button>{buttonVal}</Button>
            
          </ModalBody>
        </ModalHeader>
      </Modal>
    </>
  )
}

export default Home