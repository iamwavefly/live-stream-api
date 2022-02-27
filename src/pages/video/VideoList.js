/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllVideos } from '../../redux/getVideos/GetVideoAction'
import "./Video.css"
import Loader2 from '../../components/Loader2'
import { formatDate, formatTime } from '../../functions'
import { BACKEND_BASE_URL } from '../../redux/backendUrl'
import { toast } from 'react-toastify'
toast.configure()


const VideoList = () => {
    const dispatch = useDispatch();
    const getallVideos = useSelector((state) => state.getallVideos)
    const { loading, error, allVideos } = getallVideos;

    const [loading_delete, setLoading] = useState(false);


    useEffect(() => {
        dispatch(fetchAllVideos())
    }, [dispatch]);

    useEffect(() => {

        // console.log(allVideos)

    }, [dispatch, allVideos]);

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

                    <div className="divContent">
                        <div className='historyList'>
                            <h5>History</h5>
                        </div>
                        <div className="bottomContent">
                            <div className="videoTableHead">
                                <div className="uploadDiv">
                                    <h6>Upload History</h6>
                                </div>
                                {/* <div className="sortDiv">
                                    <h6>Sort by: Size </h6>
                                </div> */}
                            </div>
                            <div className="videoTableBody">
                                {loading || loading_delete ? (<Loader2 />) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Files</th>
                                                <th>Size</th>
                                                {/* <th>Duration</th> */}
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Status</th>
                                                <th>Schedule</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody className='tableBorder'>
                                            {allVideos && allVideos?.data?.videos.map(video =>
                                                <tr key={video.video_id}>
                                                    <td>{video.name}</td>
                                                    <td>{video.size} Mb</td>
                                                    {/* <td>{(video.duration / 60).toFixed(2)} mins</td> */}
                                                    <td>{formatDate(video.createdAt)}</td>
                                                    <td>{formatTime(video.createdAt)}</td>
                                                    <td style={{ textTransform: "capitalize" }}>{video.status}</td>
                                                    <td>
                                                        <Link to={{
                                                            pathname: "/schedule/create-schedule",
                                                            search: "?video=" + video.video_id
                                                        }}>
                                                            <img src="/images/stream-icon2.svg" alt="" />
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <div
                                                            onClick={async (e) => {
                                                                if (window.confirm('Are you sure you want to delete this video?')) {

                                                                    const user_det = await JSON.parse(localStorage.getItem('userInfo'));

                                                                    var axios = require('axios');
                                                                    var data = JSON.stringify({
                                                                        "token": user_det.data.token,
                                                                        "video_id": video.video_id
                                                                    });

                                                                    var config = {
                                                                        method: 'delete',
                                                                        url: `${BACKEND_BASE_URL}/video/delete_video`,
                                                                        headers: {
                                                                            'Content-Type': 'application/json'
                                                                        },
                                                                        data: data
                                                                    };
                                                                    setLoading(true)

                                                                    axios(config)
                                                                        .then(function (response) {
                                                                            setLoading(false)
                                                                            // console.log(JSON.stringify(response.data));
                                                                            toast.success("Video was deleted Successfully", { autoClose: 1000 })
                                                                            setTimeout(() => {
                                                                                window.location.reload();
                                                                            }, 1500);
                                                                        })
                                                                        .catch(function (error) {
                                                                            setLoading(false)
                                                                            console.log(error);
                                                                            toast.error(error)
                                                                        });

                                                                }
                                                            }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ef2f2f" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <line x1="4" y1="7" x2="20" y2="7" />
                                                                <line x1="10" y1="11" x2="10" y2="17" />
                                                                <line x1="14" y1="11" x2="14" y2="17" />
                                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                                            </svg>
                                                        </div>
                                                    </td>

                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                )}

                            </div>
                            <Link to="/video" className='clickBtn' style={{ color: "#FFFFFF" }}>
                                <div className="viewAll">
                                    <div className="viewAllBtn">
                                        Upload new
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoList