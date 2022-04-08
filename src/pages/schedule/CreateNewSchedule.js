/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { newSchedule } from '../../redux/schedule/ScheduleActions';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { fetchUserDetails } from '../../redux/fetchUser/fetchUserAction';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { BACKEND_BASE_URL } from '../../redux/backendUrl';
toast.configure();

const CreateNewSchedule = () => {

    const dispatch = useDispatch();
    

    const fetchUser = useSelector((state) => state.fetchUser)
    const { loading:loadingFectUser, error:errorFectUser, userDet } = fetchUser;
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    const user_token = userInfo.data.token

    const createNewSchedule = useSelector((state) => state.createNewSchedule)
    const { loading, error, createSchedule } = createNewSchedule;

    


    const search = useLocation().search;
    const videoID = new URLSearchParams(search).get('video');

    const [video_id, setVideoId] = useState(videoID)
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [tags, setTags] = useState('')
    const [description, setDescription] = useState('')
    const [facebook, setFacebook] = useState('')
    const [youtube, setYoutube] = useState('')
    const [twitch, setTwitch] = useState('')
    const [token, setToken] = useState(user_token)
    const [loadingAddAcounts, setLoadingAddAcounts] = React.useState(false);
    const [allAccounts, setAllAccounts] = React.useState([]);

    React.useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch]);

    useEffect(() => {
        if (createSchedule) {
            toast.success("Your video was scheduled successfully", { autoClose: 2000 })
            setTimeout(() => {
            window.location.href = "/schedule"
            }, 1000)
        }
        else {
            toast.error(error)
        }
    }, [createSchedule, error]);

    const handleStreamCreate = (e) => {
        e.preventDefault()

        dispatch(newSchedule(token, video_id, title, date, time, tags, description, facebook, youtube, twitch))
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

            React.useEffect(() => {
                if(allAccounts.length < 0){
                    alert("please add at least one account")
                }
            }, []);
    
    return <>
        <div className="mainContent">
            <div className="left">
                <Sidebar />
            </div>
            <div className="right">
                <div className="navBar">
                    <Navbar />
                </div>

                <div className="create_schedule_main">
                    <div className="createStreamHeading">
                        <div className="createScehduleMainHeading">
                            <h4>Add Stream Details</h4>
                        </div>
                        <div className="createScheduleSubHeading">
                            <p>You are responsible for the content you stream.</p>
                        </div>
                    </div>

                    <div className="createStreamFormSection">
                        <div className="createScheduleNormalDetails">
                            {loadingAddAcounts && <Loader />}
                            {loading && <Loader />}
                            <form>
                                <div className="row">
                                    <input type="hidden" name='token' value={token} onChange={(e) => setToken(e.target.value)} />
                                    <input type="hidden" name='video_id' value={videoID} onChange={(e) => setVideoId(e.target.value)} />
                                    <div className="col-lg-4 formGroup">
                                        <label htmlFor="">Title <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" required name='title' 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className='formControl' 
                                        disabled={allAccounts?.length === 0}
                                        />
                                    </div>
                                    <div className="col-lg-4 formGroup">
                                        <label htmlFor="">Date <span style={{ color: "red" }}>*</span></label>
                                        <input type="date" required name='stream_date' 
                                        value={date} 
                                        onChange={(e) => setDate(e.target.value)} 
                                        className='formControl'
                                        disabled={allAccounts?.length === 0}
                                        />
                                    </div>
                                    <div className="col-lg-4 formGroup">
                                        <label htmlFor="">Time <span style={{ color: "red" }}>*</span></label>
                                        <input type="time" required name='stream_time' 
                                        value={time} 
                                        onChange={(e) => setTime(e.target.value)} 
                                        className='formControl'
                                        disabled={allAccounts?.length === 0}
                                        />
                                    </div>
                                    <div className="col-lg-4 formGroup">
                                        <label htmlFor="">Tags <span style={{ fontSize: "10px", fontStyle: "italic" }}>(use comma to seperate tags)</span></label>
                                        <input type="text" name='tags' 
                                        value={tags} 
                                        onChange={(e) => setTags(e.target.value)} 
                                        className='formControl'
                                        disabled={allAccounts?.length === 0}
                                        />
                                    </div>
                                    <div className="col-lg-12 formGroup">
                                        <label htmlFor="">Description <span style={{ color: "red" }}>*</span></label>
                                        <textarea name="description" 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)} 
                                        className='formControl' style={{ height: "100%" }}
                                        disabled={allAccounts?.length === 0}
                                        >
                                        </textarea>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="createScheduleOtherDetails">
                            <div className="createStreamHeading">
                                <div className="createScehduleMainHeading">
                                    <h4>Stream Platforms</h4>
                                </div>
                            </div>
                            <form onSubmit={handleStreamCreate}>


                                    {allAccounts?.length === 0 ?  (
                                       <p>
                                       <span style={{ color: "red" }}>*</span>
                                       <span style={{ fontSize: "20px", fontStyle: "italic" }}>
                                           You are not connected to any social media account click<Link to= '/accounts' style={{
                                               paddingLeft: "10px",
                                               paddingRight: "10px",
                                               fontSize: "20px",
                                           }}>here</Link>to connect account
                                       </span>

                                   </p>
                                    ): (
                                        <>
                                        <div className="row" style={{ marginBottom: "2.5rem" }}>
                                        {allAccounts && allAccounts.map(account => ( 
                                                <>
                                                <div className="checkBoxItem col-lg-3">
                                                     <label>
                                                         <input type="checkbox" name='streamed_platform' 
                                                            value={account.name}
                                                            onChange={(e) => {
                                                                    if(e.target.value === "facebook"){
                                                                        setFacebook("facebook")
                                                                    }if(e.target.value === "youtube"){
                                                                        setYoutube("youtube")
                                                                    }if(e.target.value === "twitch"){
                                                                        setTwitch("twitch")
                                                                    }
                                                                }}
                                                          />
                                                          {account.name}
                                                      </label>
                                                 </div>
                                                 </>
                                              ))}
                                        </div>
                                    
                                   
                                
                                    <div>
                                        <button className="submitBtn" onSubmit={handleStreamCreate}>Submit</button>
                                    </div>
                                    </>
                                    ) }
                                


                               
                                    

                                    


                               

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </>;
};

export default CreateNewSchedule;
