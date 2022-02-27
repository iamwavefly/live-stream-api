import React from 'react';
import './Modals.css'

const SHowFailedModal = () => {
    return <div>
        <div className="mainDiv">
            <div className="mainModal" id='myModal'>
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
            </div>
        </div>
    </div>
};

export default SHowFailedModal;
