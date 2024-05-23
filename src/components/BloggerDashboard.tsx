import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/bloogerDashboard.css';

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
      <Container className='blogger-container'>
        <p className='blogger-dashboard'> {user ? `${user.firstname} ${user.lastname}` : '!'} Dashboard</p>
      </Container>
      {blogs.length > 0 ? (
        <section className='blogger-section'>
          <div className='grid-container'>
            {blogs.map((blog) => (
              <Container className='table-container' key={blog.blog_id} onClick={() => handleViewBlog(blog.blog_id)}>
                <img
                  src={CDNURL + blog.blog_image}
                  alt={blog.title}
                  className='img-img'
                />
                <p className='blog-title'> {blog.title} </p>
              </Container>
            ))}
          </div>
        </section>
      ) : (
        <Container className="no-blogs-container text-center mt-5">
          <p>You haven't posted any blogs yet.</p>
          <Button variant="primary" onClick={() => navigate('/CreateBlog')}>Create Your First Blog</Button>
        </Container>
      )}
      <br />

      <section className='fourthSection'>
        <div className="svg-row">
          <a href='https://www.facebook.com'>
            <img src='./images/facebook-f.svg' className="svg-item" alt="Facebook" />
          </a>
          <a href='https://www.instagram.com'>
            <img src='./images/instagram.svg' className="svg-item" alt="Instagram" />
          </a>
          <a href='https://www.facebook.com/phoebe.lerog'>
            <img src='./images/pinterest-p.svg' className="svg-item" alt="Pinterest" />
          </a>
          <a href='https://www.facebook.com/phoebe.lerog'>
            <img src='./images/x-twitter.svg' className="svg-item" alt="Twitter" />
          </a>
        </div>
        <div className='link-link'>
          <a href='/Home'>
            <span>Home | </span>
          </a>
          <a href='/About'>
            <span>About | </span>
          </a>
          <a href='/Contact'>
            <span>Contact</span>
          </a>
        </div>
        <div className='link-logo'>
          <a href='/Home'>
            <img src='./images/logo.png' className="logo" alt="Logo" />
          </a>
        </div>
        <div className='footer'> 
          <p className="reserved">2024 Blogify360 | All Rights Reserved</p>
        </div>
      </section>
    </>
  );
};

export default BloggerDashboard;
