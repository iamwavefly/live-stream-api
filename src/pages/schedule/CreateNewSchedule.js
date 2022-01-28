import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { newSchedule } from '../../redux/schedule/ScheduleActions';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
toast.configure();

const CreateNewSchedule = () => {

    const dispatch = useDispatch();
    const createNewSchedule = useSelector((state) => state.createNewSchedule)
    const { loading, error, createSchedule } = createNewSchedule;

    const search = useLocation().search;
    const video_from = new URLSearchParams(search).get('video');

    const [video_id, setVideoId] = useState(video_from)
    const [title, setTitle] = useState('')
    const [stream_date, setStreamDate] = useState('')
    const [stream_time, setStreamTime] = useState('')
    const [tags, setTags] = useState('')
    const [description, setDescription] = useState('')
    const [is_instagram, setInstagram] = useState(false)
    const [is_twitter, setTwitter] = useState(false)
    const [is_facebook, setFacebook] = useState(false)
    const [is_youtube, setYoutube] = useState(false)
    const [is_twitch, setTwitch] = useState(false)

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
    useEffect(() => {
        if (createSchedule) {
            toast.success("Your video was scheduled successfully", { autoClose: 2000 })
            setTimeout(() => {
                window.location.reload()
            }, 2500)
        }
        else {
            toast.error(error)
        }
    }, [createSchedule, error]);

    const handleStreamCreate = (e) => {
        e.preventDefault()

        dispatch(newSchedule(video_id, title, stream_date, stream_time, tags, description, is_instagram, is_twitter, is_facebook, is_youtube, is_twitch))
    }

    return <div>

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
                                    <input type="hidden" name='video_id' value={video_from} onChange={(e) => setVideoId(e.target.value)} />
                                    <div className="col-lg-4 formGroup">
                                        <label htmlFor="">Title <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" required name='title' value={title} onChange={(e) => setTitle(e.target.value)} className='formControl' />
                                    </div>
                                    <div className="col-lg-4 formGroup">
                                        <label htmlFor="">Date <span style={{ color: "red" }}>*</span></label>
                                        <input type="date" required name='stream_date' value={stream_date} onChange={(e) => setStreamDate(e.target.value)} className='formControl' />
                                    </div>
                                    <div className="col-lg-4 formGroup">
                                        <label htmlFor="">Time <span style={{ color: "red" }}>*</span></label>
                                        <input type="time" required name='stream_time' value={stream_time} onChange={(e) => setStreamTime(e.target.value)} className='formControl' />
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
                                    <div className="checkBoxItem col-lg-3">
                                        <label><input type="checkbox" name='streamed_platform' value={is_instagram} onClick={toggleInstgram} onChange={(e) => setInstagram(e.target.checked)} />Instagram</label>
                                    </div>
                                    <div className="checkBoxItem col-lg-3">
                                        <label><input type="checkbox" name='streamed_platform' value={is_twitter} onClick={toggleTwitter} onChange={(e) => setTwitter(e.target.checked)} />Twitter</label>
                                    </div>
                                    <div className="checkBoxItem col-lg-3">
                                        <label><input type="checkbox" name='streamed_platform' value={is_facebook} onClick={toggleFacebook} onChange={(e) => setFacebook(e.target.checked)} />Facebook</label>
                                    </div>
                                </div>

                                <div className="row" style={{ marginBottom: "2.5rem" }}>
                                    <div className="checkBoxItem col-lg-3">
                                        <label><input type="checkbox" name='streamed_platform' value={is_youtube} onClick={toggleYoutube} onChange={(e) => setYoutube(e.target.checked)} />Youtube</label>
                                    </div>
                                    <div className="checkBoxItem col-lg-3">
                                        <label><input type="checkbox" name='streamed_platform' value={is_twitch} onClick={toggleTwitch} onChange={(e) => setTwitch(e.target.checked)} />Twitch</label>
                                    </div>
                                </div>

                                <div>
                                    <button className="submitBtn" onSubmit={handleStreamCreate}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>;
};

export default CreateNewSchedule;
