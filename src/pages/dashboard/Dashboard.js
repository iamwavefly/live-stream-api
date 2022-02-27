/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./Dashboard.css"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllVideos } from '../../redux/getVideos/GetVideoAction'
import Loader from '../../components/Loader'

const Dashboard = () => {
    const dispatch = useDispatch();

    const getallVideos = useSelector((state) => state.getallVideos)
    const { loading, error, allVideos } = getallVideos;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    
    useEffect(() => {
        if(!userInfo){
            //redirect to login page
            window.location.href = "/login"
        }else{
            dispatch(fetchAllVideos())
        }
    }, [])


    if(loading){
        return <Loader />
    }
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
                    <div className="content-div">
                        <div className="leftContent">
                            <div className="welcome">
                                <div className="welcome-left">
                                    <div className="welcome-left-header">
                                        <h4>Welcome back {userInfo?.data?.name}!</h4>
                                    </div>
                                    <div className="welcome-left-body">
                                        <p>
                                            You have <span>{allVideos?.data?.queued_videos_length}</span> pending streams for upload and <span>{allVideos?.data?.streamed_videos_length}</span> completed  streams
                                        </p>
                                    </div>
                                </div>
                                <div className="welcome-right">
                                    <div className="welcome-image">
                                        <img src="/images/image1.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="overview">
                                <div className="overview-header">
                                    <h4>My Overview</h4>
                                </div>
                                <div className="overview-body">
                                    <div className="overview-cards blue">
                                        <div className="cards-left white">
                                            <h1>{allVideos?.data?.streaming_videos_length}</h1>
                                            <p>ONGOING LIVE STREAM</p>
                                        </div>
                                        <div className="cards-right white">
                                            <img src="/images/image2.svg" alt="" />
                                        </div>
                                    </div>
                                    <div className="overview-cards gray">
                                        <div className="cards-left black">
                                            <h1>{allVideos?.data?.scheduled_videos_length}</h1>
                                            <p>SCHEDULED STREAM</p>
                                        </div>
                                        <div className="cards-right">
                                            <img src="/images/Menu.svg" alt="" />
                                        </div>
                                    </div>
                                    {/* <div className="overview-cards gray">
                                        <div className="cards-left black">
                                            <h1>{allVideos?.data?.queued_videos_length}</h1>
                                            <p>CONNECTED ACCOUNT</p>
                                        </div>
                                        <div className="cards-right">
                                            <img src="/images/Notes.svg" alt="" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                          {/* Graph */}
                            
                        </div>
                        <div className="rightContent">
                            <div className="rightContentHeader">
                                <h4>Activity</h4>
                            </div>
                            <div className="activityItem">
                                <div className="activityTitle">
                                    <div className="activityText">
                                        <h5>Livestream Calender</h5>
                                    </div>
                                    <div className="activityTime">
                                        <h5>12:10pm</h5>
                                    </div>
                                </div>
                                <div className="activityContent">
                                    <p>Detailed live analytics are available from Standard Plan onwards. You can still access basic analytics available on Dashboard.</p>
                                </div>
                            </div>
                            <div className="activityItem">
                                <div className="activityTitle">
                                    <div className="activityText">
                                        <h5>Livestream Calender</h5>
                                    </div>
                                    <div className="activityTime">
                                        <h5>12:10pm</h5>
                                    </div>
                                </div>
                                <div className="activityContent">
                                    <p>Detailed live analytics are available from Standard Plan onwards. You can still access basic analytics available on Dashboard.</p>
                                </div>
                            </div>
                            <div className="activityItem">
                                <div className="activityTitle">
                                    <div className="activityText">
                                        <h5>Livestream Calender</h5>
                                    </div>
                                    <div className="activityTime">
                                        <h5>12:10pm</h5>
                                    </div>
                                </div>
                                <div className="activityContent">
                                    <p>Detailed live analytics are available from Standard Plan onwards. You can still access basic analytics available on Dashboard.</p>
                                </div>
                            </div>
                            {/* <div className="calenderDiv">
                                <DatePicker onChange={onChange} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard


// <div className="graph-card" style={{display: "none"}}>
// <div className="graph-header">
//     <h6>LiveStream Summary</h6>
// </div>
// <div className="line">

// </div>
// <div className="graph-body">
//     <div className="graphLeft">
//         <div className="graph-socials">
//             {/* <div className="socialsDiv">
//                 Youtubnufvn
//             </div> */}
//         </div>
//         <div className="mainGraph">
//             <LineChart width={730} height={250} data={data}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 {/* <Legend /> */}
//                 <Line type="monotone" dataKey="pv" stroke="#8884d8" />
//                 <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//             </LineChart>
//         </div>
//     </div>
//     <div className="graphRight">
//     </div>
// </div>
// </div>