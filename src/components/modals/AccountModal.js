import React from 'react'
import './Modals.css'

const AccountModal = () => {
    return (
        <div>
            <div className="mainDiv">
                <div className="mainModal" id='myModal'>
                    <div className="modalHeader">
                        <h4>Continue as Emilia Dunes?</h4>
                    </div>
                    <div className="modalBody">
                        <p>LiveSnap will receive your name and profile picture. This doesn't let LiveSnap post to Facebook without your permission.</p>
                    </div>
                    <div className="modalActions">
                        <div className="theButton">
                            <button className='cancelStyle'>Cancel</button>
                        </div>
                        <div className="theButton">
                            <button className='continueStyle'>Continue as Emilia</button>
                        </div>
                    </div>
                    <div className="modalQuestion">
                        <p>Not Emilia Dunes? <a href="#" style={{ textDecoration: "none" }}>Log into another account.</a></p>
                    </div>
                    <div className="modalFooter">
                        <p>LiveSnap’s <a href="/privacy-policy" style={{ textDecoration: "none" }}>Privacy Policy</a> and <a href="/terms-service" style={{ textDecoration: "none" }}>Terms</a></p>
                    </div>
                </div>
                {/* <div className="mainModal">
                    <div className="modalHeader">
                        <h4 style={{ color: "#FF3366" }}>Error</h4>
                    </div>
                    <div className="modalBody">
                        <p>You have no account associated to this email, Please register  with a known email</p>
                    </div>
                    <div className="modalActions">
                        <div className="theButton">
                            <button className='cancelStyle'>Back</button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}


export default AccountModal
