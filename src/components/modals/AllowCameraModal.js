import React from 'react';
import './Modals.css'

const AllowCameraModal = () => {
    return <div>
        <div className="mainDiv">
            <div className="mainModal" id='myModal'>
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
                                <button className='cancelButton'>Cancel</button>
                                <button className="acceptButton">Accept</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default AllowCameraModal;
