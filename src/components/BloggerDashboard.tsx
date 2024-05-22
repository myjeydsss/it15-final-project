import { Navbar, Container, Nav, Table, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

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
  date_created: number;
}

const CDNURL = "https://fnuxlkuyfgyjiomkzksy.supabase.co/storage/v1/object/public/blog_image/";

const BloggerDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchBlogs(parsedUser.id);
    }
  }, []);

  const fetchBlogs = async (bloggers_id: string) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('bloggers_id', bloggers_id);

      if (error) {
        console.error('Error fetching blogs:', error);
        alert('Error fetching blogs: ' + error.message);
      } else {
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/Home');
  };

  const handleViewBlog = (blog_id: string) => {
    navigate(`/MyBlogs/${blog_id}`);
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
                className={`nav-link mx-2 ${location.pathname === '/CreateBlog' ? 'active' : ''}`}
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
      <Container className="mt-5">
        <h4>Blogger Dashboard</h4>
        {blogs.length > 0 ? (
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Content</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.blog_id}>
                  <td>{blog.title}</td>
                  <td>
                    <img
                      src={CDNURL + blog.blog_image}
                      alt={blog.title}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </td>
                  <td>{blog.content}</td>
                  <td>{blog.date_created}</td>

                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleViewBlog(blog.blog_id)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                      &nbsp; View Blog
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No blogs found</p>
        )}
      </Container>
    </>
  );
};

export default BloggerDashboard;
