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
import { photoUpload } from '../../redux/profile-pics/UploadPicsAction';
toast.configure()


const Profile = () => {
    const dispatch = useDispatch();
    const fetchUser = useSelector((state) => state.fetchUser)
    const { loading, error, userDet } = fetchUser;

    const changeUser = useSelector((state) => state.changeUser)
    const { loading_new, error_new, newDetails } = changeUser;

    const passChange = useSelector((state) => state.passChange)
    const { loading_pass, error_pass, changePassword } = passChange;

    const uploadPhoto = useSelector((state) => state.uploadPhoto);
    const { loading_pics, error_pics, newPhoto } = uploadPhoto;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [password, setPassword] = useState('')
    const [new_password, setNewPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [file_buffer, setFileBuffer] = useState(null);
    const [file_base64, setFileBase64] = useState(null);
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch]);

    useEffect(() => {
        <Loader />
        if (!userInfo) {
            window.location.href = "/login"
        } else {
            setName(userDet?.data?.profile?.name)
            setEmail(userDet?.data.profile?.email)
            setPhone(userDet?.data.profile?.phone)
            setCountry(userDet?.data.profile?.country)
            setPhoto(userDet?.data.profile?.photo)
        }
    }, [dispatch, userInfo, userDet]);

    useEffect(() => {
        if (newDetails) {
            toast.success("Profile update was successfull")
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
        else {
            toast.error(error_new)
        }
    }, [newDetails, error_new]);

    useEffect(() => {
        if (changePassword) {
            toast.success("Password update was successfull")
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
        else {
            toast.error(error_pass)
        }
    }, [changePassword, error_pass]);

    useEffect(() => {
        if (newPhoto) {
            toast.success("Profile photo was Updated Successfully")
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
        else {
            toast.error(error_pics)
        }
    }, [newPhoto, error_pics]);

    const editProfile = (e) => {
        e.preventDefault();

        dispatch(editUser(name, email, phone, country))
    }
    const updatePassword = (e) => {
        e.preventDefault();

        dispatch(changePass(password, new_password, confirm_password))
    }
    const handleUpload = (e) => {
        e.preventDefault();
        dispatch(photoUpload(file_base64))
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
                            {/* <div className="profileContentItem">
                                <Link to="/profile/notification">Notifications</Link>
                            </div> */}
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
                                {photo ? (
                                    <div className="profileImage">
                                        <img src={photo} alt="" style={{objectFit:"cover"}} />
                                    </div>
                                ) : (
                                    <div className="profileImage">
                                        <img src="./images/blank-image.svg" alt="" style={{objectFit:"cover"}} />
                                    </div>
                                )}

                                <form onSubmit={handleUpload}>
                                    <div className="profilePicInput" style={{ marginBottom: "1.5rem" }}>
                                        <input type='file' accept=".png, .jpg, .jpeg" onChange={(event) => {
                                            event.preventDefault()
                                            const file = event.target.files[0]
                                            const reader = new window.FileReader()
                                            reader.readAsArrayBuffer(file)

                                            reader.onloadend = () => {
                                                // setFileBuffer(Buffer(reader.result))

                                                //convert to base64
                                                const base64 = btoa(new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                                                setPhoto(`data:image/png;base64,${base64}`)
                                                setFileBase64(base64)
                                            }
                                        }} />
                                    </div>
                                    <button className='formBtn' onSubmit={handleUpload} style={{ width: "100%" }}>Upload Picture</button>
                                </form>
                            </div>
                            {loading_new && <Loader />}
                            {loading_pass && <Loader />}
                            {loading_pics && <Loader />}
                            <div className="profileDetailsDiv">
                                <div className="formHeader">
                                    <h5>My Details</h5>
                                </div>
                                <div className="formBody">
                                    <form className='formElement' onSubmit={editProfile}>
                                        <div className="formGroup">
                                            <label>Full Name</label>
                                            <input type="text" className='formControl' name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="formGroup">
                                            <label>Email</label>
                                            <input type="text" className='formControl' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="formGroup">
                                            <label>Phone number</label>
                                            <input type="tel" className='formControl' name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                        <div className="formGroup">
                                            <label>Country</label>
                                            <input type="text" className='formControl' name="country" value={country} onChange={(e) => setCountry(e.target.value)}  />
                                            {/* <select name="country" className='formControl' id="">
                                                <option value={country} onChange={(e) => setCountry(e.target.value)} className='formControl'>{country}</option>
                                                <option value="nigeria" onChange={(e) => setCountry(e.target.value)} className='formControl'>Nigeria</option>
                                                <option value="ghana" onChange={(e) => setCountry(e.target.value)} className='formControl'>Ghana</option>
                                            </select> */}
                                        </div>
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
                                            <input type="password" className='formControl' name='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="formGroup">
                                            <label>New Password</label>
                                            <input type="password" className='formControl' name='new_password' required value={new_password} onChange={(e) => setNewPassword(e.target.value)} />
                                        </div>
                                        <div className="formGroup">
                                            <label>Confirm Password</label>
                                            <input type="password" className='formControl' name='confirm_password' required value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
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