import React, {useEffect} from 'react'
import { 
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap'



const MixUpNav = props => {
  const authorized = localStorage.getItem('auth_token')

  
  const logout = () => {
    localStorage.removeItem("user_id")
    localStorage.removeItem("auth_token")
  }

  if(!authorized){
    return(
      <> 
        <Navbar color="light" expand="md">
          <NavbarText>MixUp</NavbarText>
        </Navbar>
      </>
    )
  }

  return(
    <>
      <Navbar color="light" light expand="md">
        <NavbarText>MixUp</NavbarText>
        <Nav>
          <NavItem>
            <NavLink href="/home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/tracks/new">Create a Track</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/tracks/remixable">Remix a Track</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/" onClick={logout}>Log Out</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  )
}

export default MixUpNav