import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchUserDetails } from '../../redux/fetchUser/fetchUserAction';

const Navbar = () => {
    const dispatch = useDispatch();
    const fetchUser = useSelector((state) => state.fetchUser)
    const { loading, error, userDet } = fetchUser;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const [name, setName] = useState('')
    const [account_type, setAccountType] = useState('')
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch]);

    useEffect(() => {
        if (!userInfo) {
            //redirect to login
            window.location.href = '/login'
        } else {
            setName(userDet?.data?.profile?.name)
            setAccountType(userDet?.data?.profile?.account_type)
            setPhoto(userDet?.data?.profile?.photo)
        }
    }, [dispatch, userInfo, userDet]);
    return (
        <>
            <div className='mainNav'>
                <div className="contentNav">
                    <div className="streamNav">
                        <Link to="/video"> + New Stream </Link>
                    </div>
                    <div className='subNav'>
                        {/* <div className="notification">
                            <a href="#">
                                <img src="/images/notification.svg" alt="" />
                            </a>
                        </div> */}
                        <Link to="/profile" style={{ textDecoration: "none" }}>
                            <div className="profile">
                                <div className="profileImages">
                                    <img src={photo} alt="" />
                                </div>
                                <div className="profileText">
                                    <div className='profileName' style={{textTransform:"capitalize"}}>{name}</div>
                                    <div className='accountStatus' style={{textTransform:"capitalize"}}>{account_type}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
