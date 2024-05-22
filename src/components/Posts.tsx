import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Table, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import Swal from 'sweetalert2';

interface Token {
  user: {
    email: string;
  };
}

interface Blog {
  blog_id: string;
  title: string;
  content: string;
  blog_image: string;
  bloggers_id: string;
  category: string;
  date_created: number;
}

interface PostsProps {
  token: Token;
  setToken: React.Dispatch<React.SetStateAction<Token | null>>;
}

const Posts: React.FC<PostsProps> = ({ token, setToken }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

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
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching blogs',
        });
      } else {
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error fetching blogs',
      });
    }
  };

  const handleDelete = async (blog_id: string) => {
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this blog post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('blog_id', blog_id);
    
          if (error) {
            console.error('Error deleting blog:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting blog',
            });
          } else {
            setBlogs(blogs.filter(blog => blog.blog_id !== blog_id));
            Swal.fire({
              icon: 'success',
              title: 'Deleted',
              text: 'Blog deleted successfully',
            });
          }
        } catch (error) {
          console.error('Error deleting blog:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error deleting blog',
          });
        }
      }
    });
  };

  const handleLogout = () => {
    // Clear the token from session storage
    sessionStorage.removeItem('token');
    // Clear the token state
    setToken(null);
    // Redirect to the admin login page
    navigate('/LoginAdmin');
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
                  location.pathname === '/AdminDashboard' ? 'active' : ''
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/Bloggers"
                className={`nav-link mx-2 ${
                  location.pathname === '/Bloggers' ? 'active' : ''
                }`}
              >
                Bloggers
              </NavLink>
              <NavLink
                to="/Posts"
                className={`nav-link mx-2 ${
                  location.pathname === '/Posts' ? 'active' : ''
                }`}
              >
                Posts
              </NavLink>
              <NavLink
                to="/Category"
                className={`nav-link mx-2 ${
                  location.pathname === '/Category' ? 'active' : ''
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
        <h1>Posted Blog Table</h1>
      <Container className="mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Image</th>
              <th>Category</th>
              <th>Date Created</th>
              <th>Actions</th>
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
                <td>
                  <Button variant="danger" onClick={() => handleDelete(blog.blog_id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      </div>
    </>
  );
};

export default Posts;
