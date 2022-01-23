import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./Video.css"

const Video = () => {
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

                    <div className="divContent">
                        <div className="topContent">
                            <div className="divContentLeft">
                                <div className="divContentLeft-header">
                                    <h4>My Video Uploads</h4>
                                </div>
                                <div className="divContentLeft-body">
                                    <div className="scheduleStats">
                                        <div className="scheduleNo">
                                            <h3>120</h3>
                                        </div>
                                        <div className="scheduleText">
                                            <h5>SCHEDULED VIDEOS</h5>
                                        </div>
                                    </div>
                                    <div className="scheduleStats gray">
                                        <div className="scheduleNo">
                                            <h3>120</h3>
                                        </div>
                                        <div className="scheduleText">
                                            <h5>SCHEDULED VIDEOS</h5>
                                        </div>
                                    </div>
                                    <div className="scheduleStats gray">
                                        <div className="scheduleNo">
                                            <h3>120</h3>
                                        </div>
                                        <div className="scheduleText">
                                            <h5>SCHEDULED VIDEOS</h5>
                                        </div>
                                    </div>
                                    <div className="scheduleStats gray">
                                        <div className="scheduleNo">
                                            <h3>120</h3>
                                        </div>
                                        <div className="scheduleText">
                                            <h5>SCHEDULED VIDEOS</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="divContentLeft-footer">
                                    <div className="divContentLeft-footer-top">
                                        <h4>Upload Videos</h4>
                                    </div>
                                    <div className="divContentLeft-footer-body">
                                        <div className="videoUploadBtn">
                                            <img src="/images/g-drive.svg" alt="" />
                                        </div>
                                        {/* <div className="plusSign">
                                            <div>
                                                <h5>+</h5>
                                            </div>
                                        </div> */}
                                        <div className="videoUploadBtn">
                                            <img src="/images/cloud-drive.svg" alt="" />
                                        </div>
                                        {/* <div className="plusSign">
                                            <div>
                                                <h5>+</h5>
                                            </div>
                                        </div> */}
                                        <div className="videoUploadBtn">
                                            <img src="/images/diamond.svg" alt="" />
                                        </div>
                                        {/* <div className="plusSign">
                                            <div>
                                                <h5>+</h5>
                                            </div>
                                        </div> */}
                                        <div className="videoUploadBtn" style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                                            <label htmlFor="file-input">
                                                <img src="/images/plus.svg" alt="" />
                                            </label>
                                            <input id="file-input" type="file" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="divContentRight">
                                <div className="divContentRight-header">
                                    <h5>Personal Storage</h5>
                                </div>
                                <div className="divContentRight-body">
                                    <div className="divContentRight-body-header">
                                        <h4>Video Storage</h4>
                                    </div>
                                    <div className="divContentRight-body-text">
                                        <p>Video storage capacity depends on the subscription plan. Videos that are not used for 60 days will be deleted automatically</p>
                                    </div>
                                    <div className="bodyDividers">
                                        <div className="bodyDivider1">

                                        </div>
                                        <div className="bodyDivider2">

                                        </div>
                                    </div>
                                    <div className="storageSpace">
                                        <span>USED: 256<span style={{ fontWeight: "bolder", fontSize: "15.9423px" }}>/956</span>GB</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bottomContent">
                            <div className="videoTableHead">
                                <div className="uploadDiv">
                                    <h6>Upload History</h6>
                                </div>
                                <div className="sortDiv">
                                    <h6>Sort by: Size </h6>
                                </div>
                            </div>
                            <div className="videoTableBody">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Files</th>
                                            <th>Size</th>
                                            <th>Duration</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                            {/* <th>Actions</th> */}
                                        </tr>
                                    </thead>
                                    <tbody className='tableBorder'>
                                        <tr>
                                            <td>9705791119.mp4</td>
                                            <td>2.7 Mb</td>
                                            <td>9:54</td>
                                            <td>5/27/15</td>
                                            <td>12:40 PM</td>
                                            <td>Streamed</td>
                                        </tr>
                                        <tr>
                                            <td>9705791119.mp4</td>
                                            <td>2.7 Mb</td>
                                            <td>9:54</td>
                                            <td>5/27/15</td>
                                            <td>12:40 PM</td>
                                            <td>Streamed</td>
                                        </tr>
                                        <tr>
                                            <td>9705791119.mp4</td>
                                            <td>2.7 Mb</td>
                                            <td>9:54</td>
                                            <td>5/27/15</td>
                                            <td>12:40 PM</td>
                                            <td>Streamed</td>
                                        </tr>
                                        <tr>
                                            <td>9705791119.mp4</td>
                                            <td>2.7 Mb</td>
                                            <td>9:54</td>
                                            <td>5/27/15</td>
                                            <td>12:40 PM</td>
                                            <td>Streamed</td>
                                        </tr>
                                        <tr>
                                            <td>9705791119.mp4</td>
                                            <td>2.7 Mb</td>
                                            <td>9:54</td>
                                            <td>5/27/15</td>
                                            <td>12:40 PM</td>
                                            <td>Streamed</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Link to="/video/video-list" className='clickBtn' style={{ color: "#FFFFFF" }}>
                                <div className="viewAll">
                                    <div className="viewAllBtn">
                                        View all
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Video
