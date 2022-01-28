import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader2 from '../../components/Loader2'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { formatDate, formatTime } from '../../functions'
import { fetchAllSchedules } from '../../redux/schedule/ScheduleActions'
import './Schedule.css'

const Schedule = () => {

    const dispatch = useDispatch();
    const getAllSchedules = useSelector((state) => state.getAllSchedules)
    const { loading, error, allSchedule } = getAllSchedules;


    useEffect(() => {
        dispatch(fetchAllSchedules())
    }, [dispatch]);

    useEffect(() => {

        // console.log(allVideos)

    }, [dispatch, allSchedule]);

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
                        <div className="leftSplit">
                            <div className="leftSplitTop">
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
                                    <div className="sortByDiv">
                                        <h6>Sort by: Size </h6>
                                    </div>
                                </div>
                                <div className="scheduleTableBody">
                                {loading ? (<Loader2 />) : (
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
                                                <tr key={video.video_id}>
                                                    <td>{video.title}</td>
                                                    <td>{video.stream_date}</td>
                                                    <td>{video.stream_time}</td>
                                                    <td>{video.status}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                )}
                                </div>
                            </div>
                        </div>
                        <div className="rightSplit">
                            <div className="rightSplitHeader">
                                <h4>Details</h4>
                            </div>
                            <div className="rightSplitBody">
                                <div className="rightSplitBodyTop">
                                    <div className="fileSize">
                                        <h5>9705791119.mp4</h5>
                                    </div>
                                    <div className="viewStatus">
                                        <h6>Streamed</h6>
                                    </div>
                                </div>
                                <div className="rightSplitBodyImage">
                                    <div className="videoIconBtn">
                                        <img src="/images/videoIconBtn.svg" alt="" />
                                    </div>
                                </div>
                                <div className="rightSplitBodyTags">
                                    <div className="bodyTimeTags">
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
                                    <div className="iconDetailTags">
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
                                            <p>Scheduled:<span> 24 Sep, Thu, 12:25 (Amman Time)</span></p>
                                        </div>
                                        <div className="scheduledBy">
                                            <p>Scheduled By:<span> Fabusuyi Oluwatobi</span></p>
                                        </div>
                                        <div className="scheduleProfile">
                                            <p>Profile:<span> Fabusuyi Oluwatobi</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="streamPlatformsHere">
                                    <div className="streamDetailsTop">
                                        <h4>Streamed Platforms</h4>
                                    </div>
                                    <div className="streamTags">
                                        <div className="streamItemTags">
                                            <img src="/images/vectorImage.svg" alt="" />
                                        </div>
                                        <div className="streamItemTags">
                                            <img src="/images/chatImage.svg" alt="" />
                                        </div>
                                        <div className="streamItemTags">
                                            <img src="/images/you-tube-image.svg" alt="" />
                                        </div>
                                        <div className="streamItemTags">
                                            <img src="/images/face-book-image.svg" alt="" />
                                        </div>
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

export default Schedule