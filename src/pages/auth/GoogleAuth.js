import React from 'react'

const GoogleAuth = () => {
    return (
        <>
            <div className="socials">
                <button className='btn' >
                    <img src="/images/facebook.svg" className='icons' alt="" />
                </button>
                <button className='btn' style={{ marginLeft: "20px" }}>
                    <img src="/images/google.svg" className='icons' alt="" />
                </button>
                <button className='btn' style={{ marginLeft: "20px" }}>
                    <img src="/images/linkedin.svg" className='icons' alt="" />
                </button>
            </div>
        </>
    )
}

export default GoogleAuth
