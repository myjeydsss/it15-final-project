// Import necessary components and CSS
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Button, Container, Card, Nav, NavLink, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './css/BloggerProfile.css';
import Swal from "sweetalert2";


const CDNURL = "https://fnuxlkuyfgyjiomkzksy.supabase.co/storage/v1/object/public/profile_image/";

// Interface for User object
interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  profile_image: string; 
}

// BloggerProfile component
const BloggerProfile = () => {
  const [user, setUser] = useState<User | null>(null); // State for user data
  const navigate = useNavigate(); // Function for navigation

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/Home';
  };

  // Delete account functionality
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
      navigate('/Home');
      
      // Display success message after successfully deleting the account
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your account has been successfully deleted!',
      });
    } catch (error) {
      alert(error);
    }
  };

  // Function to show SweetAlert for delete confirmation
  const showDeleteAlert = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your account is safe :)",
          icon: "error"
        });
      }
    });
  };

  return (
    <>
      {/* Navigation bar */}
      <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
        <Container>
          <Navbar.Brand href="#">
            Welcome{user ? `, ${user.firstname} ${user.lastname}` : '!'}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Navigation links */}
              <NavLink
                href="/BloggerDashboard"
                className={`nav-link mx-2 ${
                  location.pathname === '/BloggerDashboard' ? 'active' : ''
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink
                href="/CreateBlog"
                className={`nav-link mx-2 ${location.pathname === '/CreateBlog' ? 'active' : ''}`}
              >
                Create Blog
              </NavLink>
              <NavLink
                href="/BloggerProfile"
                className={`nav-link mx-2 ${
                  location.pathname === '/BloggerProfile' ? 'active' : ''
                }`}
              >
                Profile
              </NavLink>
              {/* Logout button */}
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Main content */}
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <Card className="p-4">
          <Card.Body>
            <h5 className="card-title">Profile</h5>
            {/* Check if user data exists */}
            {user ? (
              <div>
                {/* Display profile image in circular format */}
                {user.profile_image && (
                  <div className="avatar-container">
                    <img src={CDNURL + user.profile_image} alt="Profile" className="avatar-image" />
                  </div>
                )}
                {/* Display user information */}
                <p><strong>Firstname:</strong> {user.firstname}</p>
                <p><strong>Lastname:</strong> {user.lastname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Username:</strong> {user.username}</p>
                {/* Edit Profile button */}
                <Button variant="primary" onClick={() => navigate('/EditProfile')}>
                  Edit Profile
                </Button>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            {/* Delete Account button */}
            <Button variant="danger" className="mt-3" onClick={showDeleteAlert}>
              Delete Account
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default BloggerProfile;
