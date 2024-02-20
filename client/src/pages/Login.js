import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { userVerify } from "../services/Apis";
import Spinner from 'react-bootstrap/Spinner';
import "../styles/mixlogin.css"

const Login = () => {
    const [passhow, setPassShow] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spiner, setSpiner] = useState(false);

    const navigate = useNavigate();

    // sendotp
    const login = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Enter Your Email !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        } else {
            setSpiner(true)
            const data = {
                email: email,
                password: password
            }

            const response = await userVerify(data);
            if (response.data.role === 'unVerifiedUser') {
                localStorage.setItem('jwtToken', response.data.token);
                setSpiner(false);
                navigate("/home");
            } else if (response.data.role === 'admin') {
                localStorage.setItem('jwtToken', response.data.token);
                setSpiner(false);
                navigate("/admindash");
            } else {
                toast.error(response.response.data.error);
            }
        }
    }

    return (
        <>
            <section className='login'>
                <img src="img/log.jpg" className='back' alt="loginbackground" />
                <div className="login1 " style={{ height: '75%' }}>
                    <div className="heading">
                        <img src="img/portexim.png" style={{ height: '100%' }} alt="portexim logo" />
                    </div>
                    <form className='login3' style={{ marginTop: '1px' }}>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className='two'>
                                <input type={!passhow ? 'password' : 'text'} name="password" id="" onChange={(e) => setPassword(e.target.value)} />
                                <div className='showpass' onClick={() => setPassShow(!passhow)} >
                                    {!passhow ? 'Show' : 'Hide'}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={login}>Login
                            {
                                spiner ? <span><Spinner animation="border" /></span> : ""
                            }
                        </button>
                        <p>Don't have and account <NavLink to="/register">Sign up</NavLink> </p>
                    </form>
                </div>
                <ToastContainer />
            </section >
        </>
    )
}

export default Login