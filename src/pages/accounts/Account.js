import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import './Account.css'

const Account = () => {
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
                    <div className="contentDiv">
                        <div className="contentLeft">
                            <div className="addAccountDiv">
                                <div className="addAccount-header">
                                    <h4>Add Accounts</h4>
                                </div>
                                <div className="addAccountBody">
                                    <div className="socialIconsGroup">
                                        <div className="socialItem1">
                                            <img src="/images/instagram.svg" alt="" />
                                        </div>
                                        <div className="socialItem1">
                                            <img src="/images/twitter.svg" alt="" />
                                        </div>
                                        <div className="socialItem1">
                                            <img src="/images/youtube.svg" alt="" />
                                        </div>
                                        <div className="socialItem1">
                                            <img src="/images/faceGroup.svg" alt="" />
                                        </div>
                                    </div>
                                    <div className="borderRights">
                                        <div className="borderLineRight2">

                                        </div>
                                        <div className="borderLineRight1">

                                        </div>
                                        <div className="borderLineRight2">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="scheduledStreamDiv">
                                <div className="scheduledStream-header">
                                    <div className="mainText">
                                        <h4>Scheduled stream</h4>
                                    </div>
                                    <div className="subText">
                                        <h6>Sort by: Facebook</h6>
                                    </div>
                                </div>
                                <div className="scheduledStream-body">
                                    <div className="videoTableBody">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Files</th>
                                                    <th>Size</th>
                                                    <th>Duration</th>
                                                    <th>Status</th>
                                                    {/* <th>Actions</th> */}
                                                </tr>
                                            </thead>
                                            <tbody className='tableBorder'>
                                                <tr>
                                                    <td>9705791119.mp4</td>
                                                    <td>2.7 Mb</td>
                                                    <td>9:54</td>
                                                    <td>Streamed</td>
                                                </tr>
                                                <tr>
                                                    <td>9705791119.mp4</td>
                                                    <td>2.7 Mb</td>
                                                    <td>9:54</td>
                                                    <td>Streamed</td>
                                                </tr>
                                                <tr>
                                                    <td>9705791119.mp4</td>
                                                    <td>2.7 Mb</td>
                                                    <td>9:54</td>
                                                    <td>Streamed</td>
                                                </tr>
                                                <tr>
                                                    <td>9705791119.mp4</td>
                                                    <td>2.7 Mb</td>
                                                    <td>9:54</td>
                                                    <td>Streamed</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contentRight">
                            <div className="contentRight-header">
                                <h4>Active Accounts</h4>
                            </div>
                            <div className="activeAccountsDiv">
                                <div className="acctItemLeft">
                                    <div className="socialAccount">
                                        <div className="socialAcctIcon" style={{ background: "#395185", width: "30px", textAlign: "center" }}>
                                            <img src="/images/facebookAcct.svg" alt="" />
                                        </div>
                                        <div className="socialAcctText"><a href="">Facebook</a></div>
                                    </div>
                                    <div className="socialName" style={{marginLeft:"-1.5rem"}}>
                                        <span>Bualdfam Trunix </span>
                                    </div>
                                    <div className="removeText">
                                        <a href="">Remove</a>
                                    </div>
                                </div>
                                <div className="acctItemLeft">
                                    <div className="socialAccount">
                                        <div className="socialAcctIcon">
                                            <img src="/images/youtubeAcct.svg" alt="" />
                                        </div>
                                        <div className="socialAcctText"><a href="">Youtube</a></div>
                                    </div>
                                    <div className="socialName">
                                        <span>Erik Lamx dert </span>
                                    </div>
                                    <div className="removeText">
                                        <a href="">Remove</a>
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
export default Account
