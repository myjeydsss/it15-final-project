import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Email'
          name='email'
          type='email'
          onChange={handleChange}
        />
        <input
          placeholder='Password'
          name='password'
          type='password'
          onChange={handleChange}
        />

        <button type='submit'>Submit</button>
      </form>
      Dont have an account?<Link to={'/RegisterAdmin'}>Register</Link>
    </div>
  );
};

export default AdminLogin;
