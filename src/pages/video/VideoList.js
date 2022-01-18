import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./Video.css"

const VideoList = () => {
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
                        <div className='historyList'>
                            <h5>History</h5>
                        </div>
                        <div className="bottomContent">
                            <div className="videoTableHead">
                                <div className="uploadDiv">
                                    <h6>Stream History</h6>
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
                            <div className="viewAll">
                                <div className="viewAllBtn">
                                    <Link to="/video" className='clickBtn' style={{color:"#FFFFFF"}}> Return Back </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoList