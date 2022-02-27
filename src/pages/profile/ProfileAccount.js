/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchUserDetails } from '../../redux/fetchUser/fetchUserAction';
import { BACKEND_BASE_URL } from "../../redux/backendUrl";
import Loader from '../../components/Loader'
import axios from 'axios'
import { toast } from 'react-toastify';
toast.configure();

const ProfileAccount = () => {
    const dispatch = useDispatch();

    const [loadingAddAcounts, setLoadingAddAcounts] = React.useState(false);
    const [removeAccountSuccess, setRemoveAccountSuccess] = React.useState(false);

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


    //remove youtube account
    const removeYoutubeAccount = () => {
        setLoadingAddAcounts(true);
        var data = {
            "token" : userInfo.data.token
        }

        let config = {
            headers: {
                'Content-Type': 'application/json',
            },
            // url: `http://localhost:5000/accounts/youtube/disconnect_youtube`,
            url: `${BACKEND_BASE_URL}/accounts/youtube/disconnect_youtube`,
            method: 'POST',
            data: data
        }

        axios(config)
            .then(function (response) {
                setLoadingAddAcounts(false);
                setRemoveAccountSuccess(true);
                toast.success(response.data.message)
            })
            .catch(function (error) {
                setLoadingAddAcounts(false);
            });
    }
    

    //remove facebook account
    const removeFacebookAccount = () => {
        setLoadingAddAcounts(true);
        var data = {
            "token" : userInfo.data.token
        }

        let config = {
            headers: {
                'Content-Type': 'application/json',
            },
            // url: `http://localhost:5000/accounts/facebook/disconnect_facebook`,
            url: `${BACKEND_BASE_URL}/accounts/facebook/disconnect_facebook`,
            method: 'POST',
            data: data
        }

        axios(config)
            .then(function (response) {
                setLoadingAddAcounts(false);
                setRemoveAccountSuccess(true);
                toast.success(response.data.message)
            })
            .catch(function (error) {
                setLoadingAddAcounts(false);
                console.log(error);
            });
    }


    if(loadingAddAcounts ){
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
                    <div className="profileContent">
                        <div className="profileContentHeader">
                            <div className="profileContentItem">
                                <Link to="/profile">Profile</Link>
                            </div>
                            <div className="profileContentItem">
                                <Link to="/profile/account">Account</Link>
                            </div>
                            {/* <div className="profileContentItem">
                                <Link to="/profile/notification">Notifications</Link>
                            </div> */}
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
                        {userDet?.data?.profile?.is_connected_facebook === true ? (
                                      <div className="acctItemLeft">
                                      <div className="socialAccount">
                                          <div className="socialAcctIcon" style={{ background: "#395185", width: "30px", textAlign: "center" }}>
                                              <img src={userDet?.data?.profile?.facebook_profile_picture} alt="" />
                                          </div>
                                          <div className="socialAcctText"
                                          style={{
                                            cursor:"pointer",
                                             fontSize:"1.2rem",
                                             fontWeight:"500",
                                          }}
                                          >Facebook</div>
                                      </div>
                                      <div className="socialName" style={{marginLeft:"-1.5rem"}}>
                                          <span
                                          style={{
                                            cursor:"pointer",
                                             fontSize:"1.2rem",
                                             fontWeight:"600",
                                          }}
                                          >{userDet?.data?.profile?.facebook_profile_name} </span>
                                      </div>
                                      <div className="removeText">
                                          <a onClick={() => removeFacebookAccount()} 
                                           style={{
                                                 cursor:"pointer",
                                                  color:"red",
                                                  fontSize:"1.2rem",
                                                  fontWeight:"600",
                                               }}>
                                          Remove</a>
                                      </div>
                                  </div>
                                ) : 
                                ("")}


                                {userDet?.data?.profile?.is_connected_google === true ? (
                                      <div className="acctItemLeft">
                                      <div className="socialAccount">
                                          <div className="socialAcctIcon" style={{ background: "#395185", width: "30px", textAlign: "center" }}>
                                          <img src={userDet?.data?.profile?.google_profile_picture} alt="" />
                                          </div>
                                          <div className="socialAcctText"
                                          style={{
                                            cursor:"pointer",
                                             fontSize:"1.2rem",
                                             fontWeight:"500",
                                          }}
                                          >Youtube</div>
                                      </div>
                                      <div className="socialName" style={{marginLeft:"-1.5rem"}}>
                                      <span
                                      style={{
                                        cursor:"pointer",
                                         fontSize:"1.2rem",
                                         fontWeight:"600",
                                      }}
                                      >{userDet?.data?.profile?.google_profile_name} </span>
                                      </div>
                                      <div className="removeText">
                                          <a onClick={() => removeYoutubeAccount()} 
                                           style={{
                                                 cursor:"pointer",
                                                  color:"red",
                                                  fontSize:"1.2rem",
                                                  fontWeight:"600",
                                               }}>
                                          Remove</a>
                                      </div>
                                  </div>
                                ) : 
                                ("")}
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
                                        <input type="email" style={{ width: "100%" }} placeholder={userDet?.data?.profile?.email} className='formControl' name="" id=""
                                
                                        />
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
