/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import StreamingModals from '../../components/modals/StreamingModals'
// import ShowSuccessModal from '../../components/modals/ShowSuccessModal'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import './Streaming.css'





const Streaming = () => {
    const [modal, setModal] = useState(false);
    const Toggle = () => setModal(!modal);

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

                    <div className="splitScreen">
                        <div className="splitLeft">

                       
                        
                     
                        
                        
                        {/* Screen recording upload */}
                        <div className="newStream">
                            <div className="newStreamHeader">
                                <h4>New Stream</h4>
                            </div>
                            <div className="newStreamBody">
                                <div className="newStreambodyHead">
                                    <h6>IMPORT VIDEO FILE</h6>
                                </div>
                                <div className="streamOptionsGroup">
                                    <div className="streamItem" style={{ border: "0.743529px dashed #FFFFFF", boxSizing: "border-box", borderRadius: "4.46117px" }} onClick={() => Toggle()}>
                                        <div className="streamImg">
                                            {/* <label htmlFor="file-input">
                                                <img src="/images/folder.svg" alt="" />
                                            </label> */}
                                            <img src="/images/folder.svg" alt="" />
                                            {/* <input id="file-input" type="file" /> */}
                                        </div>
                                        <div className="streamText">
                                            <h6>My Device</h6>
                                        </div>
                                    </div>
                                    <div className="streamItem" >
                                        <div className="streamImg">
                                            <img src="/images/camera.svg" alt="" />
                                        </div>
                                        <div className="streamText">
                                            <h6>Camera</h6>
                                        </div>
                                    </div>
                                    <div className="streamItem" style={{ marginTop: "0.2rem" }}>
                                        <div className="streamImg">
                                            <img src="/images/screen-record.svg" alt="" />
                                        </div>
                                        <div className="streamText">
                                            <h6>Screen Record</h6>
                                        </div>
                                    </div>
                                
                                    {/* <div className="streamItem" style={{ marginTop: "0.6rem" }}>
                                        <div className="streamImg">
                                            <img src="/images/previous-uploads.svg" alt="" />
                                        </div>
                                        <div className="streamText">
                                            <h6>Previous Uploads</h6>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                        </div>


                        {/* Cloud storage upload */}
                        <div className="uploadStream">
                        <div className="uploadStreamHeader">
                            <h5>UPLOAD VIA CLOUD STORAGE</h5>
                        </div>
                        <div className="uploadStreamBody">
                            <div className="divContentLeftFooterBody">
                                <div className="videoUploadBtn">
                                    <img src="/images/g-drive.svg" alt="" />
                                </div>
                                <div className="videoUploadBtn">
                                    <img src="/images/cloud-drive.svg" alt="" />
                                </div>
                                <div className="videoUploadBtn">
                                    <img src="/images/diamond.svg" alt="" />
                                </div>
                                <div className="videoUploadBtn" style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                                    <img src="/images/plus.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="uploadStreamFooter">
                            <p>
                                There is no file size limit when uploading video directly from your cloud storage.
                            </p>
                        </div>
                        </div>

                       

                        </div>

                        <div className="splitRight">
                            <div className="splitRightHeader">
                                <div className="mainHeading">
                                    <h4>History</h4>
                                </div>
                                <div className="subHeading">
                                    <Link to="/video/video-list">View all</Link>
                                </div>
                            </div>
                            <div className="splitRightBody">
                                <div className="videoTableBody">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Files</th>
                                                <th>Size</th>
                                                <th>Creation</th>
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
                </div>
            </div>
            <div className='uploadVideoModal'>
                <StreamingModals show={modal} close={Toggle} />
                {/* <ShowSuccessModal show={modal} close={Toggle} /> */}
            </div>
        </>
    )
}
export default Streaming