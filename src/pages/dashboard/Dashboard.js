import React, { useState } from 'react';
import { Link } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./Dashboard.css"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Tooltip } from "react-bootstrap";
// import DatePicker from 'sassy-datepicker';


// const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 },];
const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]

const Dashboard = () => {
    // const onChange = (date) => {
    //     console.log(date.toString());
    // };
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
                                        <h4>Welcome back Emilia!</h4>
                                    </div>
                                    <div className="welcome-left-body">
                                        <p>You have 20 pending streams for upload, 16 completed  streams, 4 unread notifications. <a href="">Learn more</a></p>
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
                                            <h1>05</h1>
                                            <p>ONGOING LIVE STREAM</p>
                                        </div>
                                        <div className="cards-right white">
                                            <img src="/images/image2.svg" alt="" />
                                        </div>
                                    </div>
                                    <div className="overview-cards gray">
                                        <div className="cards-left black">
                                            <h1>05</h1>
                                            <p>SCHEDULED STREAM</p>
                                        </div>
                                        <div className="cards-right">
                                            <img src="/images/image2.svg" alt="" />
                                        </div>
                                    </div>
                                    <div className="overview-cards gray">
                                        <div className="cards-left black">
                                            <h1>05</h1>
                                            <p>CONNECTED ACCOUNT</p>
                                        </div>
                                        <div className="cards-right">
                                            <img src="/images/image2.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="graph-card">
                                <div className="graph-header">
                                    <h6>LiveStream Summary</h6>
                                </div>
                                <div className="line">

                                </div>
                                <div className="graph-body">
                                    <div className="graphLeft">
                                        <div className="graph-socials">
                                            {/* <div className="socialsDiv">
                                                Youtubnufvn
                                            </div> */}
                                        </div>
                                        <div className="mainGraph">
                                            <LineChart width={730} height={250} data={data}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                {/* <Legend /> */}
                                                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                            </LineChart>
                                        </div>
                                    </div>
                                    <div className="graphRight">
                                    </div>
                                </div>
                            </div>
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
