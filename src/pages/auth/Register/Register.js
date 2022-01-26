import React, { useEffect, useState } from 'react'
import './Register.css';
import { Link, useHistory } from "react-router-dom";
import GoogleAuth from '../GoogleAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import { register } from '../../../redux/register/RegisterAction';
toast.configure()


const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();
    const [passwordShown, setPasswordShown] = useState(false);
    // const [message, setMessage] = useState(null);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }
    const history = useHistory();
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userData } = userRegister;
    // console.log(userData)
    useEffect(()=>{
        if(userData){
            toast.success("Registartion was successfull")
        }
        else{
            toast.error(error)
        }
    }, [userData, error]);

    const handleReg = (e) => {
        e.preventDefault();

        dispatch(register(name, email, password))
    }
    return (
        <>
            <section>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="content">
                            <div className="show-logo">
                                <img src="/images/main-logo.svg" alt="" />
                            </div>
                            <div className="page">
                                <div className="page-header">
                                    <span>Welcome! create your account</span>
                                </div>
                                <div className='continue'>
                                    <span className='continueText'>Continue with</span> <br />

                                    <GoogleAuth />

                                </div>
                                <div className="social col-lg-12" style={{ textAlign: "center" }}>
                                    {/* Social media auth */}
                                </div>
                                <div className="page-body">
                                    <div className="or">
                                        Or login with email
                                        {/* <div className="dash1"></div> Or login with email <div className="dash2"></div> */}
                                    </div>
                                    {/* {message && <Message variant="danger">{message}</Message>} */}
                                    {loading && <Loader />}
                                    <form onSubmit={handleReg}>
                                        <div className="form-group">
                                            <div className='iconDiv'>
                                                <img src="/images/Profile.svg" alt="" />
                                            </div>
                                            <div className='inputDiv'>
                                                <input type="text" placeholder='Full name' required value={name} onChange={(e) => setName(e.target.value)} name='name' style={{ paddingLeft: "35px" }} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="iconDiv">
                                                <img src="/images/mail.svg" alt="" />
                                            </div>
                                            <div className="inputDiv">
                                                <input type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} name='email' style={{ paddingLeft: "35px" }} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="iconDiv">
                                                <img src="/images/Lock.svg" alt="" />
                                            </div>
                                            <div className="inputDiv">
                                                <input type={passwordShown ? "text" : "password"} required value={password} onChange={(e) => setpassword(e.target.value)} name='password' placeholder='Password' style={{ paddingLeft: "35px" }} className="form-control" />
                                            </div>
                                            <div className="iconDivPass">
                                                <i onClick={togglePassword} className='icon'><img src="/images/eye.svg" alt="" /></i>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: "10px", lineHeight: "15px", textAlign: "center", color: "#666666" }}>Hint: Password must contain one of uppercase lowercase, number and special characters</p>
                                        <div className="form-group">
                                            <button type='submit' onClick={handleReg} className="btn btn-text form-control" style={{ backgroundColor: "#451ECC", color: "#FFFFFF", height: "45px", borderRadius: "7px" }}>Sign Up</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='form-footer'>
                                <span>Already have an account? <Link to="/login" style={{ textDecoration: "none" }}>Log In</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register
