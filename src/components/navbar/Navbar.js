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
                                    {userDet?.data?.profile?.photo === "" ? (
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="19" stroke="#451ecc" strokeWidth="2"/>
                                    <path d="M20.3202 11C19.4974 11 18.6931 11.244 18.009 11.7011C17.3249 12.1582 16.7917 12.8079 16.4768 13.5681C16.162 14.3282 16.0796 15.1647 16.2401 15.9717C16.4006 16.7786 16.7968 17.5199 17.3786 18.1017C17.9604 18.6835 18.7016 19.0797 19.5086 19.2402C20.3155 19.4007 21.152 19.3183 21.9121 19.0035C22.6723 18.6886 23.322 18.1554 23.7791 17.4713C24.2362 16.7872 24.4802 15.9828 24.4802 15.1601C24.4802 14.0567 24.0419 12.9986 23.2617 12.2185C22.4816 11.4383 21.4235 11 20.3202 11ZM20.3202 18.1315C19.7325 18.1315 19.158 17.9573 18.6693 17.6308C18.1807 17.3042 17.7998 16.8402 17.5749 16.2972C17.35 15.7542 17.2912 15.1568 17.4058 14.5804C17.5205 14.0039 17.8035 13.4745 18.219 13.0589C18.6346 12.6433 19.1641 12.3603 19.7405 12.2457C20.3169 12.131 20.9143 12.1899 21.4573 12.4148C22.0002 12.6397 22.4643 13.0205 22.7908 13.5092C23.1173 13.9979 23.2916 14.5724 23.2916 15.1601C23.2916 15.5503 23.2147 15.9367 23.0654 16.2972C22.9161 16.6577 22.6972 16.9853 22.4213 17.2612C22.1454 17.5371 21.8178 17.756 21.4573 17.9053C21.0968 18.0547 20.7104 18.1315 20.3202 18.1315Z" fill="#451ecc"/>
                                    <path d="M23.3925 20.5085H17.2475C15.8563 20.5101 14.5225 21.0635 13.5387 22.0473C12.5549 23.0311 12.0016 24.3649 12 25.7562C12 26.2558 12.1985 26.735 12.5518 27.0883C12.9051 27.4416 13.3842 27.6401 13.8839 27.6401H26.7561C27.2558 27.6401 27.7349 27.4416 28.0882 27.0883C28.4415 26.735 28.64 26.2558 28.64 25.7562C28.6384 24.3649 28.0851 23.0311 27.1013 22.0473C26.1175 21.0635 24.7837 20.5101 23.3925 20.5085ZM26.7561 26.4515H13.8839C13.6995 26.4515 13.5226 26.3782 13.3922 26.2478C13.2618 26.1174 13.1886 25.9406 13.1886 25.7562C13.1886 24.6796 13.6162 23.6472 14.3774 22.886C15.1386 22.1248 16.171 21.6971 17.2475 21.6971H23.3925C24.469 21.6971 25.5014 22.1248 26.2626 22.886C27.0238 23.6472 27.4514 24.6796 27.4514 25.7562C27.4514 25.9406 27.3782 26.1174 27.2478 26.2478C27.1174 26.3782 26.9405 26.4515 26.7561 26.4515Z" fill="#451ecc"/>
                                    </svg>
                                    ) : (
                                        <img src={photo} alt="" />
                                    ) }
                                   
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
