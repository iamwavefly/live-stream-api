import React from 'react'
import { Spinner } from 'react-bootstrap'


const Loader2 = () => {
    return (
        <>
            <div>
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
            </div>
        </>
    )
}

export default Loader2
