import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Table, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { supabase } from '../supabaseClient';  // Make sure to adjust the import path based on your project structure

interface Blog {
  blog_id: string;
  title: string;
  content: string;
  blog_image: string;
  bloggers_id: string;
  category: string;
  date_created: number;
}

const Features: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*');

      if (error) {
        console.error('Error fetching blogs:', error);
      } else {
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  return (
    <>
      <header>
        <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
          <Container>
            <Navbar.Brand href="#">Blogify360</Navbar.Brand>
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
  

      <div className="container mt-4">
        <Container className="mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Image</th>
                <th>Category</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.blog_id}>
                  <td>{blog.title}</td>
                  <td>{blog.content}</td>
                  <td>
                    <img src={`https://fnuxlkuyfgyjiomkzksy.supabase.co/storage/v1/object/public/blog_image/${blog.blog_image}`} alt={blog.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  </td>
                  <td>{blog.category}</td>
                  <td>{blog.date_created}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
};

export default Features;
