import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
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
      const { error } = await supabase.from('bloggers').insert([
        {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        },
      ]);

      if (error) {
        throw error;
      }

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have registered successfully!',
      }).then(() => {
        navigate('/LoginUser');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: "Registration Failed",
      });
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
            <h5 className="card-title">Register</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
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
                Submit
              </Button>
            </Form>
            <div className="mt-3">
              Already have an account? <Link to={'/LoginUser'}>Login</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default RegisterUser;
