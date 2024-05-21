import React from 'react';
import { Nav, Navbar, Container, NavLink, NavDropdown } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/homepage.css';

const HomePage: React.FC = () => {
  const location = useLocation();

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
                  href="/Home"
                  className={`nav-link mx-2 ${
                    location.pathname === "/Home" ? "active" : ""
                  }`}
                >
                  Home
                </NavLink>
                <NavLink
                  href="/About"
                  className={`nav-link mx-2 ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                >
                  About
                </NavLink>
                <NavLink
                  href="/Contact"
                  className={`nav-link mx-2 ${
                    location.pathname === "/Contact" ? "active" : ""
                  }`}
                >
                  Contact
                </NavLink>
                <NavLink
                  href="/Features"
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
      
      <section className="section1">
        <div className="con1">
          <h2 className="heading2Explore">
            <span className="text1">Explore creators on </span> 
            <span className="text2">Blogify360</span>
          </h2>
          <p className="pDiscover">Discover and connect with amazing content creators.</p>
          <a href="/SignIn">
            <span className="button1">Get Started</span>
          </a>
        </div>

        <div className="image1">
          <img src="./images/LandingPage.png" alt="Dashboard Preview"
            className="mx-auto rounded-lg shadow-lg" />
        </div>

        <div className="container">
          <p className="quote" style={{ lineHeight: '1.35' }}>
            &quot;The first thing you need to decide when you build your blog is what you want to accomplish with it, and what it can do if successful.&quot;
          </p>
          <div className="author">
            <p className="pAuthor">- Ron Dawson</p>
          </div>
          <div className="link">
            <a href="#" className="cta-link">
              Try Blogify360 completely free for 14 Days -&gt;
            </a>
          </div>
        </div>
      </section>
      
      <section className="section2">
      <div className="container2">
        <div className="div1">
          <h2 className="heading2">Complete control over your blogs.</h2>
          <p className="paragraph2" style={{ lineHeight: '1.55' }}>
            Launch your custom blog and fine-tune the design settings to seamlessly reflect your brand and style.
          </p>
          <p className="paragraph2" style={{ lineHeight: '1.55' }}>
            Explore our extensive marketplace offering hundreds of custom themes or craft your own unique design from scratch.
          </p>
          <p className="paragraph3" style={{ lineHeight: '1.55' }}>
            With Blogify360 handling the backend, your blog&apos;s distinct identity takes center stage.
          </p>
          <a href="#" className="link-free">
            Try Blogify360 completely free for 14 Days -&gt;
          </a>
        </div>
        <div className="div1">
          <img
            src="./images/secondPic.png"
            alt="Second Pic Preview"
            className="img1"
          />
        </div>
      </div>
        <img
          src="./images/thirdPic.png"
          alt="samples"
          className='img2'
        />
    </section>
    <section className='thirdSection'>
      <div className="divJoin">
          <h2 className="text-5xl font-bold mb-4">
            <span className="text1">JOIN AND BE PART OF OUR </span> 
            <span className="text2">COMMUNITY</span>
          </h2>
          <p className="paragraphDate">Stay up-to-date 
          with our new designs, seasonal specials, promotions, and popular blogs.</p>
          </div>
    </section>
    
    <section className='fourthSection'>
      <div className="svg-row">
        <a href='https://www.facebook.com/phoebe.lerog'>
        <img src='./images/facebook-f.svg' className="svg-item">
        </img>
        </a>
        <a href='https://www.facebook.com/phoebe.lerog'>
        <img src='./images/instagram.svg' className="svg-item">
        </img>
        </a>
        <a href='https://www.facebook.com/phoebe.lerog'>
        <img src='./images/pinterest-p.svg' className="svg-item">
        </img>
        </a>
        <a href='https://www.facebook.com/phoebe.lerog'>
        <img src='./images/x-twitter.svg' className="svg-item">
        </img>
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
        <img src='./images/logo.png' className="logo">
        </img>
      </a>
      </div>
      <div className='footer'> 
        <p className="reserved"> 2024 Blogify360 | All Rights Reserved </p>
      </div>
    </section>

    </>
  );
}

export default HomePage;
