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

            <div class="overlay">
                <div class="overlay__inner">
                    <div class="overlay__content"><span class="spinner"></span></div>
                </div>
            </div>

        </>
    )
}

export default Loader
