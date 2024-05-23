import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';  // Make sure to adjust the import path based on your project structure


interface Blog {
  category: any;
  blog_id: string;
  title: string;
  content: string;
  blog_image: string;
  bloggers_id: string;
  category_name: string;
  date_created: number;
}

const Features: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*, category (category_name)');

      if (error) {
        console.error('Error fetching blogs:', error);
      } else {
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleViewBlog = (blog_id: string) => {
    navigate(`/BlogDetails/${blog_id}`);
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
                <NavLink
                  to="/Home"
                  className={`nav-link mx-2 ${
                    location.pathname === "/Home" ? "active" : ""
                  }`}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/About"
                  className={`nav-link mx-2 ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                >
                  About
                </NavLink>
                <NavLink
                  to="/Contact"
                  className={`nav-link mx-2 ${
                    location.pathname === "/Contact" ? "active" : ""
                  }`}
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/Features"
                  className={`nav-link mx-2 ${
                    location.pathname === "/Features" ? "active" : ""
                  }`}
                >
                  Features
                </NavLink>
                <NavDropdown title="Account" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/RegisterUser">Register</NavDropdown.Item>
                  <NavDropdown.Item href="/LoginUser">Login</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {blogs.length > 0 ? (
        <section className='blogger-section'>
          <div className='grid-container'>
            {blogs.map((blog) => (
              <Container className='table-container' key={blog.blog_id} onClick={() => handleViewBlog(blog.blog_id)}>
                                    <img  src={`https://fnuxlkuyfgyjiomkzksy.supabase.co/storage/v1/object/public/blog_image/${blog.blog_image}`} alt={blog.title} className='img-img' />

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

export default Features;
