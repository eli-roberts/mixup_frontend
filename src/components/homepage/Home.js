import React, {useState, useRef} from 'react'
import { Modal, Button, Fade, Tooltip, Pagination, PaginationItem, PaginationLink, ModalHeader, ModalBody, ModalFooter, Container, InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap'
import useSimpleAuth  from '../../hooks/auth'
import './Home.css'

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

  //Setup for login and register functions
  const { register } = useSimpleAuth()
  const { login } = useSimpleAuth()

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

  const toggleRegister = () => {
    if(inputHidden === true){
      setInputHidden(!inputHidden)
      setButton("Register")
    }
    else{
      return
    }
  }

  // Functions to handle either login/register submits.
  const handleLoginRegister = () => {
    if(buttonVal === "Register"){
      if(username.current.value === "" ||
        password.current.value === "" ||
        verif_password.current.value === ""||
        email.current.value === ""){
          window.alert("All fields must be filled out before you can register.")
          return
        }

      if(password.current.value !== verif_password.current.value){
        window.alert("The passwords do not match. Double check your passwords and try again.")
        return
      }
      const newUser = {
        'username': username.current.value,
        'email': email.current.value,
        'password': password.current.value
      }
      register(newUser)
      .then(() => {props.history.push("/home")
      window.location.reload()})
      
    }

    else if(buttonVal === "Login"){
      const loginCreds = {
        'username': username.current.value,
        'password': password.current.value
      }

      login(loginCreds)
      .then(() => {
        if(!localStorage.getItem("auth_token")){
          window.alert("Your credentials were invalid or that account does not exist. Please try again.")
          return
        }
        else{
          props.history.push("/home")
          window.location.reload()
        }
        
      })
      }
  }

  return (
    <>
      <Container className="header-btns">
        <img src="https://photofantastic.s3.us-east-2.amazonaws.com/homepage+logo.png" className="homepage-logo"/>
        <div className="login-register-btns">
          <Button active={false}className='btn-login' onClick={openLoginModal}>Login</Button>
          <Button className='btn-register' onClick={openRegisterModal}>Register</Button>
        </div>
      </Container>
      <Modal isOpen={modalToggle} toggle={toggleModal} className="login-register-modal">
        <Container className="login-reg-container">
          <div className="modal-header-btns">
            <ModalHeader className="modal-header">
              <Pagination>
                <PaginationItem>
                  <PaginationLink className="login-active" active={loginActive} onClick={toggleLogin}>Login</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="register-active" active={registerActive} onClick={toggleRegister}>Register</PaginationLink>
                </PaginationItem>
              </Pagination>
            </ModalHeader>
          </div>
          <div className="login-register-form">
              <ModalBody className='modal-body'>
                <InputGroup className="login-username">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="input-addon">Username:</InputGroupText>
                  </InputGroupAddon>
                  <Input className="input-field" innerRef={username}/>
                </InputGroup>
                <br/>
                <InputGroup className="login-password">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="input-addon">Password:</InputGroupText>
                  </InputGroupAddon>
                  <Input className="input-field" type='password' innerRef={password}/>
                </InputGroup>
                <br/>
                <InputGroup className="register-verif-password" hidden={inputHidden}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="input-addon">Confirm Password:</InputGroupText>
                  </InputGroupAddon>
                  <Input className="input-field" type='password' innerRef={verif_password}/>
                </InputGroup>
                <br/>
                <InputGroup className="register-email" hidden={inputHidden}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="input-addon">Email:</InputGroupText>
                  </InputGroupAddon>
                  <Input className="input-field" innerRef={email}/>
                </InputGroup>
              </ModalBody>
              <ModalFooter className="submit-btn-div">
              <div >
                <Button className="btn-submit" onClick={handleLoginRegister}>{buttonVal}</Button>
              </div>
              </ModalFooter>
          </div>
        </Container>
      </Modal>
    </>
  )
}

export default Home