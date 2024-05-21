import { Navbar, Container, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const BloggerProfile = () => {
  return (
    <>
    <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
        <Container>
          <Navbar.Brand href="#">Welcome!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <NavLink
                  to="/BloggerDashboard"
                  className={`nav-link mx-2 ${
                    location.pathname === "/BloggerDashboard" ? "active" : ""
                  }`}
                >
                  Dashboard
                </NavLink>
            <NavLink
                  to="/MyBlogs"
                  className={`nav-link mx-2 ${
                    location.pathname === "/MyBlogs" ? "active" : ""
                  }`}
                >
                  My Blogs
                </NavLink>
                <NavLink
                  to="/BloggerProfile"
                  className={`nav-link mx-2 ${
                    location.pathname === "/BloggerProfile" ? "active" : ""
                  }`}
                >
                  Profile
                </NavLink>
                
              
              <Nav.Link >Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <h4>BloggerProfile</h4>
        </div>

    </>
  )
}

export default BloggerProfile