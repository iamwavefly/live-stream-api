import React from 'react'
import './VerifyEmail.css'

const VerifyEmail = () => {
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
                                        <img src="/images/Group.svg" style={{paddingTop:"12px", height: "65%", width: "65%" }} alt="" />
                                    </div>
                                    <div className='message'>
                                        <p>We sent you a mail, please verify your email to Proceed</p>
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

export default VerifyEmail
