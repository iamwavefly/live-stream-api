import React from 'react'
import './CompleteVerify.css'

const CompleteVerify = () => {
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
                                        <p>Thanks for verifying your email address, you can now proceed wiith your registration.
                                            You will be automatically redirected to Login</p>
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
