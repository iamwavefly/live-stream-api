import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { verify } from '../../../redux/verify/VerifyAction';
import './VerifyEmail.css'
import Loader from '../../../components/Loader';
import { BACKEND_BASE_URL } from '../../../redux/backendUrl';
import axios from 'axios';
toast.configure()

const VerifyEmail = () => {
    const dispatch = useDispatch();

    const search = useLocation().search;
    const email_from = new URLSearchParams(search).get('email');
    const [loading_resend, setLoading] = useState(false)

    const [email, setEmail] = useState(email_from);
    const [verification_code, setVerificationCode] = useState('');

    const userVerify = useSelector((state) => state.userVerify);
    const { loading, error, verfiyInfo } = userVerify;

    useEffect(() => {
        setTimeout(() => {
            if (verfiyInfo) {
                toast.success("Email verification was successfull")
            }
            else {
                toast.error(error)
            }
        }, 1000)
    }, [verfiyInfo, error]);

    const handleVerify = (e) => {
        e.preventDefault();

        dispatch(verify(email, verification_code))
    }

    const handleResend = async (e) => {
        e.preventDefault();

        setLoading(true)
        try {
            const response = await axios({
                method: "post",
                url: `${BACKEND_BASE_URL}/authentication/resend_code`,
                data: ({email}),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (response.data.status === 200) {
                toast.success("A new Verification Code has been sent to your email")
            }
            console.log(response.data)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)

            console.log(error)
        }
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
                            <div className="page-verify" style={{ marginTop: "63px" }}>
                                <div className="page-verify-body">
                                    <div className="boxImage">
                                        <img src="/images/Group.svg" style={{ paddingTop: "12px", height: "65%", width: "65%" }} alt="" />
                                    </div>
                                    <div className='message'>
                                        <p>We sent you a mail, please verify your email to Proceed</p>
                                    </div>
                                </div>
                                <div className="page-body" style={{ marginTop: "-3.5rem" }}>
                                    {loading && <Loader />}
                                    {loading_resend && <Loader />}
                                    <form onSubmit={handleVerify}>
                                        <input type="hidden" name='email' value={email_from} onChange={(e) => setEmail(e.target.value)} />
                                        <div className="form-group">
                                            <div className="iconDiv">
                                                <img src="/images/Lock.svg" alt="" />
                                            </div>
                                            <div className="inputDiv">
                                                <input type="text" placeholder='Enter verification code' value={verification_code} onChange={(e) => setVerificationCode(e.target.value)} name='verification_code' style={{ borderColor: "#451ECC", paddingLeft: "35px" }} className="form-control" />
                                            </div>
                                        </div>
                                        <div className='hint' style={{ margin: "15px", textAlign: "center" }}>
                                            <span>A code has been sent to <b>{email_from}</b> for verification. Enter that code in the field above.</span>
                                        </div>

                                        <div className="form-group">
                                            <button type='submit' className="btn btn-text form-control" style={{ backgroundColor: "#451ECC", color: "#FFFFFF", height: "45px", borderRadius: "7px" }} onSubmit={handleVerify}>Continue</button>
                                        </div>
                                    </form>
                                    <div style={{textAlign:"center", marginBottom:"1.5rem", marginTop:"1.0rem"}}>
                                        <form onSubmit={handleResend}>
                                            <input type="hidden" name='email' value={email_from} onChange={(e) => setEmail(e.target.value)} />
                                            <button onClick={handleResend} className='hintBtn' style={{ textAlign: "center", color: "#666666", border:"none", padding:"0.7rem" }}>Resend Code</button>
                                        </form>
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
