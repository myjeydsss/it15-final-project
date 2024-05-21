import { Nav, NavLink, NavDropdown ,Navbar, Container } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";


const UserLogin = () => {
    return (
        <>
          <header>
            <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
              <Container>
                <Navbar.Brand href="#">Blogify360</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNavDropdown" />
                <Navbar.Collapse id="navbarNavDropdown">
                  <Nav className="ms-auto">
                    <NavLink
                      href="/Home"
                      className={`nav-link mx-2 ${
                        location.pathname === "/Home" ? "active" : ""
                      }`}
                    >
                      Home
                    </NavLink>
                    <NavLink
                      href="/About"
                      className={`nav-link mx-2 ${
                        location.pathname === "/About" ? "active" : ""
                      }`}
                    >
                      About
                    </NavLink>
                    <NavLink
                      href="/Contact"
                      className={`nav-link mx-2 ${
                        location.pathname === "/Contact" ? "active" : ""
                      }`}
                    >
                      Contact
                    </NavLink>
                    <NavLink
                      href="/Features"
                      className={`nav-link mx-2 ${
                        location.pathname === "/Features" ? "active" : ""
                      }`}
                    >
                      Features
                    </NavLink>
                    <NavDropdown title="Account" id="navbarScrollingDropdown">
                      <NavDropdown.Item href="/RegisterUser">Register</NavDropdown.Item>
                      <NavDropdown.Item href="/LoginUser">Login</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>
          <section className="page-title bg-1">
            <div className="overlay"></div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="block text-center">
                    <span className="text-white">User Login</span>
                    <h1 className="text-capitalize mb-5 text-lg">User Login</h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )
}

export default UserLogin