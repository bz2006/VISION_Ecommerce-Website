import React, { useState, useEffect } from "react";
import Layout from './../components/Layout/Layout.js';
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Nav } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./productpage.css"
import { useCart } from "../context/cart";



const ProductPage = () => {
    const [product, setProducts] = useState([]);
    //const navigate = useNavigate();
    const [cart, setCart] = useCart()
    const params = useParams();
    const [pid, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mrp, setMrp] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [Quantity, setQuantity] = useState(1)


    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-page/${params.id}`);
            setProducts(data);
            setId(data.product._id)
            setName(data.product.name);
            setDescription(data.product.description);
            setSelectedImages(data.product.images);
            setMrp(data.product.mrp);

            if (data.success) {

            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getSingleProduct(params.id);
        //eslint-disable-next-line
    }, []);

    return (

        <Layout>
            <div className="pdiv">
                <Row xs={1} md={2} className="g-4 row row-cols-md-2 row-cols-1">
                    <Col className="colone">
                        <img src={`http://localhost:3000/uploads/${selectedImages[0]}`} alt="" style={{ width: "80%" }}></img>
                    </Col>
                    <Col className="coltwo">
                        <h2 className="modln">{name}</h2>
                        <h3 className="mmrp">₹{mrp}.00</h3>
                        <label className="mrlabel">Sales Tax Included</label><br />
                        <label className="qtylabel">Quantity</label>
                        <input
                            type="number"
                            min={1}
                            defaultValue={1}
                            className="qty"
                            style={{ display: "block" }}
                            onChange={(e) => {
                                const newQuantity = parseInt(e.target.value); // Parse the value to an integer
                                setQuantity(newQuantity);
                            }}
                        />
                        <button className="addtc" onClick={() => {
                            const finalqty = [pid,name,selectedImages,mrp,Quantity]
                            setCart([...cart,finalqty])
                        }}>Add to Cart</button><br />
                        <button className="buy">Buy Now</button>
                    </Col>



                    {/* </Row>
                <Tab.Container id="myTab" defaultActiveKey="section1">
                    <Nav variant="tabs">
                        <Row xs={3} md={3} className="g-4 row row-cols-md-2 row-cols-1">
                            <Col><Nav.Item>
                                <Nav.Link eventKey="section1">Section 1</Nav.Link>
                            </Nav.Item></Col><Col><Nav.Item>
                                <Nav.Link eventKey="section2">Section 2</Nav.Link>
                            </Nav.Item></Col><Col><Nav.Item>
                                <Nav.Link eventKey="section3">Section 3</Nav.Link>
                            </Nav.Item></Col>
                        </Row>
                    </Nav>
                </Tab.Container> */}
                </Row>
                <Row xs={1} md={2} className="g-4 row row-cols-md-2 row-cols-1">
                    <pre className="descpre">{description}</pre>
                </Row>
            </div>
        </Layout >

    )
}


export default ProductPage