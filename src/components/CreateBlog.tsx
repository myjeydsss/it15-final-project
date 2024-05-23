import React, { useState, useEffect } from "react";
import { Form, Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Swal from "sweetalert2";

interface Category {
  category_id: number;
  category_name: string;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}

const CreateBlog = () => {
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data: categories, error } = await supabase
        .from("category")
        .select("*");

      if (error) {
        throw error;
      }

      if (categories) {
        setCategories(categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
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

    let imageUrl = "";
    if (file) {
      const { data, error } = await supabase.storage
        .from("blog_image")
        .upload(`${user?.id}/${file.name}`, file);

      if (error) {
        console.error("Error uploading image:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error uploading image",
        });
        setUploading(false);
        return;
      }

      imageUrl = data?.path || "";
    }

    const dateCreated = new Date().toISOString(); // Current date and time in ISO format

    try {
      const { error } = await supabase.from("blogs").insert([
        {
          title,
          category: selectedCategory,
          content,
          blog_image: imageUrl,
          bloggers_id: user?.id,
          date_created: dateCreated, // Add the current date and time
        },
      ]);

      if (error) {
        throw error;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Blog created successfully!",
      });
      navigate("/BloggerDashboard");
    } catch (error) {
      console.error("Error creating blog:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error creating blog",
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
              <option key="default" value="">Select category</option>
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
            <Form.Control
              type="file"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%', maxHeight: '200px' }} />
            )}
          </Form.Group>
          <Button variant="primary" type="submit" disabled={uploading}>
            {uploading ? 'Creating...' : 'Create Blog'}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/BloggerDashboard')}>
            Cancel
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default CreateBlog;
