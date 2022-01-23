import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchUserDetails } from '../../redux/fetchUser/fetchUserAction';

const ProfileAccount = () => {
    const dispatch = useDispatch();
    const fetchUser = useSelector((state) => state.fetchUser)
    const { loading, error, userDet } = fetchUser;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const [email, setEmail] = useState('')

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch]);

    useEffect(() => {
        if (!userInfo) {
            document.location.href("/login")
        } else {
            setEmail(userDet?.data?.email)
        }
    }, [dispatch, userInfo, userDet]);
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
                    <div className="profileContent">
                        <div className="profileContentHeader">
                            <div className="profileContentItem">
                                <Link to="/profile">Profile</Link>
                            </div>
                            <div className="profileContentItem">
                                <Link to="/profile/account">Account</Link>
                            </div>
                            <div className="profileContentItem">
                                <Link to="/profile/notification">Notifications</Link>
                            </div>
                        </div>
                        <div className="headerSectionDiv">
                            <div className="profileDivider">

                            </div>
                            <div className="profileContentTitle">
                                <h3>My Account</h3>
                            </div>
                            <div className="profileDivider">

                            </div>
                        </div>
                    </div>

                    <div className="accountBody">
                        <div className="accountLeft">
                            <div className="acctItemLeft">
                                <div className="socialAccount">
                                    <div className="socialAcctIcon" style={{ background: "#395185", width: "30px", textAlign: "center" }}>
                                        <img src="/images/facebookAcct.svg" alt="" />
                                    </div>
                                    <div className="socialAcctText"><a href="">Facebook</a></div>
                                </div>
                                <div className="socialName" style={{marginLeft:"-1.5rem"}}>
                                    <span>Bualdfam Trunix </span>
                                </div>
                                <div className="removeText">
                                    <a href="">Remove</a>
                                </div>
                            </div>
                            <div className="acctItemLeft">
                                <div className="socialAccount">
                                    <div className="socialAcctIcon">
                                        <img src="/images/youtubeAcct.svg" alt="" />
                                    </div>
                                    <div className="socialAcctText"><a href="">Youtube</a></div>
                                </div>
                                <div className="socialName">
                                    <span>Erik Lamx dert </span>
                                </div>
                                <div className="removeText">
                                    <a href="">Remove</a>
                                </div>
                            </div>
                        </div>
                        <div className="accountRight">
                            <div className="messageRight">
                                <p>
                                    {email} is your current email address registered with LiveSnap. All reminders & notifications will be sent to this email address.
                                </p>
                            </div>
                            <div className="changeEmail">
                                <div className="changeEmailTitle">
                                    <h3>
                                        Alternative email address
                                    </h3>
                                </div>
                                <div className="changeEmailBody">
                                    <form>
                                        <input type="email" style={{ width: "100%" }} placeholder='tanya.hill@example.com' className='formControl' name="" id="" />
                                    </form>
                                </div>
                                <div className="changeEmailFooter">
                                    <button className="saveBtn">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileAccount
