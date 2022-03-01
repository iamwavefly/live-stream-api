/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Loader2 from '../../components/Loader2'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { fetchAllSchedules } from '../../redux/schedule/ScheduleActions'
import './Schedule.css'
import { BACKEND_BASE_URL } from "../../redux/backendUrl";
import axios from 'axios'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify';


toast.configure();

const Schedule = () => {

    const dispatch = useDispatch();
    const [selectedSchedule, setSelectedSchedule] = React.useState(null);
    const [loadingRemove, setLoadingRemove] = React.useState(false);
    const [successRemove, setSuccessRemove] = React.useState(false);
    
    const getAllSchedules = useSelector((state) => state.getAllSchedules)
    const { loading, error, allSchedule } = getAllSchedules;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const selectSchedule = (schedule) => {
        setSelectedSchedule(schedule);
    }


    useEffect(() => {
        dispatch(fetchAllSchedules())
    }, []);

    const removeSchedule = () => {
        setLoadingRemove(true);
        var data = {
            "token" : userInfo.data.token,
            "video_id" : selectedSchedule.video_id
        }

        let config = {
            headers: {
                'Content-Type': 'application/json',
            },
            url: `${BACKEND_BASE_URL}/video/unschedule_video`,
            method: 'PUT',
            data: data
        }

        axios(config)
            .then(function (response) {
                setLoadingRemove(false);
                setSuccessRemove(true)
                toast.success("Successfully removed scheduled video");
                window.location.reload();
            })
            .catch(function (error) {
                setLoadingRemove(false);
                alert(error);
            });
    }

    
    return (
        <>
        {loadingRemove && <Loader />}
            <div className="mainContent">
                <div className="left">
                    <Sidebar />
                </div>
                <div className="right">
                    <div className="navBar">
                        <Navbar />
                    </div>

                    <div className="splitScreen">
                        <div className="leftSplit">
                            <div className="leftSplitTop" style={{display: "none"}}>
                                <div className="leftSplitTopTitle">
                                    <h4>Schedule</h4>
                                </div>
                                <div className="leftSplitTopContent">
                                    <div className="contentHeader">
                                        <h5>Scheduling Queue</h5>
                                    </div>
                                    <div className="contentBody">
                                        <p>
                                            Keep filling up your scheduling slots with new streams.
                                            Remember, there is no limit on streams per month. Every subscription plan has different number of slots available at any given time.
                                        </p>
                                    </div>
                                    <div className="contentFooter">
                                        <div className="contentFooterTop">
                                            <div className="footerTopLeft">
                                                <h6>Scheduling Queue Slots </h6>
                                            </div>
                                            <div className="footerTopRight">
                                                <p>USED: 056<span style={{ fontSize: "18px" }}>/1000</span></p>
                                            </div>
                                        </div>
                                        <div className="contentFooterBottom">
                                            <div className="bodyDividers">
                                                <div className="bodyDivider1">

                                                </div>
                                                <div className="bodyDivider2">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="leftSplitBody">
                                <div className="splitTableHead">
                                    <div className="scheduleDiv">
                                        <h6>Schedule History</h6>
                                    </div>
                                    {/* <div className="sortByDiv">
                                        <h6>Sort by: Size </h6>
                                    </div> */}
                                </div>
                                <div className="scheduleTableBody">
                                {loading ? (<Loader />) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Files</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className='tableBorder'>
                                            {allSchedule && allSchedule?.data?.videos.map(video =>
                                                <tr key={video.video_id} onClick={() => selectSchedule(video)}>
                                                    <td>{video.title}</td>
                                                    <td>{video.date}</td>
                                                    <td>{video.time}</td>
                                                    <td>{video.status}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                )}
                                </div>
                            </div>
                        </div>


                        {selectedSchedule && 
                        <div className="rightSplit">
                            <div className="rightSplitHeader">
                                <h4>Details</h4>
                            </div>

                           
                            <div className="rightSplitBody">
                                <div className="rightSplitBodyTop">
                                    <div className="fileSize">
                                        <h5>{selectedSchedule.name}</h5>
                                    </div>
                                    <div className="viewStatus">
                                        <h6>{selectedSchedule.status}</h6>
                                    </div>
                                </div>
                                <div className="rightSplitBodyImage">
                                        
                                            
                                <video id="my-video" className="video-js" controls preload="auto" width="100%" height="auto" autoplay muted>
                                        <source src={selectedSchedule.url}type="video/mp4" />
                                </video>

                               
                                </div>
                                <div>
                                    {selectedSchedule.status === "Streamed" ? ("") : (
                                           <button 
                                           style={{
                                               backgroundColor: "red",
                                               color: "white",
                                               border: "none",
                                               borderRadius: "5px",
                                               padding: "10px",
                                               marginTop: "10px",
                                               width: "30%",
                                               cursor: "pointer"
       
                                           }}
                                           onClick={removeSchedule}
                                           >
                                               Remove
                                           </button>
                                    )}
                                 

                                </div>
                                <div className="rightSplitBodyTags">
                                    <div className="bodyTimeTags" style={{display: "none"}}>
                                        <div className="timeItemTag">
                                            <h2>59</h2>
                                            <span>Days</span>
                                        </div>
                                        <div className="timeItemTag">
                                            <h2>23</h2>
                                            <span>Hours</span>
                                        </div>
                                        <div className="timeItemTag">
                                            <h2>59</h2>
                                            <span>Minutes</span>
                                        </div>
                                        <div className="timeItemTag">
                                            <h2>59</h2>
                                            <span>Seconds</span>
                                        </div>
                                    </div>
                                    <div className="iconDetailTags" style={{display: "none"}}>
                                        <div className="iconItemTags">
                                            <img src="/images/retweetBtn.svg" alt="" />
                                        </div>
                                        <div className="iconItemTags">
                                            <img src="/images/helpBtn.svg" alt="" />
                                        </div>
                                        <div className="iconItemTags">
                                            <img src="/images/shareBtn.svg" alt="" />
                                        </div>
                                        <div className="iconItemTags">
                                            <img src="/images/copyBtn.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="scheduleDetailsHere">
                                    <div className="scheduleDetailsTop">
                                        <h4>Schedule Details</h4>
                                    </div>
                                    <div className="scheduleDetailsBody">
                                        <div className="scheduleTime">
                                            <p>Scheduled:<span>  {selectedSchedule.date}  {selectedSchedule.time}</span></p>
                                        </div>
                                        <div className="scheduledBy">
                                            <p>Scheduled By:<span>  {selectedSchedule.scheduled_by}</span></p>
                                        </div>
                                        <div className="scheduleProfile">
                                            <p>Profile:<span>  {selectedSchedule.scheduled_by} </span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="streamPlatformsHere">
                                    <div className="streamDetailsTop">
                                        <h4>Streamed Platforms</h4>
                                    </div>
                                    <div className="streamTags">

                                        {selectedSchedule.is_twitch === true ? (
                                            <div className="streamItemTags">
                                            <img src="/images/chatImage.svg" alt="" />
                                            </div>
                                        ) 
                                        : ("")}


                                        {selectedSchedule.is_youtube === true ? (
                                         <div className="streamItemTags">
                                         <img src="/images/you-tube-image.svg" alt="" />
                                        </div>
                                        ) 
                                        : ("")}


                                        {selectedSchedule.is_facebook === true ? (
                                        <div className="streamItemTags">
                                        <img src="/images/face-book-image.svg" alt="" />
                                        </div>
                                        ) 
                                        : ("")}

                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                        }


                    </div>
                </div>
            </div>
        </>
    )
}

export default Schedule