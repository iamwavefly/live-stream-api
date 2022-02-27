import React from 'react'
import "./Profile.css"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { Link } from 'react-router-dom'

const ProfileNotification = () => {
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
                                <h3>Notifications</h3>
                            </div>
                            <div className="profileDivider">

                            </div>
                        </div>
                        <div className="notifyMainContent">
                            <div className="flexGuys">

                            </div>
                            <div className="notifyContent">
                                <div className="notifyHead">
                                    <h3>Schedule Notifications</h3>
                                </div>
                                <div className="notifyBody">
                                    <div className="notifyItem">
                                        {/* <div className="notifyIcon">
                                            <input type="checkbox" name="" id="" />
                                        </div> */}
                                        <div className="notifyText">
                                            <div className="notifyTextHead">
                                                <h3>Stream Goes Live</h3>
                                            </div>
                                            <div className="notifyTextBody">
                                                <p>Send me an email when my live stream starts.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="notifyItem">
                                        {/* <div className="notifyIcon">
                                            <input type="checkbox" name="" id="" />
                                        </div> */}
                                        <div className="notifyText">
                                            <div className="notifyTextHead">
                                                <h3>Event Notificaiton</h3>
                                            </div>
                                            <div className="notifyTextBody">
                                                <p>Send me an email when my event notification has triggered.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="notifyItem">
                                        {/* <div className="notifyIcon">
                                            <input type="checkbox" name="" id="" />
                                        </div> */}
                                        <div className="notifyText">
                                            <div className="notifyTextHead">
                                                <h3>Stream Failure</h3>
                                            </div>
                                            <div className="notifyTextBody">
                                                <p>Send me email every time when my scheduled stream fails to go live.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="notifyContent" style={{ marginLeft: "6.5rem" }}>
                                <div className="notifyHead">
                                    <h3>Team Management</h3>
                                </div>
                                <div className="notifyBody">
                                    <div className="notifyItem">
                                        {/* <div className="notifyIcon">
                                            <input type="checkbox" name="" id="" />
                                        </div> */}
                                        <div className="notifyText">
                                            <div className="notifyTextHead">
                                                <h3>Awaiting Approval</h3>
                                            </div>
                                            <div className="notifyTextBody">
                                                <p>Send me an email when new schedule approval is pending.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="notifyItem">
                                        {/* <div className="notifyIcon">
                                            <input type="checkbox" name="" id="" />
                                        </div> */}
                                        <div className="notifyText">
                                            <div className="notifyTextHead">
                                                <h3>New Managed Account</h3>
                                            </div>
                                            <div className="notifyTextBody">
                                                <p>Send me an email when team owner assignes me a new managed account.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="notifyItem">
                                        {/* <div className="notifyIcon">
                                            <input type="checkbox" name="" id="" />
                                        </div> */}
                                        <div className="notifyText">
                                            <div className="notifyTextHead">
                                                <h3>Role Change</h3>
                                            </div>
                                            <div className="notifyTextBody">
                                                <p>Send me an email when my role changes on a managed account.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="notifyFooter">
                            <button className="saveBtn">Save</button>
                        </div>
                        <form>
                            <div className="notifyFooter">
                                <button className="cancelBtn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileNotification
