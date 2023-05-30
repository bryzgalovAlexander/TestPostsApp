import { Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export const NavbarApp = () => {
  return (
      <Navbar collapseOnSelect expand="navbar-expand-lg" >
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link >
              <Link to={'/about_me'}>
                    About Me
              </Link>
            </Nav.Link>
            <Nav.Link >
              <Link to={'/'}>
                  Posts
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  )
}
