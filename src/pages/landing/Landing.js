import React from 'react'
import './index.css';

const Landing = () => {
    return (
        <>
            <div className="contain">
                <div className="main">
                    <div className="topLeft">
                        <img src="/coming-soon/logo.svg" alt="" />
                    </div>
                    <div className="topRight">
                        <a href="/sign-up">Get Started</a>
                    </div>

                    <div className="rows">

                        <div className="columns">
                            <div className="wrappers">
                                <div className="headers">
                                    <h2>
                                        Go Live or schedule Pre-recorded video on any social networks
                                    </h2>
                                </div>
                                <div className="paras">
                                    <p>
                                        Nervous to host live stream in real time? Schedule any pre-recorded video and publish it as if it’s live.
                                    </p>
                                </div>
                                <div className="inputs">
                                    <div className="inputDiv">
                                        <input type="text" placeholder='Enter your email' />
                                    </div>
                                    <div className="btnDiv">
                                        <button className='btnStyle'>Join the waiting list</button>
                                    </div>
                                </div>
                                <div className="copy">
                                    <h5>
                                        Copyright©LIVESNAP 2022
                                    </h5>
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="wrappers2">
                                <div className="frame">
                                    <img src="/coming-soon/IMAGE.svg" alt="" />
                                </div>
                                <div className="btn-group">
                                    <a href="/facebook">
                                        <img src="/coming-soon/facebook.svg" alt="" />
                                    </a>
                                    <a href="/facebook" style={{ marginLeft: "25px" }}>
                                        <img src="/coming-soon/instagram.svg" alt="" />
                                    </a>
                                    <a href="/facebook" style={{ marginLeft: "25px" }}>
                                        <img src="/coming-soon/twitter.svg" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Landing