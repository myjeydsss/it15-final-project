import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Card, Button } from 'react-bootstrap';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Define a type for the user object
interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

// Define a type for the blog object
interface Blog {
  blog_id: string;
  title: string;
  content: string;
  blog_image: string;
  bloggers_id: string;
}

const CDNURL = "https://fnuxlkuyfgyjiomkzksy.supabase.co/storage/v1/object/public/blog_image/";

const MyBlogs = () => {
  const [user, setUser] = useState<User | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);
  const { blog_id } = useParams<{ blog_id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    if (blog_id) {
      fetchBlog(blog_id);
    }
  }, [blog_id]);

  const fetchBlog = async (id: string) => {
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
        setBlog(data);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  const handleDelete = async () => {
    if (!blog) return;
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('blog_id', blog.blog_id);

      if (error) {
        console.error('Error deleting blog:', error);
        alert('Error deleting blog: ' + error.message);
      } else {
        alert('Blog deleted successfully');
        navigate('/BloggerDashboard');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleBack = () => {
    navigate('/BloggerDashboard');
  };

  const handleEdit = () => {
    navigate(`/EditBlog/${blog_id}`);
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
                to="/MyBlogs"
                className={`nav-link mx-2 ${
                  location.pathname === '/MyBlogs' ? 'active' : ''
                }`}
              >
                My Blogs
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <h4>My Blog</h4>
        {blog ? (
          <Card className="mt-3">
            <Card.Img
              variant="top"
              src={CDNURL + blog.blog_image}
              alt={blog.title}
              style={{ width: '50%', height: 'auto' }}
            />
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>{blog.content}</Card.Text>
              <Button variant="primary" onClick={handleBack} className="me-2">Back</Button>
              <Button variant="secondary" onClick={handleEdit} className="me-2">Edit</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Card.Body>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </>
  );
};

export default MyBlogs;
