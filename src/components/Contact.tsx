import { Nav, NavLink, NavDropdown, Navbar, Container } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import './css/contact.css';

const Contact = () => {
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

      <section className="contact-section">
        <div className='contact-container-1'>
          <div className='contact-column-1'>
            <h3 className="contact-heading-3-1">Contact Us</h3>

            <p className="contact-paragraph-1">
              <img src="./images/location-dot-solid.svg" alt="Location Icon" 
                className="contact-icon" />
              Davao City
            </p>

            <p className="contact-paragraph-1">
              <img src="./images/phone-solid.svg" alt="Phone Icon" 
                className="contact-icon" />
              +63-908-9367-557
            </p>

            <p className="contact-paragraph-1">
              <img src="./images/envelope-solid.svg" alt="Envelope Icon" 
                className="contact-icon" />
              blogify360@blogify360.com
            </p>
          </div>
          <div className='contact-column-1-1'>
            <img src="./images/hello.svg" alt="about photo"
              className="contact-image-1" />
          </div>
        </div>
      </section>

      <section className='fourthSection'>
        <div className="svg-row">
          <a href='https://www.facebook.com/phoebe.lerog'>
            <img src='./images/facebook-f.svg' className="svg-item" alt="Facebook" />
          </a>
          <a href='https://www.facebook.com/phoebe.lerog'>
            <img src='./images/instagram.svg' className="svg-item" alt="Instagram" />
          </a>
          <a href='https://www.facebook.com/phoebe.lerog'>
            <img src='./images/pinterest-p.svg' className="svg-item" alt="Pinterest" />
          </a>
          <a href='https://www.facebook.com/phoebe.lerog'>
            <img src='./images/x-twitter.svg' className="svg-item" alt="Twitter" />
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
            <img src='./images/logo.png' className="logo" alt="Logo" />
          </a>
        </div>
        <div className='footer'> 
          <p className="reserved">2024 Blogify360 | All Rights Reserved</p>
        </div>
      </section>
    </>
  )
}

export default Contact
