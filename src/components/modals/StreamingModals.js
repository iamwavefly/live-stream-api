import React, { useState } from "react"
import axios from "axios";
import './Modals.css'
import { toast } from "react-toastify";
import Loader from '../Loader.js'
import { BACKEND_BASE_URL } from "../../redux/backendUrl";
toast.configure();


const StreamingModals = ({ show, close }) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        setLoading(true)
        const user_det = await JSON.parse(localStorage.getItem('userInfo'));

        // alert("Uploading")
        event.preventDefault()
        const formData = new FormData();
        formData.append("stream_video", selectedFile);
        try {
            const response = await axios({
                method: "post",
                // url: "https://live-sumo-api.herokuapp.com/api/stream/upload/video",
                url: `${BACKEND_BASE_URL}/stream/upload/video`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + user_det.token,
                },
            })
            setLoading(false)

            if (response.data.status === "success") {
                toast.success("Video Upload was Successfull")
                close()
            }
            console.log(response.data)
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)

            console.log(error)
        }
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return (
        <>
            {
                show ?

                    <div className="mainDiv">

                        {/* modal for uploading of files */}
                        {loading && <Loader />}
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
                                            <input type="file" onChange={handleFileSelect} style={{ textAlign: "center", marginLeft: "16rem" }} />
                                            <span>Upload Max of 5GB directly</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="uploadFooter">
                                    <div className="button-group">
                                        <button className='cancelButton' onClick={() => close()}>Close</button>
                                        <button className='acceptButton' type="submit" onSubmit={handleSubmit}>Upload File</button>
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
