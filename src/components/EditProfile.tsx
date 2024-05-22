import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Form, Button, Container, Card, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  profile_image: string; // Add profile_image property
}

const EditProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const [formData, setFormData] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    profile_image: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setFormData(JSON.parse(userData));
    }
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Show preview of the selected image
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);
    }
  };

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let imageUrl = formData.profile_image;

    if (file) {
      const { data, error } = await supabase.storage
        .from('profile_image')
        .upload(`${formData.id}/${file.name}`, file);

      if (error) {
        console.error('Error uploading image:', error.message); // Log the error to console
        alert('Error uploading image');
        return;
      }

      imageUrl = data?.path;
    }

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { error } = await supabase
            .from('bloggers')
            .update({
              firstname: formData.firstname,
              lastname: formData.lastname,
              email: formData.email,
              username: formData.username,
              password: formData.password,
              profile_image: imageUrl,
            })
            .eq('id', formData.id);

          if (error) {
            throw error;
          }

          const updatedUser = { ...formData, profile_image: imageUrl };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          Swal.fire("Saved!", "", "success").then(() => {
            navigate('/BloggerProfile');
          });

          setFile(null);
          setImagePreview(null);
        } catch (error) {
          console.error('Error updating profile:', error); // Log the error to console
          Swal.fire("Error", "An error occurred while updating your profile.", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

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
                className={`nav-link mx-2 ${location.pathname === '/BloggerDashboard' ? 'active' : ''}`}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/MyBlogs"
                className={`nav-link mx-2 ${location.pathname === '/MyBlogs' ? 'active' : ''}`}
              >
                My Blogs
              </NavLink>
              <NavLink
                to="/BloggerProfile"
                className={`nav-link mx-2 ${location.pathname === '/BloggerProfile' ? 'active' : ''}`}
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
            <h5 className="card-title">Edit Profile</h5>
            <Form onSubmit={handleUpdate}>
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
              <Form.Group className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  name="profile_image"
                  onChange={handleFileChange}
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%', maxHeight: '200px' }} />
                )}
              </Form.Group>
              <Button variant="primary" type="submit">
                Update Profile
              </Button>
              <Button variant="secondary" onClick={() => navigate('/BloggerProfile')}>
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default EditProfile;
