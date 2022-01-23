import React from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import './Broadcast.css'

const Broadcast = () => {
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

                    <div className="mainBroadcast">
                        <div className="broadHeader">
                            <div className="mainBroadHeader">
                                <h4>Broadcast</h4>
                            </div>
                            <div className="subBroadHeader">
                                <p>Choose where you want your broadcast to go</p>
                            </div>
                        </div>

                        <div className="broadcastCardSection">
                            <div className="broadcastCardItems">
                                <div className="cardItemIcon">
                                    <img src="/images/broademail.svg" alt="" />
                                </div>
                                <div className="cardItemText">
                                    <h5>Email</h5>
                                </div>
                            </div>
                            <div className="broadcastCardItems" style={{ background: "#ECE8FA" }}>
                                <div className="cardItemIcon">
                                    <img src="/images/broadsms.svg" alt="" />
                                </div>
                                <div className="cardItemText">
                                    <h5 style={{ color: "#3A3B3F" }}>SMS</h5>
                                </div>
                            </div>
                        </div>

                        <form action="" className='formDiv'>
                            <div className="brodcastFormSection">
                                <div className="broadcastFormElement">
                                    <input type="text" className='broadcastInputElement' placeholder='Reciepient(s):' />
                                </div>
                                <div className="broadcastFormElement">
                                    <input type="text" className='broadcastInputElement' placeholder='Subject:' />
                                </div>
                                <div className="broadcastFormElement">
                                    <textarea name="" className='broadcastInputElement' style={{ height: "250px" }}></textarea>
                                </div>
                            </div>

                            <div className="broadcastSubmitSection">
                                <div className="formActionButtons">
                                    <button className='cancelBroad'>Cancel</button>
                                </div>
                                <div className="formActionButtons">
                                    <button className='continueStyle'>Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Broadcast