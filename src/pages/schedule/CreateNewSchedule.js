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
    const video_from = new URLSearchParams(search).get('video');

    const [video_id, setVideoId] = useState(video_from)
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [tags, setTags] = useState('')
    const [description, setDescription] = useState('')
    const [is_instagram, setInstagram] = useState(false)
    const [is_twitter, setTwitter] = useState(false)
    const [is_facebook, setFacebook] = useState(false)
    const [is_youtube, setYoutube] = useState(false)
    const [is_twitch, setTwitch] = useState(false)
    const [token, setToken] = useState(user_token)


    const toggleInstgram = () => {
        setInstagram(!is_instagram)
    }
    const toggleTwitter = () => {
        setTwitter(!is_twitter)
    }
    const toggleFacebook = () => {
        setFacebook(!is_facebook)
    }
    const toggleYoutube = () => {
        setYoutube(!is_youtube)
    }
    const toggleTwitch = () => {
        setTwitch(!is_twitch)
    }

    React.useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch]);

    useEffect(() => {
        if (createSchedule) {
            toast.success("Your video was scheduled successfully", { autoClose: 2000 })
            setTimeout(() => {
            window.location.href = "/schedule"
            }, 2500)
        }
        else {
            toast.error(error)
        }
    }, [createSchedule, error]);

    const handleStreamCreate = (e) => {
        e.preventDefault()

        dispatch(newSchedule(token, video_id, title, date, time, tags, description, is_instagram, is_twitter, is_facebook, is_youtube, is_twitch))
        console.log(token, video_id, title, date, time, tags, description, is_instagram, is_twitter, is_facebook, is_youtube, is_twitch)
    }
    
    
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
                            {loading && <Loader />}
                            <form>
                                <div className="row">
                                    <input type="hidden" name='token' value={token} onChange={(e) => setToken(e.target.value)} />
                                    <input type="hidden" name='video_id' value={video_from} onChange={(e) => setVideoId(e.target.value)} />
                                    <div className="col-lg-4 formGroup">
                                        <label htmlFor="">Title <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" required name='title' value={title} onChange={(e) => setTitle(e.target.value)} className='formControl' />
                                    </div>
                                    <div className="col-lg-4 formGroup">
                                        <label htmlFor="">Date <span style={{ color: "red" }}>*</span></label>
                                        <input type="date" required name='stream_date' value={date} onChange={(e) => setDate(e.target.value)} className='formControl' />
                                    </div>
                                    <div className="col-lg-4 formGroup">
                                        <label htmlFor="">Time <span style={{ color: "red" }}>*</span></label>
                                        <input type="time" required name='stream_time' value={time} onChange={(e) => setTime(e.target.value)} className='formControl' />
                                    </div>
                                    <div className="col-lg-4 formGroup">
                                        <label htmlFor="">Tags <span style={{ fontSize: "10px", fontStyle: "italic" }}>(use comma to seperate tags)</span></label>
                                        <input type="text" name='tags' value={tags} onChange={(e) => setTags(e.target.value)} className='formControl' />
                                    </div>
                                    <div className="col-lg-12 formGroup">
                                        <label htmlFor="">Description <span style={{ color: "red" }}>*</span></label>
                                        <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} className='formControl' style={{ height: "100%" }}></textarea>
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

                                <div className="row" style={{ marginBottom: "1.5rem" }}>

                                    {userDet?.data?.profile?.is_connected_instagram === true ? (

                                    <div className="checkBoxItem col-lg-3">
                                         <label><input type="checkbox" name='streamed_platform' value={is_instagram} onClick={toggleInstgram} onChange={(e) => setInstagram(e.target.checked)} />Instagram</label>
                                     </div>
                                    ): ("")}
                                   

                                    {userDet?.data?.profile?.is_connected_twitter === true ? (
                                         <div className="checkBoxItem col-lg-3">
                                         <label><input type="checkbox" name='streamed_platform' value={is_twitter} onClick={toggleTwitter} onChange={(e) => setTwitter(e.target.checked)} />Twitter</label>
                                     </div>
                                    ) 
                                    : ("")}
                                   

                                    {userDet?.data?.profile?.is_connected_facebook === true ? (
                                    <div className="checkBoxItem col-lg-3">
                                        <label><input type="checkbox" name='streamed_platform' value={is_facebook} onClick={toggleFacebook} onChange={(e) => setFacebook(e.target.checked)} />Facebook</label>
                                    </div>) 
                                    : ("")}
                                    
                                </div>

                                <div className="row" style={{ marginBottom: "2.5rem" }}>

                                    {userDet?.data?.profile?.is_connected_google === true ? ( 
                                    <div className="checkBoxItem col-lg-3">
                                        <label><input type="checkbox" name='streamed_platform' value={is_youtube} onClick={toggleYoutube} onChange={(e) => setYoutube(e.target.checked)} />Youtube</label>
                                    </div>) : ("")}
                                   
                                    {userDet?.data?.profile?.is_connected_twitch === true ? (
                                    <div className="checkBoxItem col-lg-3">
                                        <label><input type="checkbox" name='streamed_platform' value={is_twitch} onClick={toggleTwitch} onChange={(e) => setTwitch(e.target.checked)} />Twitch</label>
                                    </div>): ("")}
                                    
                                </div>


                                   {/* {userDet?.data?.profile?.is_connected_facebook !== true || userDet?.data?.profile?.is_connected_google !== true ? (
                                    
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
                                    ) : (
                                       ""
                                    )} */}

<div>
                                        <button className="submitBtn" onSubmit={handleStreamCreate}>Submit</button>
                                    </div>


                               

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </>;
};

export default CreateNewSchedule;
