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
                        <div className="profileDivider">

                        </div>
                        <div className="profileContentTitle">
                            <h3>My Profile</h3>
                        </div>
                        <div className="profileDivider">

                        </div>
                        <div className="profileContentBody">
                            <div className="profilPicDiv">
                                <div className="profileImage"></div>
                                <div className="profilePicInput"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile