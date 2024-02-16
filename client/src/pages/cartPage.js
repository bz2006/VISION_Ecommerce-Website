import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from '../context/cart';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../context/auth';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import "./cartPage.css"

function CartPage() {
    const [cart, setCart] = useCart([])
    const [auth, setAuth] = useAuth()
    const [qty, setQty] = useState(0);
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        let totalQuantity = cart.reduce((acc, cartItem) => acc + cartItem[4], 0);
        let totalAmount = cart.reduce((acc, cartItem) => acc + cartItem[3] * cartItem[4], 0);
        setQty(totalQuantity);
        setAmount(totalAmount);
    }, [cart]);



    const handleDelete = async(productId) => {
        const updatedCart = cart.filter(item => item[0] !== productId);
        setCart(updatedCart);
        console.log("deleted", updatedCart)
        console.log("lenth", updatedCart.length)
        if (auth.user) {
            
            if (updatedCart.length === 0) {
                await axios.delete(`/api/v1/cart//delete-cart/${auth.user._id}`);
                syncCartWithServer(updatedCart)
                console.log("lenthcccc",cart.length)
            }
            else if(cart.length===0) {
                getCart()
            }
        }


    };

    const getCart = async () => {
        try {
            const { data } = await axios.get(`/api/v1/cart/get-cart/${auth.user._id}`);

            const newdata = [];
            for (let arr of data) {
                for (let dat of arr["items"]) {
                    const darray = [
                        dat["product"],
                        dat["name"],
                        dat["image"],
                        dat["mrp"],
                        dat["quantity"]]
                    newdata.push(darray)

                }
            }
            setCart(newdata)
        } catch (error) {

        }
    }
    const syncCartWithServer = async (upcart) => {
        try {
            console.log("upcart", upcart)
            // Assuming your server expects cart data in a specific format
            const cartData = { items: [] };
            for (let arr of upcart) {
                cartData.items.push({
                    product: arr[0],
                    name: arr[1],
                    image: arr[2],
                    mrp: arr[3],
                    quantity: arr[4]

                });
            }
            console.log(cartData)
            await axios.put(`/api/v1/cart/create-up-cart/${auth.user._id}`, cartData);
            console.log("Cart synced with server successfully in cart page.");
        } catch (error) {
            console.error("Error syncing cart with server:", error);
        }
    };
    return (
        <Layout >
            <div style={{ backgroundColor: "rgb(236, 239, 243)" }}>
                <h1>Shopping Cart</h1>
                {cart.length !== 0 ? (
                    <>
                        <div className="pdiv">
                            <Row >
                                <Col  >
                                    <table style={{ width: "100%" }}>
                                        <thead>
                                            <tr>
                                                <th style={{ borderTopLeftRadius: "17px", backgroundColor: "white" }}>My Cart</th>
                                                <th style={{ backgroundColor: "white" }}></th>
                                                <th style={{ backgroundColor: "white" }}></th>
                                                <th style={{ borderTopRightRadius: "17px", backgroundColor: "white" }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.length > 0 && cart.map(cartItem => (
                                                <tr key={cartItem[0]}>
                                                    {console.log(cartItem[0])}
                                                    <td style={{ height: "120px", fontSize: "larger", fontFamily: "Arial, sans-serif", backgroundColor: "white" }}><img src={`http://localhost:3000/uploads/${cartItem[2][0]}`} alt="" style={{ width: "90px" }}></img></td>
                                                    <td style={{ height: "120px", fontSize: "larger", fontFamily: "Arial, sans-serif", backgroundColor: "white" }}>{cartItem[1]}</td>
                                                    <td style={{ height: "120px", fontSize: "larger", fontFamily: "Arial, sans-serif", backgroundColor: "white" }}><input
                                                        type="number"
                                                        min={1}
                                                        className="qty"
                                                        style={{ display: "block" }}
                                                        value={cartItem[4]}
                                                        onChange={(e) => {
                                                            const updatedQty = parseInt(e.target.value);
                                                            const updatedCart = cart.map(item => {
                                                                if (item[0] === cartItem[0]) {
                                                                    return [...item.slice(0, 4), updatedQty, ...item.slice(5)];
                                                                }
                                                                return item;
                                                            });
                                                            setCart(updatedCart);
                                                        }}
                                                    /></td>
                                                    <td style={{ height: "120px", fontSize: "larger", fontFamily: "Arial, sans-serif", fontWeight: "bold", backgroundColor: "white", paddingTop: "38px" }}>₹{cartItem[3] * cartItem[4]}.00  <br /> <a className="delcart" icon={faTrashCan} onClick={() => {
                                                        handleDelete(cartItem[0]);
                                                    }} >Delete</a></td>

                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th style={{ borderBottomLeftRadius: "17px", backgroundColor: "white", height: "80px" }}></th>
                                                <th style={{ backgroundColor: "white", height: "80px" }}></th>
                                                <th style={{ backgroundColor: "white", height: "80px" }}> Subtotal ({qty} Items) :</th>
                                                <th style={{ borderBottomRightRadius: "17px", backgroundColor: "white", fontSize: "larger", height: "80px" }}>₹{amount}.00</th>
                                            </tr>
                                        </tfoot>
                                    </table>

                                </Col>



                            </Row>
                            <div className="btndiv">
                                <button className="buybtn" >Procced To Buy</button>
                            </div>
                        </div>
                        <div className="mobcart">
                            {cart.length > 0 && cart.map(cartItem => (
                                <div className="cartcrd" key={cartItem[0]}>
                                    <div className="card flex-row" id="card">
                                        <img className="card-img" src={`http://localhost:3000/uploads/${cartItem[2][0]}`} />
                                        <div className="card-body">
                                            <h4 className="card-title h5 h4-sm">{cartItem[1]}</h4>
                                            <h6 className="card-text">₹{cartItem[3]}</h6>
                                            <h6 className="card-text">Subtotal : ₹{cartItem[3] * cartItem[4]}.00 </h6>
                                        </div>
                                    </div>
                                    <div className="foot">
                                        <select
                                            className="selqty"
                                            value={cartItem[4]}
                                            onChange={(e) => {
                                                const updatedQty = parseInt(e.target.value);
                                                const updatedCart = cart.map(item => {
                                                    if (item[0] === cartItem[0]) {
                                                        return [...item.slice(0, 4), updatedQty, ...item.slice(5)];
                                                    }
                                                    return item;
                                                });
                                                setCart(updatedCart);
                                            }}
                                        >
                                            {[...Array(10)].map((_, index) => ( // Assuming maximum quantity is 10
                                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                        <button className="delcartm" onClick={() => {
                                            handleDelete(cartItem[0]);
                                        }} >Delete</button>

                                    </div>
                                </div>))}

                        </div>
                    </>
                ) : (<img src="https://yamikart.in/public/images/empty-cart.png" className="cremty"></img>)}

            </div>

        </Layout>
    )
}

export default CartPage;
