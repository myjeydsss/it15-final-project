import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

interface FormData {
  fullname: string;
  email: string;
  password: string;
}

const AdminRegister: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    password: '',
  });

  console.log(formData);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        // Optionally, you can update additional user data
        await supabase.from('users').update({
          full_name: formData.fullname,
        }).eq('id', data.user.id);

        alert('Check your email for verification link');
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
    <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
        <Container>
          <Navbar.Brand href="/Home">Welcome!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
  
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Register</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder='Fullname'
                    name='fullname'
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder='Email'
                    name='email'
                    type='email'
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder='Password'
                    name='password'
                    type='password'
                    onChange={handleChange}
                  />
                </div>

                <button type='submit' className="btn btn-primary">
                  Submit
                </button>
              </form>
              <div className="mt-3">
                Already have an account? <Link to={'/LoginAdmin'}>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminRegister;
