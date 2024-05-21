import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Button, Container, Card, Nav, NavLink, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  profile_image?: string; // Add profile_image property
}

const BloggerProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('bloggers')
        .delete()
        .eq('id', user?.id);
  
      if (error) {
        throw error;
      }
  
      localStorage.removeItem('user');
      alert('Account deleted successfully!');
      navigate('/Home');
    } catch (error) {
      alert(error);
    }
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
                href="/BloggerDashboard"
                className={`nav-link mx-2 ${
                  location.pathname === '/BloggerDashboard' ? 'active' : ''
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink
                href="/MyBlogs"
                className={`nav-link mx-2 ${
                  location.pathname === '/MyBlogs' ? 'active' : ''
                }`}
              >
                My Blogs
              </NavLink>
              <NavLink
                href="/BloggerProfile"
                className={`nav-link mx-2 ${
                  location.pathname === '/BloggerProfile' ? 'active' : ''
                }`}
              >
                Profile
              </NavLink>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <Card className="p-4">
          <Card.Body>
            <h5 className="card-title">Profile</h5>
            {user ? (
              <div>
                {user.profile_image && (
                  <img src={user.profile_image} alt="Profile" style={{ width: '100px', height: '100px' }} />
                )}
                <p><strong>Firstname:</strong> {user.firstname}</p>
                <p><strong>Lastname:</strong> {user.lastname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <Button variant="primary" onClick={() => navigate('/EditProfile')}>
                  Edit Profile
                </Button>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <Button variant="danger" className="mt-3" onClick={handleDelete}>
              Delete Account
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );

};

export default BloggerProfile;
