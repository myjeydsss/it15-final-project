import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './css/registerUser.css';

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
        title: 'Registration successful!',
        text: 'You have successfully registered.',
      }).then(() => {
        navigate('/LoginUser');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Registration Failed",
      });
    }
  };

  return (
    <>
      <header>
        <Navbar bg="light" expand="lg" variant="light" className="p-3">
          <Container>
            <Navbar.Brand href="#">
              <img
                src="./images/logo-dark.svg"
                alt="Logo" 
                width="100" 
                height="30" 
                className="d-inline-block align-top" 
              />
            </Navbar.Brand>
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

      <div className="screen-1">
        <div className="column left-column">
          <img src="./images/blog.png" alt="Dashboard Preview" />
        </div>

        <div className="column right-column">
          <h1>Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <Form.Control
                type="text"
                placeholder="Firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Form.Control
                type="text"
                placeholder="Lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit">Register</Button>
          </Form>
          <div className="register-prompt">
            <p>
              Already have an account? 
              <span className='login-user'><Link to='/LoginUser'> Sign In </Link></span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
