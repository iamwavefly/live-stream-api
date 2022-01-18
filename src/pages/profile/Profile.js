import React from 'react'
import "./Profile.css"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { Link } from 'react-router-dom'

const Profile = () => {
    return (
        <>
            <div className="mainContent">
                <div className="left">
                    <Sidebar />
                </div>
                <div className="right">
                    <div className="navBar">
                        <Navbar />
                    </div>
                    <div className="profileContent">
                        <div className="profileContentHeader">
                            <div className="profileContentItem">
                                <Link to="/profile">Profile</Link>
                            </div>
                            <div className="profileContentItem">
                                <Link to="/profile/account">Account</Link>
                            </div>
                            <div className="profileContentItem">
                                <Link to="/profile/notification">Notifications</Link>
                            </div>
                        </div>
                        <div className="headerSectionDiv">
                            <div className="profileDivider">

                            </div>
                            <div className="profileContentTitle">
                                <h3>My Profile</h3>
                            </div>
                            <div className="profileDivider">

                            </div>
                        </div>
                        <div className="profileContentBody">
                            <div className="profilePicDiv">
                                <div className="profileImage">
                                    <img src="/images/profile-image2.svg" alt="" />
                                </div>
                                <div className="profilePicInput">
                                    <input type="file" />
                                </div>
                            </div>
                            <div className="profileDetailsDiv">
                                <div className="formHeader">
                                    <h5>My Details</h5>
                                </div>
                                <div className="formBody">
                                    <form className='formElement'>
                                        <div className="formGroup">
                                            <label>Full Name</label>
                                            <input type="text" className='formControl' name="fullname" value="Emilia Dunes" id="" />
                                        </div>
                                        <div className="formGroup">
                                            <label>Email</label>
                                            <input type="text" className='formControl' name="email" value="deanna.curtis@example.com" id="" />
                                        </div>
                                        <div className="formGroup">
                                            <label>Phone number</label>
                                            <input type="text" className='formControl' name="password" value="09-09000300" id="" />
                                        </div>
                                        <div className="formGroup">
                                            <label>Country</label>
                                            <input type="text" className='formControl' name="password" value="09-09000300" id="" />
                                        </div>
                                        <div className="formGroup">
                                            <button className="formBtn">Update Profile</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="profilePasswordDiv">
                                <div className="formHeader">
                                    <h5>Change Password</h5>
                                </div>
                                <div className="formBody">
                                    <form className='formElement'>
                                        <div className="formGroup">
                                            <label>Old Password</label>
                                            <input type="password" className='formControl' id="" />
                                        </div>
                                        <div className="formGroup">
                                            <label>New Password</label>
                                            <input type="password" className='formControl' id="" />
                                        </div>
                                        <div className="formGroup">
                                            <label>Confirm Password</label>
                                            <input type="password" className='formControl' id="" />
                                        </div>
                                        <div className="formGroup">
                                            <button className="formBtn">Change Password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile