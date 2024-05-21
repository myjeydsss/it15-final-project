import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, NavLink, Navbar, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

interface Category {
  category_id: number;
  category_name: string;
}

interface Token {
  user: {
    email: string;
    // Add other properties if needed
  };
  // Add other token properties if needed
}

interface CategoryProps {
  token: Token;
  setToken: React.Dispatch<React.SetStateAction<Token | null>>;
}

const Category: React.FC<CategoryProps> = ({ token, setToken }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('category').select('*');
    if (error) {
      console.log('Error fetching categories:', error);
    } else if (data) {
      setCategories(data);
    }
  };

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === '') {
      alert('Category name cannot be empty');
      return;
    }

    const { data, error } = await supabase
      .from('category')
      .insert([{ category_name: newCategoryName }]);

    if (error) {
      console.log('Error adding category:', error);
    } else if (data) {
      setCategories((prevCategories) => [...prevCategories, ...data]);
      setNewCategoryName('');
      fetchCategories(); // Fetch categories again to ensure data is up-to-date
    }
  };

  const handleDeleteCategory = async (category_id: number) => {
    const { error } = await supabase
      .from('category')
      .delete()
      .eq('category_id', category_id);

    if (error) {
      console.log('Error deleting category:', error);
    } else {
      setCategories((prevCategories) => prevCategories.filter(category => category.category_id !== category_id));
    }
  };

  const handleEditCategory = async () => {
    if (editCategoryName.trim() === '' || selectedCategoryId === null) {
      alert('Category name cannot be empty');
      return;
    }

    const { data, error } = await supabase
      .from('category')
      .update({ category_name: editCategoryName })
      .eq('category_id', selectedCategoryId);

    if (error) {
      console.log('Error updating category:', error);
    } else if (data) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.category_id === selectedCategoryId ? { ...category, category_name: editCategoryName } : category
        )
      );
      setShowEditModal(false);
      setEditCategoryName('');
      setSelectedCategoryId(null);
    }
    window.location.reload();
  };

  const handleLogout = () => {
    // Clear the token from session storage
    sessionStorage.removeItem('token');
    // Clear the token state
    setToken(null);
    // Redirect to the admin login page
    navigate('/LoginAdmin');
  };

  const openEditModal = (category: Category) => {
    setEditCategoryName(category.category_name);
    setSelectedCategoryId(category.category_id);
    setShowEditModal(true);
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
                href="/AdminDashboard"
                className={`nav-link mx-2 ${
                  location.pathname === "/AdminDashboard" ? "active" : ""
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink
                href="/Bloggers"
                className={`nav-link mx-2 ${
                  location.pathname === "/Bloggers" ? "active" : ""
                }`}
              >
                Bloggers
              </NavLink>
              <NavLink
                href="/Posts"
                className={`nav-link mx-2 ${
                  location.pathname === "/Posts" ? "active" : ""
                }`}
              >
                Posts
              </NavLink>
              <NavLink
                href="/Category"
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
        <h1>Category Table</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.category_id}>
                <td>{category.category_id}</td>
                <td>{category.category_name}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => openEditModal(category)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    &nbsp; Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteCategory(category.category_id)}
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
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New Category Name"
            className="form-control"
          />
          <button onClick={handleAddCategory} className="btn btn-primary mt-2">
            Add Category
          </button>
        </div>
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditCategory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Category;
