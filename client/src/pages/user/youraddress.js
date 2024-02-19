import React, { useEffect, useState } from "react";
import Layout from '../../components/Layout/Layout'
import axios from "axios";
import { useAuth } from "../../context/auth";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";




const Youraddress = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [adid, setadid] = useState("");
    const [name, setName] = useState("");
    const [address, setaddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setProvince] = useState("");
    const [country, setCountry] = useState("");
    const [pin, setPin] = useState();
    const [phone, setPhone] = useState();
    const [Alladdress, setallAdrs] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Getallddress = async () => {
        try {
            const alladrs = await axios.get(`/api/v1/users/getall-address/${auth.user._id}`);
            setallAdrs(alladrs.data)

        } catch (error) {
            console.log(error);
            toast.error("something went wrong");

        }
    }


    useEffect(() => {
        Getallddress()
    }, [])

    console.log(Alladdress)
    const Handlecreate = async () => {
        handleClose()
        try {

            const Data = [];
            Data.push({
                name: name,
                address: address,
                city: city,
                state: state,
                country: country,
                pin: pin,
                phone: phone,
            })
            await axios.post(`/api/v1/users/update-user/${auth.user._id}`, Data);
            Getallddress()

        } catch (error) {
            console.log(error);
            toast.error("something went wrong");

        }

    }

    return (
        <Layout>

            <button onClick={handleShow}>Add Address</button>

            {/* ----------------------------------- Display All Address  --------------------------*/}

            {Alladdress.length > 0 && Alladdress.map(adr => (
                < div key={adr._id} >
                    <h5>{adr.name}</h5>
                    <h5>{adr.address}</h5>
                    <h5>{adr.city}</h5>
                    <h5>{adr.state}</h5>
                    <h5>{adr.country}</h5>
                    <h5>{adr.pin}</h5>
                    <h5>{adr.phone}</h5>
                </div>
            ))
            }

            {/* ----------------------------------- Display All Address  --------------------------*/}

            {/* ----------------------------------- Create Address Model --------------------------*/}
            <>


                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Form onSubmit={Handlecreate}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={name} onChange={(e) => setName(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={address} onChange={(e) => setaddress(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={city} onChange={(e) => setCity(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>State / Province</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={state} onChange={(e) => setProvince(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    value={country} onChange={(e) => setCountry(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Zip / Postal code</Form.Label>
                                <Form.Control
                                    type="number"
                                    autoFocus
                                    value={pin} onChange={(e) => setPin(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="number"
                                    autoFocus
                                    value={phone} onChange={(e) => setPhone(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={Handlecreate} >
                            Add Address
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            {/* ----------------------------------- Create Address Model --------------------------*/}

        </Layout >
    )
}

export default Youraddress