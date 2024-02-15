
import React, { useState } from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


function Signup() {

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate()

  const signupf = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/v1/auth/signup", { username, email, password });
      ///console.log(req.headers)
      if (res && res.data.success) {
        console.log("Registered")
        toast.success("registered")
        navigate("/login")
      }
      else {
        console.log(res.data.success)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <video autoPlay loop muted className="video-bg">
        <source src="http://localhost:3000/uploads/weblogin.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    <div className='mdivs'>
        <form onSubmit={signupf}>
            <div className='frm'>
            <h1 className="txt">Sign Up</h1>
            <h6 >Already a member?<a href='/login' style={{textDecoration:"none",color:"green"}}> Log In</a></h6>


            <div className="one">
                <label htmlFor="email" className="form-label">User Name</label>
                <input type="text" className="form-control" placeholder="User Name" value={username} onChange={(e) => setusername(e.target.value)} required />
            </div>


            <div className="twos">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} required />
            </div>

            <div className="three">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} required />
            </div>

            <button type="submit" className="subbtn">Sign Up</button>
            < hr className='divi'/>
            </div>
        </form>
    </div>
</>




  )
}

export default Signup