import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Navbar } from 'react-bootstrap';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/blogDetails.css';  

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

const CDNURL = "https://fnuxlkuyfgyjiomkzksy.supabase.co/storage/v1/object/public/blog_image/";

const BlogDetails: React.FC = () => {
  const { blog_id } = useParams<{ blog_id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogDetails();
  }, [blog_id]);

  const fetchBlogDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*, category (category_name)')
        .eq('blog_id', blog_id)
        .single();

      if (error) {
        console.error('Error fetching blog details:', error);
      } else {
        setBlog(data);
      }
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
  };

  return (
    <> <header>
    <Navbar bg="light" expand="lg" variant="light" className="p-3">
      <Container>
      <Navbar.Brand href="#">Welcome to Blogify360!
    
  </Navbar.Brand>
        
      </Container>
    </Navbar>
  </header>
    <Container className="mt-5">
      {blog ? (
        <Card className="blog-details-card">
          <Card.Img variant="top" src={CDNURL + blog.blog_image} />
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>{blog.content}</Card.Text>
            <p><strong></strong> {blog.category.category_name}</p>
            <p><strong>Date Created:</strong> {new Date(blog.date_created).toLocaleDateString()}</p>
            <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
    </>
  );
};

export default BlogDetails;
