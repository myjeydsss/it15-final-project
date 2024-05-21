import { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"

// Define a type for the user object
interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
  }
  
  const MyBlogs = () => {
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/Home';
      };


  return (
    <>
    <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
        <Container>
          <Navbar.Brand href="#">
            Welcome{user ? `, ${user.firstname} ${user.lastname}` : '!'}
          </Navbar.Brand>
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
                
              
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <h4>MyBlogs</h4>
        </div>

    </>
  )
}

export default MyBlogs