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
                <div className="itemBar">
                    <div className="iconBar">
                        <img src="/images/dash-icon.svg" alt="" />
                    </div>
                    <div className="textBar"><Link to="/dashboard">Dashboard</Link></div>
                </div>
                <div className="itemBar">
                    <div className="iconBar">
                        <img src="/images/video-icon.svg" alt="" />
                    </div>
                    <div className="textBar"><a href="">Videos</a></div>
                </div>
                <div className="itemBar">
                    <div className="iconBar">
                        <img src="/images/person-icon.svg" alt="" />
                    </div>
                    <div className="textBar"><a href="">Accounts</a></div>
                </div>
                <div className="itemBar">
                    <div className="iconBar">
                        <img src="/images/stream-icon.svg" alt="" />
                    </div>
                    <div className="textBar"><a href="">Streaming</a></div>
                </div>
                <div className="itemBar">
                    <div className="iconBar">
                        <img src="/images/schedule-icon.svg" alt="" />
                    </div>
                    <div className="textBar"><a href="">Schedule</a></div>
                </div>
                <div className="itemBar">
                    <div className="iconBar">
                        <img src="/images/accounts-icon.svg" alt="" />
                    </div>
                    <div className="textBar"><a href="">Teams</a></div>
                </div>
                <div className="itemBar">
                    <div className="iconBar">
                        <img src="/images/accounts-icon.svg" alt="" />
                    </div>
                    <div className="textBar"><a href="#" onClick={logoutHandler}>Logout</a></div>
                </div>
                <div className="reverseIcon">
                    <img src="/images/reverse-icon.svg" alt="" />
                </div>
            </div>
        </>
    )
}

export default Sidebar
