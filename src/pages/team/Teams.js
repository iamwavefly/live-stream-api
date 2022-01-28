import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import './Teams.css'

const Teams = () => {
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

                    <div className="teamScreenDivide">
                        <div className="teamLeft">
                            <div className="teamLeftHead">
                                <div className="teamLeftHeadItem blueColor">
                                    <div className="teamNo">
                                        <h1>12</h1>
                                    </div>
                                    <div className="teamText">
                                        <h6>TEAM MEMBERS</h6>
                                    </div>
                                </div>
                                <div className="teamLeftHeadItem grayColor">
                                    <div className="teamNo">
                                        <h1>120</h1>
                                    </div>
                                    <div className="teamText">
                                        <h6>UPLOADED VIDEOS</h6>
                                    </div>
                                </div>
                                <div className="teamLeftHeadItem grayColor">
                                    <div className="teamNo">
                                        <h1>120 <span style={{ fontSize: "13px" }}>mb</span></h1>
                                    </div>
                                    <div className="teamText">
                                        <h6>VIDEO STORAGE</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="teamLeftBody">
                                <div className="videoTableBody">
                                    <table>
                                        <thead>
                                            <tr>
                                                {/* <th></th> */}
                                                <th>Names</th>
                                                <th>Email</th>
                                                <th>Position</th>
                                                <th>Uploads</th>
                                                {/* <th>Actions</th> */}
                                            </tr>
                                        </thead>
                                        <tbody className='tableBorder'>
                                            <tr>
                                                {/* <td><img src="/images/team.svg" alt="" /></td> */}
                                                <td>Emilia Dunes</td>
                                                <td>bill.sanders@example.com</td>
                                                <td>Personal Assistant</td>
                                                <td>38</td>
                                            </tr>
                                            <tr>
                                                <td>Emilia Dunes</td>
                                                <td>bill.sanders@example.com</td>
                                                <td>Personal Assistant</td>
                                                <td>38</td>
                                            </tr>
                                            <tr>
                                                <td>Emilia Dunes</td>
                                                <td>bill.sanders@example.com</td>
                                                <td>Personal Assistant</td>
                                                <td>38</td>
                                            </tr>
                                            <tr>
                                                <td>Emilia Dunes</td>
                                                <td>bill.sanders@example.com</td>
                                                <td>Personal Assistant</td>
                                                <td>38</td>
                                            </tr>
                                            <tr>
                                                <td>Emilia Dunes</td>
                                                <td>bill.sanders@example.com</td>
                                                <td>Personal Assistant</td>
                                                <td>38</td>
                                            </tr>
                                            <tr>
                                                <td>Emilia Dunes</td>
                                                <td>bill.sanders@example.com</td>
                                                <td>Personal Assistant</td>
                                                <td>38</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="teamRight">
                            <div className="teamRightTop">
                                <div className="teamRightTopLeft">
                                    <div className="teamProfileImage">
                                        <img src="/images/profile-image2.svg" style={{ width: "80%" }} alt="" />
                                    </div>
                                </div>
                                <div className="teamRightTopRight">
                                    <div className="teamHeadDetails">
                                        <div className="headName">
                                            <h3>Emilia Dunes</h3>
                                        </div>
                                        <div className="headEmail">
                                            <h5>deanna.curtis@example.com</h5>
                                        </div>
                                        <div className="headPosition">
                                            <h4>Human Resources</h4>
                                        </div>
                                    </div>
                                    <div className="teamBodyDetails">
                                        <div className="modifyDiv">
                                            {/* <div className="editIcon">
                                            <img src="" alt="" />
                                        </div> */}
                                            <div className="editText">
                                                <button className='modifyBtn'>Modify User</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="teamRightBody">
                                <div className="inviteTeamHead">
                                    <h4>Invite Team member</h4>
                                </div>
                                <div className="inviteTeamBody">
                                    
                                </div>
                                <div className="inviteTeamFooter">
                                    <div className="inviteBtn">
                                        <button className='inviteBtnStyle'>Invite</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Teams