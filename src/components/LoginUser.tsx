import { useState } from 'react';
import { supabase } from '../supabaseClient';  // Make sure to import your Supabase client
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Form, Button, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('bloggers')
        .select('*')
        .eq('username', formData.username)
        .eq('password', formData.password);

    


      if (error) {
        throw error;
      }

      if (data.length > 0) {
        // Assuming you want to save some form of user state or token
        alert('Login successful!');
        // Perform any login actions here, e.g., save token, redirect, etc.
        navigate('/BloggerDashboard');  // Redirect to Home page after successful login
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <header>
        <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
          <Container>
            <Navbar.Brand href="#">Blogify360</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNavDropdown" />
            <Navbar.Collapse id="navbarNavDropdown">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/Home" className="nav-link mx-2">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/About" className="nav-link mx-2">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="/Contact" className="nav-link mx-2">
                  Contact
                </Nav.Link>
                <Nav.Link as={Link} to="/Features" className="nav-link mx-2">
                  Features
                </Nav.Link>
                <NavDropdown title="Account" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/RegisterUser">
                    Register
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/LoginUser">
                    Login
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <Card className="p-4">
          <Card.Body>
            <h5 className="card-title">User Login</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <div className="mt-3">
              Don't have an account? <Link to={'/RegisterUser'}>Register</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default UserLogin;
