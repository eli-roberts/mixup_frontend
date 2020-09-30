import React, {useEffect, useState} from 'react'
import { 
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  NavbarText
} from 'reactstrap'
import './Navbar.css'



const MixUpNav = props => {
  const [auth, setAuth] = useState(false)

  const checkAuth = () => {
    const auth_check = localStorage.getItem('auth_token')
    if(auth_check){
      setAuth(true)
    }
  }

  
  const logout = () => {
    localStorage.removeItem("user_id")
    localStorage.removeItem("auth_token")
  }
  useEffect(() => {
    checkAuth()
  }, [])

  if(!auth){
    return(
      <> 
        <Navbar className="navbar" expand="md">
        <NavbarBrand className="nav-brand">
          <img className="nav-logo" src="https://photofantastic.s3.us-east-2.amazonaws.com/navbar+logo.png"/>
        </NavbarBrand>
        </Navbar>
      </>
    )
  }


  return(
    <>
      <Navbar light expand="md" className="navbar">
        <NavbarBrand className="nav-brand">
          <img className="nav-logo" src="https://photofantastic.s3.us-east-2.amazonaws.com/navbar+logo.png"/>
        </NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink className="nav-link" href="/home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavbarText className="nav-divider">
              |
            </NavbarText>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" href="/tracks/new">Create a Track</NavLink>
          </NavItem>
          <NavbarText>
              |
            </NavbarText>
          <NavItem>
            <NavLink className="nav-link" href="/tracks/remixable">Remix a Track</NavLink>
          </NavItem>
          <NavbarText>
              |
            </NavbarText>
          <NavItem>
            <NavLink className="nav-link" href="/" onClick={logout}>Log Out</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  )
}

export default MixUpNav