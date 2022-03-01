import React from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { BACKEND_BASE_URL } from "../../redux/backendUrl";
import Loader from '../../components/Loader'
import Loader2 from '../../components/Loader2'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import './Teams.css'
import { toast } from 'react-toastify';
toast.configure();


const Teams = () => {
    const dispatch = useDispatch();
    const [loadingTeam, setLoadingTeam] = React.useState(false);
    const [teamSuccess, setTeamSuccess] = React.useState(false);
    const [teamError, setTeamError] = React.useState(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [team, setTeam] = React.useState([]);
    const [selectedTeam, setSelectedTeam] = React.useState(null);


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    React.useEffect(() => {
        <Loader />
        if (!userInfo) {
            window.location.href = "/login"
        } 
    }, [dispatch, userInfo]);


    const selectTeam = (team) => {
        setSelectedTeam(team);
    }
       //create team
       const createTeam = () => {
        setLoadingTeam(true);
        var data = {
            "token" : userInfo.data.token,
            "name" : name,
            "email" : email,
            "password" : password

        }

        let config = {
            headers: {
                'Content-Type': 'application/json',
            },

            url: `${BACKEND_BASE_URL}/team/create_team`,
            method: 'POST',
            data: data
        }

        axios(config)
            .then(function (response) {
                setLoadingTeam(false);
                setTeamSuccess(true);
                toast.success(response.data.message)
                window.location.reload();
            })
            .catch(function (error) {
                setLoadingTeam(false);
                setTeamError(true);
                toast.error(error.response.data.message);
            });
    }

    //get all teams
    const getTeams = () => {
        setLoadingTeam(true);

        let config = {
            headers: {
                'Content-Type': 'application/json',
            },
            url: `${BACKEND_BASE_URL}/team/get_teams?token=${userInfo.data.token}`,
            method: 'GET',
        }

        axios(config)
            .then(function (response) {
                setLoadingTeam(false);
                setTeam(response?.data?.data?.teams);
            })
            .catch(function (error) {
                setLoadingTeam(false);
                toast.error(error.response.data.message);
            });
    }

    //delete team
    const deleteTeam = () => {
        setLoadingTeam(true);

        var data = {
            "token" : userInfo.data.token,
            "team_id" : selectedTeam.team_id
        }

        let config = {
            headers: {
                'Content-Type': 'application/json',
            },
            url: `${BACKEND_BASE_URL}/team/delete_team`,
            method: 'DELETE',
            data: data
        }

        axios(config)
            .then(function (response) {
                setLoadingTeam(false);
                setTeamSuccess(true);
                console.log(response.data.message);
                toast.success(response.data.message);
                window.location.reload();
            })

            .catch(function (error) {
                setLoadingTeam(false);
                setTeamError(true);
                console.log(error.response.data.message);
                toast.error(error.response.data.message);
            });
    }

    React.useEffect(() => {
        getTeams();
    }, []);

   

    
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

                    <div className="teamScreenDivide">
                        <div className="teamLeft">
                            <div className="teamLeftHead">
                                <div className="teamLeftHeadItem blueColor">
                                    <div className="teamNo">
                                        <h1>12</h1>
                                    </div>
                                    <div className="teamText">
                                        <h6>TEAM MEMBERS</h6>
                                    </div>
                                </div>
                                <div className="teamLeftHeadItem grayColor">
                                    <div className="teamNo">
                                        <h1>120</h1>
                                    </div>
                                    <div className="teamText">
                                        <h6>UPLOADED VIDEOS</h6>
                                    </div>
                                </div>
                                <div className="teamLeftHeadItem grayColor">
                                    <div className="teamNo">
                                        <h1>120 <span style={{ fontSize: "13px" }}>mb</span></h1>
                                    </div>
                                    <div className="teamText">
                                        <h6>VIDEO STORAGE</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="teamLeftBody">
                                <div className="videoTableBody">
                                {loadingTeam ? (<Loader />) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Names</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody className='tableBorder'>

                                        {team?.map(item =>
                                            <tr key={item?.team_id}  onClick={() => selectTeam(item)}>
                                                <td>{item?.name}</td>
                                                <td>{item?.email}</td>
                                            </tr>
                                        )} 

                                        </tbody>
                                    </table>
                                  )}
                                </div>
                            </div>
                        </div>

                        <div className="teamRight">
                            
                        {selectedTeam && 
                            <div className="teamRightTop" 
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                            }}
                            >
                                

                                <div className="teamRightTopRight" >
                                    <div className="teamHeadDetails">
                                        <div className="headName">
                                            <h3 
                                            style={{
                                                fontSize: "20px",
                                            }}
                                            >
                                                {selectedTeam?.name}
                                            </h3>
                                        </div>
                                        <div className="headEmail">
                                            <h5 style={{
                                                fontSize: "20px",
                                            }}>
                                                {selectedTeam?.email}
                                            </h5>
                                        </div>
                                        
                                    </div>
                                    <div className="teamBodyDetails flexed">
                                    <div className="modifyDiv flexed">
                                            <div className="editIcon">
                                            <img src="" alt="" />
                                        </div>

                                        </div>
                                        <div className="deleteDiv flexedDiv">
                                            
                                            <div className="deleteText">
                                                <button className='deleteBtn'
                                                onClick={() => deleteTeam()}
                                                >Delete User</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        }
                            <div className="teamRightBody">
                                <div className="inviteTeamHead">
                                    <h4>Invite Team member</h4>
                                </div>
                                <div className="inviteTeamBody">

                                    
                                    <input type="text" placeholder="Enter Name" className="inviteTeamInput"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    />
                                    <input type="text" placeholder="Enter Email" className="inviteTeamInput"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input type="password" placeholder="Enter Password" className="inviteTeamInput" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />

                                </div>
                                <div className="inviteTeamFooter">
                                    <div className="inviteBtn">
                                        <button className='inviteBtnStyle' onClick={createTeam}>Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Teams