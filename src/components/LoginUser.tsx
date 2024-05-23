import { useState} from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import './css/loginUser.css';
import Swal from 'sweetalert2';

const LoginUser = () => {
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
        const user = data[0];
        localStorage.setItem('user', JSON.stringify(user));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/BloggerDashboard');
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid username or password",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: "Login Failed",
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
                <Nav.Link as={Link} to="/Home" className="nav-link mx-2">Home</Nav.Link>
                <Nav.Link as={Link} to="/About" className="nav-link mx-2">About</Nav.Link>
                <Nav.Link as={Link} to="/Contact" className="nav-link mx-2">Contact</Nav.Link>
                <Nav.Link as={Link} to="/Features" className="nav-link mx-2">Features</Nav.Link>
                <NavDropdown title="Account" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/RegisterUser">Register</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/LoginUser">Login</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    
      <div className="w-full h-screen flex">
        <div className="w-onehalf h-full">
          <img src="./images/blog.png" alt="Dashboard Preview" className="w-auto h-auto object-cover" />
        </div>

        <div className="w-onehalf h-full bg-white flex flex-col p-20 justify-center">
          <div className="max-w-[550px] mx-auto w-full">
            <h3 className='text-5xl font-semibold mb-2 text-blue'>Login</h3>
            <p className="text-base mb-4">Welcome Back! Please enter your details</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </Form.Group>
              <div className="w-full flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 mr-2" />
                  <p className="text-sm">Remember Me</p>
                </div>
              </div>
              <Button variant="primary" type="submit" className="w-full">Login</Button>
            </Form>
            <div className="mt-4 text-center">
              <p className="text-sm font-normal text-black">Don't have an account?  
                <span className="font-semibold underline underline-offset-2 cursor-pointer">
                  <Link to='/RegisterUser'>Sign up for free</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginUser;