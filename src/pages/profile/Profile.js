import React from 'react'
import "./Profile.css"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"

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
                                <a href="">Profile</a>
                            </div>
                            <div className="profileContentItem">
                                <a href="">Account</a>
                            </div>
                            <div className="profileContentItem">
                                <a href="">Notifications</a>
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
                                    <a href="">Change Picture</a>
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
                                            <input type="text" className='formControl' name="fullname" value="deanna.curtis@example.com" id="" />
                                        </div>
                                        <div className="formGroup">
                                            <label>Phone number</label>
                                            <input type="text" className='formControl' name="fullname" value="Emilia Dunes" id="" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="profilePasswordDiv">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile