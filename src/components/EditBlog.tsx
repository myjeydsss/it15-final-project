import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Swal from 'sweetalert2';

interface Category {
  category_id: number;
  category_name: string;
}

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}



const EditBlog = () => {
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { blog_id } = useParams<{ blog_id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchCategories();
    fetchBlog(blog_id);
  }, [blog_id]);

  const fetchCategories = async () => {
    try {
      const { data: categories, error } = await supabase
        .from('category')
        .select('*');

      if (error) {
        throw error;
      }

      if (categories) {
        setCategories(categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBlog = async (id: string | undefined) => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('blog_id', id)
        .single();

      if (error) {
        console.error('Error fetching blog:', error);
        alert('Error fetching blog: ' + error.message);
      } else {
        setTitle(data.title);
        setSelectedCategory(data.category);
        setContent(data.content);
        if (data.blog_image) {
          const imageUrl = `https://fnuxlkuyfgyjiomkzksy.supabase.co/storage/v1/object/public/${data.blog_image}`;
          setImagePreview(imageUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = imagePreview?.replace('https://fnuxlkuyfgyjiomkzksy.supabase.co/storage/v1/object/public/', '') || '';
    if (file) {
      const { data, error } = await supabase.storage
        .from('blog_image')
        .upload(`${user?.id}/${file.name}`, file);

      if (error) {
        console.error('Error uploading image:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error uploading image',
        });
        setUploading(false);
        return;
      }

      imageUrl = data?.path || '';
    }

    try {
      const { error } = await supabase
        .from('blogs')
        .update({
          title,
          category: selectedCategory,
          content,
          blog_image: imageUrl,
        })
        .eq('blog_id', blog_id);

      if (error) {
        throw error;
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Blog updated successfully!',
      });
      navigate('/BloggerDashboard');
    } catch (error) {
      console.error('Error updating blog:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error updating blog',
      });
    } finally {
      setUploading(false);
    }
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
                className={`nav-link mx-2 ${
                  location.pathname === '/BloggerDashboard' ? 'active' : ''
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/CreateBlog"
                className={`nav-link mx-2 ${
                  location.pathname === '/CreateBlog' ? 'active' : ''
                }`}
              >
                Create Blog
              </NavLink>
              <NavLink
                to="/BloggerProfile"
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
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option key="default" value="">
                Select category
              </option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ marginTop: '10px', maxWidth: '100%', maxHeight: '200px' }}
              />
            )}
          </Form.Group>
          <Button variant="primary" type="submit" disabled={uploading}>
            {uploading ? 'Updating...' : 'Update Blog'}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/BloggerDashboard')}>
            Cancel
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default EditBlog;
