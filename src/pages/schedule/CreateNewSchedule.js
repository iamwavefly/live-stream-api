import React from 'react';
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"

const CreateNewSchedule = () => {
    return <div>

        <div className="mainContent">
            <div className="left">
                <Sidebar />
            </div>
            <div className="right">
                <div className="navBar">
                    <Navbar />
                </div>




            </div>
        </div>

    </div>;
};

export default CreateNewSchedule;
