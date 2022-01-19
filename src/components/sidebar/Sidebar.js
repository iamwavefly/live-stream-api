import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/login/LoginAction';
import "./Sidebar.css"

const Sidebar = () => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
    };
    return (
        <>
            <div className='mainBar'>
                <div className="logoBar">
                    <img src="/images/main-logo.svg" alt="" />
                </div>
                <Link to="/dashboard" style={{ color: "#455A64", textDecoration: "none" }}>
                    <div className="itemBar">
                        <div className="iconBar">
                            <img src="/images/dash-icon.svg" alt="" />
                        </div>
                        <div className="textBar">Dashboard</div>
                    </div>
                </Link>
                <Link to="/video" style={{ color: "#455A64", textDecoration: "none" }}>
                    <div className="itemBar">
                        <div className="iconBar">
                            <img src="/images/video-icon.svg" alt="" />
                        </div>
                        <div className="textBar">Videos</div>
                    </div>
                </Link>
                <Link to="/accounts" style={{ color: "#455A64", textDecoration: "none" }}>
                    <div className="itemBar">
                        <div className="iconBar">
                            <img src="/images/person-icon.svg" alt="" />
                        </div>
                        <div className="textBar">Accounts</div>
                    </div>
                </Link>
                <Link to="/streaming" style={{ color: "#455A64", textDecoration: "none" }}>
                    <div className="itemBar">
                        <div className="iconBar">
                            <img src="/images/stream-icon.svg" alt="" />
                        </div>
                        <div className="textBar">Streaming</div>
                    </div>
                </Link>
                <a href="" style={{ color: "#455A64", textDecoration: "none" }}>
                    <div className="itemBar">
                        <div className="iconBar">
                            <img src="/images/schedule-icon.svg" alt="" />
                        </div>
                        <div className="textBar">Schedule</div>
                    </div>
                </a>
                <Link to="/teams" style={{ color: "#455A64", textDecoration: "none" }}>
                    <div className="itemBar">
                        <div className="iconBar">
                            <img src="/images/accounts-icon.svg" alt="" />
                        </div>
                        <div className="textBar">Teams</div>
                    </div>
                </Link>
                <a href="#" onClick={logoutHandler} style={{ color: "#455A64", textDecoration: "none" }}>
                    <div className="itemBar">
                        <div className="iconBar">
                            <img src="/images/accounts-icon.svg" alt="" />
                        </div>
                        <div className="textBar">Logout</div>
                    </div>
                </a>
                <div className="reverseIcon">
                    <a href="">
                        <img src="/images/reverse-icon.svg" alt="" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default Sidebar
