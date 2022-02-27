import React from 'react';
import { Link } from 'react-router-dom';
import './ResetSuccess.css';

const ResetSuccess = () => {
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
                                <div className="page-body">
                                    <div className="form-group">
                                        <div className="boxImageSuccess">
                                            <img src="/images/success.svg" style={{ padding: "12px", height: "80%", width: "80%" }} alt="" />
                                        </div>
                                    </div>
                                    <div className='resetSuccess'>
                                        <p>Your password has been reset</p>
                                        <div style={{ marginTop: "-15px" }}>
                                            <span style={{ fontWeight: "normal", fontSize: "16px", lineHeight: "20px", color: "#15202B" }}>Please sign in to your account</span>
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginTop: "35px" }}>
                                        <Link to="/login" className="btn btn-text form-control" style={{ backgroundColor: "#451ECC", color: "#FFFFFF", height: "45px", borderRadius: "7px", textDecoration:"none" }}> Go to sign in </Link>
                                    </div>

                                </div>
                            </div>
                            <div className='form-footer' style={{ marginTop: "35px" }}>
                                <span>New User? <Link to="/sign-up"  style={{textDecoration:"none"}}>Sign Up</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResetSuccess
