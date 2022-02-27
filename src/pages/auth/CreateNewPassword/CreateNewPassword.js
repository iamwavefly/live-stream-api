import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './CreateNewPassword.css';

const CreateNewPassword = () => {
    const [passwordShown, setPasswordShown] = useState(false);

    const history = useHistory();

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    const handlePasswordCreate = (e) => {
        e.preventDefault();

        history.push("/reset-successfull");
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
                                    <span>Create new password</span>
                                </div>
                                <div className="page-body">
                                    <form>
                                        <div className="form-group">
                                            <div className="iconDiv">
                                                <img src="/images/Lock.svg" alt="" />
                                            </div>
                                            <div className="inputDiv">
                                                <input type={passwordShown ? "text" : "password"} name='password1' placeholder='Enter new password' style={{ borderColor: "#451ECC", paddingLeft: "35px" }} className="form-control" />
                                            </div>
                                            <div className="iconDivPass">
                                                <i onClick={togglePassword} className='icon'><img src="/images/eye.svg" alt="" /></i>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="iconDiv">
                                                <img src="/images/Lock.svg" alt="" />
                                            </div>
                                            <div className="inputDiv">
                                                <input type={passwordShown ? "text" : "password"} name='password2' placeholder='Confirm password' style={{ paddingLeft: "35px" }} className="form-control" />
                                            </div>
                                            <div className="iconDivPass">
                                                <i onClick={togglePassword} className='icon'><img src="/images/eye.svg" alt="" /></i>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <button type='submit' onClick={handlePasswordCreate} className="btn btn-text form-control" style={{ backgroundColor: "#451ECC", color: "#FFFFFF", height: "45px", borderRadius: "7px" }}>Complete Reset</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='form-footer' style={{ marginTop: "40px" }}>
                                <span>New User? <Link to="/sign-up" style={{textDecoration:"none"}}>Sign Up</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateNewPassword
