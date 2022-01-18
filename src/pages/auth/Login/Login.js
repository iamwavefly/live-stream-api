import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import GoogleAuth from '../GoogleAuth';
import Loader from '../../../components/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { login } from '../../../redux/login/LoginAction';
// import { loginUser } from '../../redux/auth/authActions';
toast.configure()


const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const history = useHistory();
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userData } = userLogin;

    useEffect(()=>{
        if(userData){
            toast.success("Login was successfull")
        }
        else{
            toast.error(error)
        }
    }, [userData, error]);

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(login(email, password))
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
                                    <span>Welcome Back, Sign in</span>
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
                                        {/* ---------  Or login with email  -------- */}
                                        <div className="dash1"></div> Or login with email <div className="dash2"></div>
                                    </div>
                                    {loading && <Loader />}
                                    <form>
                                        <div className="form-group">
                                            <div className="iconDiv">
                                                <img src="/images/mail.svg" alt="" />
                                            </div>
                                            <div className="inputDiv">
                                                <input type="email" placeholder='Email' name='email' required
                                                    value={email} onChange={(e) => setEmail(e.target.value)} style={{ borderColor: "#451ECC", paddingLeft: "45px" }} className="form-control " />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="iconDiv">
                                                <img src="/images/Lock.svg" alt="" />
                                            </div>
                                            <div className="inputDiv">
                                                <input type={passwordShown ? "text" : "password"} name='password' required
                                                    value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' style={{ paddingLeft: "45px" }} className="form-control" />
                                            </div>
                                            <div className="iconDivPass">
                                                <i onClick={togglePassword} className='icon'><img src="/images/eye.svg" alt="" /></i>
                                            </div>
                                        </div>

                                        <Link to="/forgot" className='forgot' style={{ textDecoration: "none" }}>Forgot Password?</Link>

                                        <div className="form-group">
                                            <button type='submit' onClick={handleLogin} className="btn btn-text form-control" style={{ backgroundColor: "#451ECC", color: "#FFFFFF", height: "45px", borderRadius: "7px" }}>Sign In</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='form-footer'>
                                <span>New User? <Link to="/sign-up" style={{ textDecoration: "none" }}>Sign Up</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
