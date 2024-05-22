import { Nav, NavLink, NavDropdown ,Navbar, Container } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import './css/about.css';


const About = () => {
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
      
      <section className='about-section2'>
        <div className='container-1'>
          <div className='column-1'>
            <h3 className="heading-3-1"> About
              <span className="span-1"> Blogify360 </span>
            </h3>
            <p className="paragraph-1">
            Welcome to Blogify360, your gateway to the world of creative minds and 
            innovative content creators. We're a passionate team dedicated to building a 
            vibrant community where creators and enthusiasts come together to explore, collaborate, 
            and inspire.            
            </p>
          </div>
          <div className='column-1'>
          <img src="./images/about-us.png" alt="about photo"
          className="image-2" />
          </div>
        </div>

        <div className='container-2'>
          <div className='column-1'>
          <img src="./images/mission.png" alt="about photo"
          className="image-2" />
          </div>
          <div className='column-1'>
            <h3 className="heading-3-1">Our 
            <span className="span-1"> Mission </span>
            </h3>
            <p className="paragraph-1">
            At Blogify360, we believe in the power of storytelling and the transformative 
            impact of creative expression. Our mission is to provide a platform that 
            empowers creators from all backgrounds to share their unique perspectives, 
            experiences, and talents with the world. We strive to foster a supportive 
            environment where creativity thrives and connections are forged.           
            </p>
          </div>
        </div>

        <div className='container-1'>
          <div className='column-1'>
            <h3 className="heading-3-1">What we 
            <span className="span-1"> Offer </span>
            </h3>
            <p className="paragraph-1">
            Through Blogify360, creators have the opportunity to showcase their 
            work across various mediums, including blogs, videos, podcasts, and 
            more. Whether you're a seasoned professional or just starting your 
            creative journey, our platform offers the tools, resources, and 
            community support you need to grow and succeed.            
            </p>
          </div>
          <div className='column-1'>
          <img src="./images/offer.png" alt="about photo"
          className="image-2" />
          </div>
        </div>

        <div className='container-2'>
          <div className='column-1'>
          <img src="./images/choose.png" alt="about photo"
          className="image-2" />
          </div>
          <div className='column-1'>
            <h3 className="heading-3-1">Why Choose 
            <span className="span-1"> Blogify360 </span>
            </h3>
            <p>
            <span className="paragraph-1-2">Diverse Community: </span>
            <span className="paragraph-1">
              Join a diverse community of creators from around the globe, 
              spanning different genres, interests, and expertise.          
            </span>
            </p>
            <p>
            <span className="paragraph-1-2">Networking Opportunities: </span>
            <span className="paragraph-1">
            Connect with fellow creators, collaborate on projects, 
            and build meaningful relationships within our vibrant community.         
            </span>
            </p>
            <p>
            <span className="paragraph-1-2">Visibility and Exposure: </span>
            <span className="paragraph-1">
            Gain exposure for your work and reach new audiences through our 
            platform's promotion and discovery features.         
            </span>
            </p>
            <p>
            <span className="paragraph-1-2">Support and Resources: </span>
            <span className="paragraph-1">
            Access valuable resources, tips, and guidance to help you enhance 
            your skills, expand your reach, and achieve your creative goals. 
            </span>
            </p>
          </div>
        </div>

        <div className='container-1'>
          <div className='column-1'>
            <h3 className="heading-3-1">Our 
            <span className="span-1"> Commitment </span>
            </h3>
            <p className="paragraph-1">
            Blogify360 is committed to fostering an inclusive and welcoming environment 
            for all creators. We celebrate diversity, encourage authenticity, and strive 
            to create a space where everyone feels valued and respected.     
            </p>
          </div>
          <div className='column-1'>
          <img src="./images/commitment.png" alt="about photo"
          className="image-2" />
          </div>
        </div>
        <div className='container-3'>
        <img src="./images/join-us.png" alt="about photo"
        className="image-1" />
            <h3 className="heading-3-1-1">Join 
            <span className="span-1"> Us </span>
            </h3>
            <p className="paragraph-1-1">
            Whether you're an aspiring writer, filmmaker, artist, or any other type of 
            creator, we invite you to join us on this exciting journey. Explore, create, 
            and connect with Blogify360 today, and let your creativity soar!   
            </p>
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
  )
}

export default About