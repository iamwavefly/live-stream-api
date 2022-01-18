import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'


const Navbar = () => {
    return (
        <>
            <div className='mainNav'>
                <div className="contentNav">
                    <div className="streamNav">
                        <a href="#"> + New Stream </a>
                    </div>
                    <div className='subNav'>
                        <div className="notification">
                            <a href="#">
                                <img src="/images/notification.svg" alt="" />
                            </a>
                        </div>
                        <div className="profile">
                            <div className="profileImage">
                                <Link to="/profile">
                                    <img src="/images/profile-image.svg" alt="" />
                                </Link>
                            </div>
                            <div className="profileText">
                                <div className='profileName'>Emilia Dunes</div>
                                <div className='accountStatus'>Free account</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
