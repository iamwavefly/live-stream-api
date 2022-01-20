import React from 'react'
import './Modals.css'

const StreamingModals = () => {
    return (
        <div>

            <div className="mainDiv">

                {/* modal for uploading of files */}

                {/* <div className="mainModal" id='myModal'>
                    <div className="modalHeader" style={{ textAlign: "center" }}>
                        <h4>Upload Videos</h4>
                    </div>
                    <div className='dividerLine'>

                    </div>
                    <div className="uploadingBox">
                        <div className="uploadContents">
                            <div className="uploadImage">
                                <img src="/images/uploadPic.svg" alt="" />
                            </div>
                            <div className="uploadTextArea">
                                <p>Drag in your files or <a href="" style={{textDecoration:"none"}}>Select a file</a> from your Computer.</p>
                                <span>Upload Max of 5GB directly</span>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* modal to allow the use of camera */}

                {/* <div className="mainModal" id='myModal'>
                    <div className="uploadingBox" style={{ border: "none" }}>
                        <div className="uploadContents">
                            <div className="uploadImage">
                                <img src="/images/cameraAccess.svg" alt="" />
                            </div>
                            <div className="uploadHeaderMessage">
                                <h3>Please allow access to your camera</h3>
                            </div>
                            <div className="uploadTextArea">
                                <p style={{ color: "#000000" }}>
                                    Live sumo will acces your cammera and micro phone to Record using camera feature.
                                    Upload max 5 GB directly from your device or Record using camera feature.
                                </p>
                            </div>
                            <div className="uploadFooter">
                                <div className="button-group">
                                    <button className='cancelCamera'>Cancel</button>
                                    <button className="acceptCamera">Accept</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}


                {/* modal to show success */}

                <div className="mainModal" id='myModal'>
                    <div className="uploadingBox" style={{ border: "none" }}>
                        <div className="uploadContents">
                            <div className="uploadImage">
                                <img src="/images/successfullImage.svg" alt="" />
                            </div>
                            <div className="uploadHeaderMessage">
                                <h3 style={{ color: "#4CAF50", letterSpacing: "10.5px", fontSize: "25px" }}>SUCCESSFULL!</h3>
                            </div>
                            <div className="uploadTextArea">
                                <p style={{ color: "#000000" }}>
                                    Your video has been sucessfuly schedule you can check your schedule  history for more details
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* modal to show failed */}

                {/* <div className="mainModal" id='myModal'>
                    <div className="uploadingBox" style={{ border: "none" }}>
                        <div className="uploadContents">
                            <div className="uploadImage">
                                <img src="/images/failedImage.svg" alt="" />
                            </div>
                            <div className="uploadHeaderMessage">
                                <h3 style={{ color: "#FF3D00", letterSpacing: "10.5px", fontSize: "25px" }}>FAILED!</h3>
                            </div>
                            <div className="uploadTextArea">
                                <p style={{ color: "#000000" }}>
                                    We couldnt upload your video please check  you internect connection and video size.
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>

        </div>
    )
}

export default StreamingModals
