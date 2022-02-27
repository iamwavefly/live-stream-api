import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './ForgotPassword.css';


const ForgotPassword = () => {
    const history = useHistory();

    const handlePasswordEmail = (e) => {
        e.preventDefault();

        history.push("/confirm-code")
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
                            <div className="page" style={{ marginTop: "70px" }}>
                                <div className="page-header" style={{ marginBottom: "12px" }}>
                                    <span>Reset Password</span>
                                </div>
                                <div className="page-body">
                                    <div className='hint' style={{ marginTop: "15px", textAlign: "center", padding:"12px" }}>
                                        <span>Please enter your email address to confirm your account</span>
                                    </div>
                                    <form style={{marginTop:"20px"}}>
                                        <div className="form-group">
                                            <div className="iconDiv">
                                                <img src="/images/mail.svg" alt="" />
                                            </div>
                                            <div className="inputDiv">
                                                <input type="email" placeholder='Email' name='email' style={{ borderColor: "#451ECC", paddingLeft: "35px" }} className="form-control" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <button type='submit' onClick={handlePasswordEmail} className="btn btn-text form-control" style={{ backgroundColor: "#451ECC", color: "#FFFFFF", height: "45px", borderRadius: "7px" }}>Reset Password</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className='form-footer' style={{ marginTop: "40px" }}>
                                <span>New User? <Link to="/sign-up" style={{ textDecoration: "none" }}>Sign Up</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ForgotPassword
