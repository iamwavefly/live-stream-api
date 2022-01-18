import { Link } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./Dashboard.css"

const Dashboard = () => {
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
                                    <div className="graph-socials">
                                        <div className="socialsDiv">
                                            <div className="socialBtn"></div>
                                            <div className="socialText">Youtube</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rightContent"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
