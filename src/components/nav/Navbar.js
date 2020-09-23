import React from 'react'
import { 
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap'


const MixUpNav = props => {
  
  const logout = () => {
    localStorage.removeItem("user_id")
    localStorage.removeItem("auth_token")
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