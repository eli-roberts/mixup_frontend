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
            <NavLink href="/tracks/remix">Remix a Track</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/" onClick={() => sessionStorage.removeItem('auth_token')}>Log Out</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  )
}

export default MixUpNav