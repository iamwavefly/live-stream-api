/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import './Modals.css'
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { videoUpload } from "../../redux/video/VideoActions";
import { useSelector } from "react-redux";
import Loader2 from "../Loader2.js";
import Loader from '../../components/Loader'
toast.configure();


const StreamingModals = ({ show, close }) => {
    const dispatch = useDispatch();

    const uploadVideo = useSelector((state) => state.uploadVideo)
    const { loading_video, error_video, newVideo } = uploadVideo;

    const [file_base64, setFileBase64] = useState(null);
    const [video, setVideo] = useState('');

    useEffect(() => {
        if (newVideo) {
            close();
            toast.success("Hurray!!! your video was uploaded Successfully", { autoClose: 1000 })
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
        else {
            toast.error(error_video)
        }
    }, [newVideo, error_video]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(videoUpload(file_base64))
    }

    return (
        <>
            {
                show ?

                    <div className="mainDiv">

                        {/* modal for uploading of files */}
                        {/* {loading && <Loader />} */}
                        <div className="mainModal" id='myModal'>
                            <div className="modalHeader" style={{ textAlign: "center" }}>
                                <h4>Upload Videos</h4>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="uploadingBox">
                                    <div className="uploadContents">
                                        <div className="uploadImage">
                                            <img src="/images/uploadPic.svg" alt="" />
                                        </div>
                                        <div className="uploadTextArea">
                                            {loading_video ? (<Loader />) : (
                                                <div style={{ paddingLeft: "5.0rem" }}>
                                                    <input type='file' accept=".mp4, .mkv, .avi, .webm" onChange={(event) => {
                                                        event.preventDefault()
                                                        const file = event.target.files[0]
                                                        const reader = new window.FileReader()
                                                        reader.readAsArrayBuffer(file)

                                                        reader.onloadend = () => {
                                                            // setFileBuffer(Buffer(reader.result))

                                                            //convert to base64
                                                            const base64 = btoa(new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                                                            console.log(base64)
                                                            setVideo(`data:image/png;base64,${base64}`)
                                                            setFileBase64(base64)
                                                        }
                                                    }} />
                                                </div>)}
                                            <span>Upload Max of 5GB directly</span>

                                        </div>
                                    </div>
                                </div>
                                <div className="uploadFooter">
                                    <div className="button-group">
                                        {loading_video ? ("") : (<div>
                                            <button className='cancelButton' onClick={() => close()}>Close</button>
                                            <button className='acceptButton' type="submit" onSubmit={handleSubmit}>Upload Video</button>
                                        </div>)}

                                    </div>
                                </div>
                            </form>
                        </div>


                    </div>
                    : null
            },

        </>
    )
}

export default StreamingModals
