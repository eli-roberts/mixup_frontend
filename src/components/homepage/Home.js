import React, {useState, useRef} from 'react'
import { Modal, Button, Fade, Tooltip, Pagination, PaginationItem, PaginationLink, ModalHeader, ModalBody } from 'reactstrap'
import useSimpleAuth  from '../../hooks/auth'

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
            <input type="text" ref={username} placeholder="username"/>
            <input type="password" ref={password} placeholder="password"/>
            <input hidden={inputHidden} ref={verif_password} type="password" placeholder="verify password"/>
            <input hidden={inputHidden} ref={email} type="text" placeholder="email"/>
            <Button onClick={handleLoginRegister}>{buttonVal}</Button>
            
          </ModalBody>
        </ModalHeader>
      </Modal>
    </>
  )
}

export default Home