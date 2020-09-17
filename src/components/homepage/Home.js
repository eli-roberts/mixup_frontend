import React, {useState, useRef} from 'react'
import { Modal, Button, Fade, Tooltip, Pagination, PaginationItem, PaginationLink, ModalHeader, ModalBody } from 'reactstrap'
import { register } from '../../hooks/auth'

const Home = props => {
  // Use states set up to handle Modal View.
  const [modalToggle, setModal] = useState(false)
  const [inputHidden, setInputHidden] = useState(true)
  const [loginActive, setLogin] = useState(true)
  const [registerActive, setRegister] = useState(!loginActive)
  const [buttonVal, setButton] = useState("Login")
  
  // UseRef to handle login/register form data
  const username = useRef()
  const password = useRef()
  const verif_password = useRef()
  const email = useRef()

  // Functions to handle toggle between login/register modal display.
  const toggleModal = () => {
    setModal(!modalToggle)
  }
  
  const openLoginModal = () => {
    setLogin(true)
    setRegister(false)
    setInputHidden(true)
    setButton("Login")
    setModal(!modalToggle)
    
  }

  const openRegisterModal = () => {
    setLogin(false)
    setRegister(true)
    setInputHidden(false)
    setButton("Register")
    setModal(!modalToggle)
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

  // Functions to handle either login/register submits.
  const toggleRegister = () => {
    if(inputHidden === true){
      setInputHidden(!inputHidden)
      setButton("Register")
    }
    else{
      return
    }
  }


  
  const handleRegister = () => {
    return
  }

  return (
    <>

      <h1>Welcome to MixUp!</h1>
      <Button onClick={openLoginModal}>Login</Button>
      <Button onClick={openRegisterModal}>Register</Button>

      <Modal isOpen={modalToggle} toggle={toggleModal} className="login-register-modal">
        <ModalHeader>
          <Pagination>
            <PaginationItem>
              <PaginationLink active={loginActive} onClick={toggleLogin}>Login</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink active={registerActive} onClick={toggleRegister}>Register</PaginationLink>
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