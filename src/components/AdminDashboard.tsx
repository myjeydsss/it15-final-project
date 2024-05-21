import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Token {
  user: {
    email: string;
    // Add other properties if needed
  };
  // Add other token properties if needed
}

interface AdminDashboardProps {
  token: Token;
  setToken: React.Dispatch<React.SetStateAction<Token | null>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from session storage
    sessionStorage.removeItem('token');
    // Clear the token state
    setToken(null);
    // Redirect to the admin login page
    navigate('/LoginAdmin');
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
        <Container>
          <Navbar.Brand href="#">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section className="page-title bg-1">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block text-center">
                <span className="text-white">Admin Dashboard</span>
                <h1 className="text-capitalize mb-5 text-lg">Welcome, {token.user.email}!</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
