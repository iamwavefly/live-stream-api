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
    const [allAccounts, setAllAccounts] = React.useState([]);

    const fetchUser = useSelector((state) => state.fetchUser)
    const { loading, error, userDet } = fetchUser;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const [email, setEmail] = useState('')

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch]);

    useEffect(() => {
        <Loader />
        if (!userInfo) {
            window.location.href = "/login"
        } else {
            setEmail(userDet?.data?.email)
        }
    }, [dispatch, userInfo, userDet]);



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
        {loadingAddAcounts && <Loader />}
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
