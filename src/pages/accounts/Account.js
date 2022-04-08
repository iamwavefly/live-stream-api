/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Loader2 from '../../components/Loader2'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import './Account.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchUserDetails } from '../../redux/fetchUser/fetchUserAction';
import { fetchAllSchedules } from '../../redux/schedule/ScheduleActions'
import { BACKEND_BASE_URL } from "../../redux/backendUrl";
import Loader from '../../components/Loader'
import axios from 'axios'
import { toast } from 'react-toastify';
toast.configure();


const Account = () => {
    const dispatch = useDispatch();
    const [loadingAddAcounts, setLoadingAddAcounts] = React.useState(false);
    const [removeAccountSuccess, setRemoveAccountSuccess] = React.useState(false);
    const [allAccounts, setAllAccounts] = React.useState([]);

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const fetchUser = useSelector((state) => state.fetchUser)
    const { loading, error, userDet } = fetchUser;

    const getAllSchedules = useSelector((state) => state.getAllSchedules)
    const { loading:loadingSchedule, error:errorSchedule, allSchedule } = getAllSchedules;


    React.useEffect(() => {
        dispatch(fetchAllSchedules())
    }, []);

    React.useEffect(() => {
        <Loader />
        if (!userInfo) {
            window.location.href = "/login"
        } 
    }, [dispatch, userInfo]);

    React.useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch]);

    //add youtube account
    const addYoutubeAccount = () => {
        setLoadingAddAcounts(true);
        
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.token
            },
            url: `${BACKEND_BASE_URL}/accounts/youtube/auth?token=${userInfo.data.token}`,
            method: 'GET'
        }

        axios(config)
            .then(function (response) {
                window.open(response.data.data, '_blank');
                window.close();
                setLoadingAddAcounts(false);
            })
            .catch(function (error) {
                setLoadingAddAcounts(false);
            });
    }
    
    //add facebook account
    const addFacebookAccount = () => {
        setLoadingAddAcounts(true);

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.token
            },
            url: `${BACKEND_BASE_URL}/accounts/facebook/auth?token=${userInfo.data.token}`,
            method: 'GET'
        }

        axios(config)
            .then(function (response) {
                window.open(response.data.data, '_blank');
                window.close();
                setLoadingAddAcounts(false);
            })
            .catch(function (error) {
                setLoadingAddAcounts(false);
            });
    }

    //add twitch account
    const addTwitchAccount = () => {
        setLoadingAddAcounts(true);
        
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.token
            },

            url: `${BACKEND_BASE_URL}/accounts/twitch/twitch_auth?token=${userInfo.data.token}`,
            method: 'GET'
        }

        axios(config)
            .then(function (response) {
                window.open(response.data.data, '_blank');
                window.close();
                setLoadingAddAcounts(false);
            })
            .catch(function (error) {
                setLoadingAddAcounts(false);
            });
    }

    //get all accounts
    const getAllAccounts = () => {
        setLoadingAddAcounts(true);
        let config = {
            headers: {
                'Content-Type': 'application/json'
            },

            url: `${BACKEND_BASE_URL}/accounts/get_accounts?token=${userInfo.data.token}`,
            method: 'GET'
        }

        axios(config)
            .then(function (response) {
                setLoadingAddAcounts(false);
                setAllAccounts(response.data.data.accounts.accounts);
            })
            .catch(function (error) {
                setLoadingAddAcounts(false);
            });
    }

    React.useEffect(() => {
        getAllAccounts();
    }, []);



    return (
        <>
        {loadingAddAcounts &&  <Loader />}
            <div className="mainContent">
                <div className="left">
                    <Sidebar />
                </div>
                <div className="right">
                    <div className="navBar">
                        <Navbar />
                    </div>
                    <div className="contentDiv">
                        <div className="contentLeft">
                            <div className="addAccountDiv">
                                <div className="addAccount-header">
                                    <h4>Add Accounts</h4>
                                </div>
                                <div className="addAccountBody">
                                    <div className="socialIconsGroup">
                                      
                                        <div className="socialItem1" onClick={() => addYoutubeAccount()}>
                                            <img src="/images/youtube.svg" alt="" />
                                        </div>
                                        <div className="socialItem1" onClick={() => addFacebookAccount()}>
                                            <img src="/images/faceGroup.svg" alt="" />
                                        </div>
                                          <div className="socialItem1" onClick={() => addTwitchAccount()}>
                                            <img src="/images/twitch.svg" alt="" />
                                        </div>
                                        {/* <div className="socialItem1">
                                            <img src="/images/twitter.svg" alt="" />
                                        </div> */}
                                    </div>
                                    {/* <div className="borderRights">
                                        <div className="borderLineRight2">

                                        </div>
                                        <div className="borderLineRight1">

                                        </div>
                                        <div className="borderLineRight2">

                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="scheduledStreamDiv">
                                <div className="scheduledStream-header">
                                    <div className="mainText">
                                        <h4>Scheduled stream</h4>
                                    </div>
                                    {/* <div className="subText">
                                        <h6>Sort by: Facebook</h6>
                                    </div> */}
                                </div>
                                <div className="scheduledStream-body">
                                    <div className="videoTableBody">
                                    {loading ? (<Loader />) : (
                                        <table style={{
                                            width: "550px"
                                        }}>
                                            <thead>
                                                <tr>
                                                    <th>Files</th>
                                                    <th>Size</th>
                                                    {/* <th>Duration</th> */}
                                                    <th>Status</th>
                                                    {/* <th>Actions</th> */}
                                                </tr>
                                            </thead>
                                            <tbody className='tableBorder'>
                                            {allSchedule && allSchedule?.data?.videos.map(video =>
                                                <tr key={video.video_id}>
                                                    <td>{video.name}</td>
                                                    <td>{video.size}Mb</td>
                                                    {/* <td>{video.duration}</td> */}
                                                    <td>{video.status}</td>
                                                </tr>
)}
                                            </tbody>
                                        </table>
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contentRight">
                            <div className="contentRight-header">
                                <h4>Active Accounts</h4>
                            </div>


                            <div className="activeAccountsDiv" >

                                {allAccounts && allAccounts.map(account => ( 
                                      <div className="acctItemLeft" key={account._id}>
                                      <div className="socialAccount">
                                          <div className="socialAcctIcon" style={{ background: "#395185", width: "30px", textAlign: "center" }}>
                                              <img src={account.user_picture} alt="" />
                                          </div>
                                          <div className="socialAcctText"
                                          style={{
                                            cursor:"pointer",
                                             fontSize:"1.2rem",
                                             fontWeight:"500",
                                          }}
                                          >{account.name}</div>
                                      </div>
                                      <div className="socialName">
                                          <span
                                          style={{
                                            cursor:"pointer",
                                             fontSize:"1.2rem",
                                             fontWeight:"600",
                                          }}
                                          >{account.user_name} </span>
                                      </div>
                                      <div className="removeText">
                                          <a onClick={() => {
                                                 setLoadingAddAcounts(true);
                                                 var data = {
                                                     "token" : userInfo.data.token,
                                                     "accounts_name": account.name,
                                                 }
                                         
                                                 let config = {
                                                     headers: {
                                                         'Content-Type': 'application/json',
                                                     },
                                         
                                                     url: `${BACKEND_BASE_URL}/accounts/remove`,
                                                     method: 'POST',
                                                     data: data
                                                 }
                                         
                                                 axios(config)
                                                     .then(function (response) {
                                                         setLoadingAddAcounts(false);
                                                         setRemoveAccountSuccess(true);
                                                         toast.success(response.data.message);
                                                         window.location.reload();
                                                     })
                                                     .catch(function (error) {
                                                         setLoadingAddAcounts(false);
                                                     });
                                          }} 
                                           style={{
                                                 cursor:"pointer",
                                                  color:"red",
                                                  fontSize:"1.2rem",
                                                  fontWeight:"600",
                                               }}>
                                          Remove</a>
                                      </div>
                                  </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Account
