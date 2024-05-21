import React, { useState } from 'react';
import {  Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

interface Props {
  setToken: (token: any) => void;
}

interface FormData {
  email: string;
  password: string;
}

const AdminLogin: React.FC<Props> = ({ setToken }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  console.log(formData);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      console.log(data);
      setToken(data);
      navigate('/AdminDashboard');
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
   
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <Card className="p-4">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <div className="mt-3">
              Don't have an account? <Link to={'/RegisterAdmin'}>Register</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default AdminLogin;
