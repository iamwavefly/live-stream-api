import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { toast } from 'react-toastify';
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from '../../redux/fetchUser/fetchUserAction'
import Loader from '../../components/Loader';
import { editUser } from '../../redux/profile-update/UpdateProfileAction';
import { changePass } from '../../redux/password-update/UpdatePasswordAction';
toast.configure()


const Profile = () => {
    const dispatch = useDispatch();
    const fetchUser = useSelector((state) => state.fetchUser)
    const { loading, error, userDet } = fetchUser;

    const changeUser = useSelector((state) => state.changeUser)
    const { loading_new, error_new, newDetails } = changeUser;

    const passChange = useSelector((state) => state.passChange)
    const { loading_pass, error_pass, changePassword } = passChange;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword2, setNewPassword2] = useState('')

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch]);

    useEffect(() => {
        if (!userInfo) {
            document.location.href("/login")
        } else {
            setFullname(userDet?.data?.fullname)
            setEmail(userDet?.data.email)
        }
    }, [dispatch, userInfo, userDet]);

    useEffect(() =>{
        if(newDetails){
            toast.success("Profile update was successfull")
        }
        else{
            toast.error(error_new)
        }
    }, [newDetails, error_new]);

    useEffect(() =>{
        if(changePassword){
            toast.success("Password update was successfull")
        }
        else{
            toast.error(error_pass)
        }
    }, [changePassword, error_pass]);

    const editProfile = (e) =>{
        e.preventDefault();

        dispatch(editUser(fullname, email))
    }
    const updatePassword = (e) =>{
        e.preventDefault();

        // console.log( oldPassword, newPassword, newPassword2 )
        dispatch(changePass(oldPassword, newPassword, newPassword2))
    }


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
                    <div className="profileContent">
                        <div className="profileContentHeader">
                            <div className="profileContentItem">
                                <Link to="/profile">Profile</Link>
                            </div>
                            <div className="profileContentItem">
                                <Link to="/profile/account">Account</Link>
                            </div>
                            <div className="profileContentItem">
                                <Link to="/profile/notification">Notifications</Link>
                            </div>
                        </div>
                        <div className="headerSectionDiv">
                            <div className="profileDivider">

                            </div>
                            <div className="profileContentTitle">
                                <h3>My Profile</h3>
                            </div>
                            <div className="profileDivider">

                            </div>
                        </div>
                        <div className="profileContentBody">
                            <div className="profilePicDiv">
                                <div className="profileImage">
                                    <img src="/images/profile-image2.svg" alt="" />
                                </div>
                                <div className="profilePicInput">
                                    <input type="file" />
                                </div>
                            </div>
                            {loading_new && <Loader />}
                            {loading_pass && <Loader />}
                            <div className="profileDetailsDiv">
                                <div className="formHeader">
                                    <h5>My Details</h5>
                                </div>
                                <div className="formBody">
                                    <form className='formElement' onSubmit={editProfile}>
                                        <div className="formGroup">
                                            <label>Full Name</label>
                                            <input type="text" className='formControl' name="fullname" value={fullname}  onChange={(e) => setFullname(e.target.value)} />
                                        </div>
                                        <div className="formGroup">
                                            <label>Email</label>
                                            <input type="text" className='formControl' name="email" value={email}  onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        {/* <div className="formGroup">
                                            <label>Phone number</label>
                                            <input type="text" className='formControl' name="password" value="09-09000300" />
                                        </div>
                                        <div className="formGroup">
                                            <label>Country</label>
                                            <input type="text" className='formControl' name="password" value="09-09000300" />
                                        </div> */}
                                        <div className="formGroup">
                                            <button className="formBtn" onSubmit={editProfile}>Update Profile</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="profilePasswordDiv">
                                <div className="formHeader">
                                    <h5>Change Password</h5>
                                </div>
                                <div className="formBody">
                                    <form className='formElement' onSubmit={updatePassword}>
                                        <div className="formGroup">
                                            <label>Old Password</label>
                                            <input type="password" className='formControl' name='oldPassword' required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                        </div>
                                        <div className="formGroup">
                                            <label>New Password</label>
                                            <input type="password" className='formControl' name='newPassword' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                        </div>
                                        <div className="formGroup">
                                            <label>Confirm Password</label>
                                            <input type="password" className='formControl' name='newPassword2' required value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
                                        </div>
                                        <div className="formGroup">
                                            <button className="formBtn" onSubmit={updatePassword}>Change Password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile