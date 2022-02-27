import React from 'react';
import './Modals.css'


const ShowSuccessModal = ({ show, close }) => {
    return <div>
        {
            show ?

                <div className="mainDiv">
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
                </div>
            : null
        },

    </div>;
};

export default ShowSuccessModal;
