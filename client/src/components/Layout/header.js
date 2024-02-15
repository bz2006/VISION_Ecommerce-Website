import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import "./header.css"
import Image from 'react-bootstrap/Image';
//import Button from 'react-bootstrap/Button';
import { useAuth } from '../../context/auth';
import Dropdown from 'react-bootstrap/Dropdown';
//import {NavLink} from "react-router-dom"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast';
import { useCart } from '../../context/cart';


const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart()
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };


  return (

    <>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="/" className='brimg'><><Image src="https://static.wixstatic.com/media/c1ec53_cdb43083bb05441ca9fb28a5027a7306~mv2.webp" fluid className='brimg' /></></Navbar.Brand>
        <Container className='head'>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div className='hddiv'>
              <Nav.Link href="/" className='homm'>Home</Nav.Link>
              <NavDropdown title="Shop" id="basic-nav-dropdown" className='hom'>
                <NavDropdown.Item href="/shop" >Plain</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Musical
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Antique</NavDropdown.Item>


              </NavDropdown>
              <Nav.Link href='about' className='hom'>Who Are We</Nav.Link>
              <Nav.Link href="contactus" className='hom'>Contact Us</Nav.Link>
              <Nav.Link href="/cart" className='hom'><FontAwesomeIcon icon={faCartShopping} /> {cart?.length} Items</Nav.Link>
              {!auth.user ? (<>
                <Dropdown>
                  <Dropdown.Toggle variant="succss" className='drop' >
                    Account
                  </Dropdown.Toggle>

                  <Dropdown.Menu className='dropmenu'>
                    <Link to="/login">
                      <button className='lrrbtn' style={{ backgroundColor: "white", color: "black" }}>Log In</button>
                    </Link>
                    <Link to="/signup">
                      <button className='lrrbtn'>Sign Up</button>
                    </Link>

                  </Dropdown.Menu>
                </Dropdown>
              </>) : (<Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic" >Account
                </Dropdown.Toggle>

                <Dropdown.Menu className='drop2'>
                  <Dropdown.ItemText>Welcome, {auth?.user?.username}</Dropdown.ItemText>
                  <Dropdown.Item href="#/action-2">My Orders</Dropdown.Item>
                  <Dropdown.Item href={`/dashboard/${auth?.user?.role === 1 ? "manage.vision/admin" : "my_account"}`}>My Account</Dropdown.Item>
                  <Dropdown.Item href="/" onClick={handleLogout}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>)}

              </div>
            </Nav>


          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header