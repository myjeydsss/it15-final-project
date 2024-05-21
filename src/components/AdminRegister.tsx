import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

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

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault()
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Fullname'
          name='fullname'
          onChange={handleChange}
        />
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

        <button type='submit'>
          Submit
        </button>
      </form>
      Already have an account?<Link to={'/LoginAdmin'}>Login</Link>
    </div>
  );
};

export default AdminRegister;
