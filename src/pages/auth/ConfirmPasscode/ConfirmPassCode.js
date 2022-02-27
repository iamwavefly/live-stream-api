import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import './ConfirmPasscode.css';

const ConfirmPassCode = () => {
    const history = useHistory();

    const handlePasswordCode = (e) => {
        e.preventDefault();

        history.push("/reset-password")
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
                                    <span>Confirm your account</span>
                                </div>
                                <div className="page-body">
                                    <form>
                                        <div className="form-group">
                                            <div className="iconDiv">
                                                <img src="/images/Lock.svg" alt="" />
                                            </div>
                                            <div className="inputDiv">
                                                <input type="text" placeholder='Enter reset code' name='email' style={{ borderColor: "#451ECC", paddingLeft: "35px" }} className="form-control" />
                                            </div>
                                        </div>
                                        <div className='hint' style={{ margin: "15px", textAlign:"center" }}>
                                            <span>A code has been sent to your email. Enter that code here.</span>
                                        </div>

                                        <div className="form-group">
                                            <button type='submit' onClick={handlePasswordCode} className="btn btn-text form-control" style={{ backgroundColor: "#451ECC", color: "#FFFFFF", height: "45px", borderRadius: "7px" }}>Continue</button>
                                        </div>
                                        <div>
                                            <p className='hint' style={{ textAlign: "center", color: "#666666" }}>Resend Code</p>
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

export default ConfirmPassCode
