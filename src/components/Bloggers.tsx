import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Modal, Button, Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

interface Token {
  user: {
    email: string;
    // Add other properties if needed
  };
  // Add other token properties if needed
}

interface Bloggers {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}

interface BloggersProps {
  token: Token;
  setToken: React.Dispatch<React.SetStateAction<Token | null>>;
}

const Bloggers: React.FC<BloggersProps> = ({ token, setToken }) => {

  const [bloggers, setBloggers] = useState<Bloggers[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBloggerData, setNewBloggerData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBloggers();
  }, []);

  const fetchBloggers = async () => {
    const { data, error } = await supabase.from('bloggers').select('*');
    if (error) {
      console.log('Error fetching bloggers:', error);
    } else if (data) {
      setBloggers(data);
    }
  };

  const handleAddBlogger = async () => {
    const { data, error } = await supabase
      .from('bloggers')
      .insert([newBloggerData]);
      
      window.location.reload();
    if (error) {
      console.log('Error adding blogger:', error);
    } else if (data) {
      setBloggers((prevBloggers) => [...prevBloggers, ...data]);
      setShowAddModal(false);
      setNewBloggerData({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: ''
      });
      
      // Show success message upon successful addition
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'New blogger added successfully!',
      });
    }
  };

  const handleLogout = () => {
    // Clear the token from session storage
    sessionStorage.removeItem('token');
    // Clear the token state
    setToken(null);
    // Redirect to the admin login page
    navigate('/LoginAdmin');
  };

  const handleDeleteBloggers = async (id: number) => {
    // Ask for confirmation before deleting
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this blogger!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from('bloggers')
          .delete()
          .eq('id', id);

        if (error) {
          console.log('Error deleting bloggers:', error);
        } else {
          setBloggers((prevBloggers) => prevBloggers.filter(bloggers => bloggers.id !== id));
          // Show success message upon successful deletion
          Swal.fire(
            'Deleted!',
            'The blogger has been deleted.',
            'success'
          );
        }
      }
    });
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
        <Container>
          <Navbar.Brand href="#">Welcome, {token.user.email}!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink
                to="/AdminDashboard"
                className={`nav-link mx-2 ${
                  location.pathname === "/AdminDashboard" ? "active" : ""
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/Bloggers"
                className={`nav-link mx-2 ${
                  location.pathname === "/Bloggers" ? "active" : ""
                }`}
              >
                Bloggers
              </NavLink>
              <NavLink
                to="/Posts"
                className={`nav-link mx-2 ${
                  location.pathname === "/Posts" ? "active" : ""
                }`}
              >
                Posts
              </NavLink>
              <NavLink
                to="/Category"
                className={`nav-link mx-2 ${
                  location.pathname === "/Category" ? "active" : ""
                }`}
              >
                Category
              </NavLink>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-4">
        <h1>Bloggers Table</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Blogger ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bloggers.map((bloggers) => (
              <tr key={bloggers.id}>
                <td>{bloggers.id}</td>
                <td>{bloggers.firstname}</td>
                <td>{bloggers.lastname}</td>
                <td>{bloggers.email}</td>
                <td>{bloggers.username}</td>
                <td>
                <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteBloggers(bloggers.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    &nbsp; Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3">
          <button className="btn btn-primary mt-2" onClick={() => setShowAddModal(true)}>
            Add Blogger
          </button>
        </div>
      </div>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Blogger</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstname">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                type="text"
                value={newBloggerData.firstname}
                onChange={(e) => setNewBloggerData({ ...newBloggerData, firstname: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formLastname">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                value={newBloggerData.lastname}
                onChange={(e) => setNewBloggerData({ ...newBloggerData, lastname: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newBloggerData.email}
                onChange={(e) => setNewBloggerData({ ...newBloggerData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
  type="text"
  value={newBloggerData.username}
  onChange={(e) => setNewBloggerData({ ...newBloggerData, username: e.target.value })}
/>
</Form.Group>
<Form.Group controlId="formPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control
    type="password"
    value={newBloggerData.password}
    onChange={(e) => setNewBloggerData({ ...newBloggerData, password: e.target.value })}
  />
</Form.Group>
</Form>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={() => setShowAddModal(false)}>
    Close
  </Button>
  <Button variant="primary" onClick={handleAddBlogger}>
    Save Changes
  </Button>
</Modal.Footer>
</Modal>
</>
);
};

export default Bloggers;
