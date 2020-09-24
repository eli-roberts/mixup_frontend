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
      .then(props.history.push("/home"))
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
        }
        
      })
      }
  }

  return (
    <>
      <Container className="header-btns">
        <h1 className="home-header">Welcome to MixUp!</h1>
        <div className="login-register-btns">
          <Button onClick={openLoginModal}>Login</Button>
          <Button onClick={openRegisterModal}>Register</Button>
        </div>
      </Container>
      <Modal isOpen={modalToggle} toggle={toggleModal} className="login-register-modal">
        <Container className="login-reg-container">
          <div className="modal-header-btns">
            <ModalHeader>
              <Pagination>
                <PaginationItem>
                  <PaginationLink active={loginActive} onClick={toggleLogin}>Login</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink active={registerActive} onClick={toggleRegister}>Register</PaginationLink>
                </PaginationItem>
              </Pagination>
            </ModalHeader>
          </div>
          <div className="login-register-form">
              <ModalBody>
                <InputGroup className="login-username">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Username:</InputGroupText>
                  </InputGroupAddon>
                  <Input innerRef={username}/>
                </InputGroup>
                <br/>
                <InputGroup className="login-password">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Password:</InputGroupText>
                  </InputGroupAddon>
                  <Input type='password' innerRef={password}/>
                </InputGroup>
                <br/>
                <InputGroup className="register-verif-password" hidden={inputHidden}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Confirm Password:</InputGroupText>
                  </InputGroupAddon>
                  <Input type='password' innerRef={verif_password}/>
                </InputGroup>
                <br/>
                <InputGroup className="register-email" hidden={inputHidden}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Email:</InputGroupText>
                  </InputGroupAddon>
                  <Input innerRef={email}/>
                </InputGroup>
              </ModalBody>
              <ModalFooter className="submit-btn-div">
              <div >
                <Button className="submit-btn" onClick={handleLoginRegister}>{buttonVal}</Button>
              </div>
              </ModalFooter>
          </div>
        </Container>
      </Modal>
    </>
  )
}

export default Home