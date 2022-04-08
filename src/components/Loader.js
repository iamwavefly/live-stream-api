import React from 'react'
import './Loader.css'
// import { Spinner } from 'react-bootstrap'


const Loader = () => {
    return (
        <>
            {/* <div>
                <Spinner
                    animation='border'
                    role='status'
                    style={{
                        width: '100px',
                        height: '100px',
                        margin: 'auto',
                        display: 'block',
                        color: '#451ECC',
                    }}
                >
                </Spinner>
            </div> */}

            <div className="overlay">
                <div className="overlay__inner">
                    <div className="overlay__content"><span className="spinner"></span></div>
                </div>
            </div>

        </>
    )
}

export default Loader
