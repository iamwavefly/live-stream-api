import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './CompleteVerify.css'

const CompleteVerify = () => {

    useEffect(()=>{
        setTimeout(()=>{
            document.location.href("/login")
        }, 1000);
    }, []);

    return (
        <>
            <section>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="content">
                            <div className="show-logo">
                                <img src="/images/main-logo.svg" alt="" />
                            </div>
                            <div className="page-verify">
                                <div className="page-verify-body">
                                    <div className="boxImage">
                                        <img src="/images/Group.svg" style={{ paddingTop: "10px" }} alt="" />
                                    </div>
                                    <div className='message'>
                                        <p>Thanks for verifying your email address, you registration is now complete and you can now proceed to <Link to="/login">Login</Link> to your account</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CompleteVerify
