import React, { useState, useEffect } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";
import "./signup.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem("auth"));
        if (authData) {
            navigate(location.state || "/");
        }
    }, []);

    const loginf = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", { email, password });
            if (res && res.data.success) {
                console.log("Logged in");
                toast.success("Login Successful");
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
                window.location.reload();
            } else {
                console.log(res.data.success);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <video autoPlay loop muted className="video-bg">
                <source src="http://localhost:3000/uploads/weblogin.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='mdiv'>
                <form onSubmit={loginf}>
                    <div className='frm'>
                        <h1 className="txt">Log In</h1>
                        <h6>New to this site?<a href='/signup' style={{textDecoration:"none",color:"green"}}> Sign Up</a></h6>


                        <div className="one">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="two">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <button type="submit" className="subbtn">Login</button>
                        <hr className='divi'/>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
