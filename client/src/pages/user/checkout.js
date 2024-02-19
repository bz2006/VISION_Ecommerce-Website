import React from 'react';
import Layout from '../../components/Layout/Layout';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import "./checkout.css";

const Checkout = () => {
    return (
        <>
            <div className='codiv'>
                <h1>Review Your Order</h1>
                <Row xs={1} md={2} className="g-4 row row-cols-md-2 row-cols-1">
                    <Col className='col1'>
                        <h1>address</h1> <input type='text' style={{display:"block",height:"50px"}}/><button style={{height:"50px"}}>Apply</button>
                    </Col>
                    <Col className='col2'>
                        <h1>place order</h1>
                    </Col>
                </Row>
                <Row xs={1} md={2} className="g-4 row row-cols-md-2 row-cols-1">
                    <Col className='col3'>
                        <h1>product details</h1>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Checkout;
