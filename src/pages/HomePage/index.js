import React from 'react'
import "./index.css"
import Navbars from '../../components/navbars/index'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
        <div className="home_wrapper">

            <div className="header_section">
                <Navbars />

                <div className="header_content">
                    <div className="header_content_text">
                        <h1>Livestream and host pre-recorded videos on any social networks.</h1>
                        <p>Go live simultaneously across more than 20 social media platforms whether your pre-recorded or you are going live.</p>
                       <div className='header_content_text_btn'>
                            <Link to="/sign-up" className="btn_prim">Get Started</Link>
                            {/* <Link to="/" className="btn_sec">Learn More</Link> */}
                       </div>
                    </div>
                    <div className="header_content_image">
                        <img src="/images/dash2.svg" alt=""/>
                    </div>
                </div>
            </div>

            <div className="why_section">
                <div className="why_section_content">
                    <div className="why_section_content_text">
                        <h4>WHY LIVESNAP?</h4>
                        <p>Specially Designed For Business & Individual</p>
                    </div>

                    <div className="why_cards_wrapper">

                        <div className="why_card">
                            <div className="why_card_image">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.5 15.0001L29.3295 11.5861C29.5581 11.4718 29.8122 11.4179 30.0675 11.4294C30.3228 11.4409 30.571 11.5174 30.7884 11.6518C31.0058 11.7861 31.1853 11.9738 31.3099 12.197C31.4344 12.4202 31.4999 12.6715 31.5 12.9271V23.0731C31.4999 23.3286 31.4344 23.58 31.3099 23.8031C31.1853 24.0263 31.0058 24.214 30.7884 24.3483C30.571 24.4827 30.3228 24.5592 30.0675 24.5707C29.8122 24.5822 29.5581 24.5283 29.3295 24.4141L22.5 21.0001V15.0001Z" stroke="#4E25DD" strokeWidth="2.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19.5 9H7.5C5.84315 9 4.5 10.3431 4.5 12V24C4.5 25.6569 5.84315 27 7.5 27H19.5C21.1569 27 22.5 25.6569 22.5 24V12C22.5 10.3431 21.1569 9 19.5 9Z" stroke="#4E25DD" strokeWidth="2.25" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div className="why_card_text">
                                <h1>Multiple Video Formats</h1>
                                <p>All video formats are accepted as our serves can transcode them to the right standard file types for streaming.</p>
                            </div>
                        </div>

                        <div className="why_card">
                            <div className="why_card_image">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5 7.5H10.5C9.70435 7.5 8.94129 7.81607 8.37868 8.37868C7.81607 8.94129 7.5 9.70435 7.5 10.5V28.5C7.5 29.2956 7.81607 30.0587 8.37868 30.6213C8.94129 31.1839 9.70435 31.5 10.5 31.5H25.5C26.2956 31.5 27.0587 31.1839 27.6213 30.6213C28.1839 30.0587 28.5 29.2956 28.5 28.5V10.5C28.5 9.70435 28.1839 8.94129 27.6213 8.37868C27.0587 7.81607 26.2956 7.5 25.5 7.5H22.5" stroke="#4E25DD" strokeWidth="2.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19.5 4.5H16.5C14.8431 4.5 13.5 5.84315 13.5 7.5C13.5 9.15685 14.8431 10.5 16.5 10.5H19.5C21.1569 10.5 22.5 9.15685 22.5 7.5C22.5 5.84315 21.1569 4.5 19.5 4.5Z" stroke="#4E25DD" strokeWidth="2.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M13.5 25.5V18" stroke="#4E25DD" strokeWidth="2.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18 25.5V24" stroke="#4E25DD" strokeWidth="2.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22.5 25.5V21" stroke="#4E25DD" strokeWidth="2.25" stroke-linecap="round" stroke-linejoin="round"/>
                             </svg>


                            </div>
                            <div className="why_card_text">
                                <h1>Analytics & Insights</h1>
                                <p>
                                Discover how well your videos are faring out there after the streaming sessions are over. See engagement rates, numbers of views and many other statistics.
                                </p>
                            </div>
                        </div>
                        
                        <div className="why_card">
                            <div className="why_card_image">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.5 15.0001L29.3295 11.5861C29.5581 11.4718 29.8122 11.4179 30.0675 11.4294C30.3228 11.4409 30.571 11.5174 30.7884 11.6518C31.0058 11.7861 31.1853 11.9738 31.3099 12.197C31.4344 12.4202 31.4999 12.6715 31.5 12.9271V23.0731C31.4999 23.3286 31.4344 23.58 31.3099 23.8031C31.1853 24.0263 31.0058 24.214 30.7884 24.3483C30.571 24.4827 30.3228 24.5592 30.0675 24.5707C29.8122 24.5822 29.5581 24.5283 29.3295 24.4141L22.5 21.0001V15.0001Z" stroke="#4E25DD" strokeWidth="2.25" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19.5 9H7.5C5.84315 9 4.5 10.3431 4.5 12V24C4.5 25.6569 5.84315 27 7.5 27H19.5C21.1569 27 22.5 25.6569 22.5 24V12C22.5 10.3431 21.1569 9 19.5 9Z" stroke="#4E25DD" strokeWidth="2.25" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>


                            </div>
                            <div className="why_card_text">
                                <h1>
                                    Stream To Multiple Platform
                                </h1>
                                <p>
                                    We can stream your videos to multiple social media platforms.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="start_section_wrapper">
                <div className="start_section">
                    <h3>Start Pre-record videos with one click</h3>
                    <Link to="/sign-up">Get Started</Link>
                </div>
            </div>

            <div className="features_section">
               <div className='features_section_content'>
                    <div className="features_section_text">
                    <p>OUR FEATURES</p>
                    <h2>Livestream and host pre-recorded videos.</h2>
                    <h4>We create experiences that are attractive, simple to use, and drive results for your company. </h4>
                    <div>
                        <svg width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.3189 20.506C17.0063 15.102 23.2859 12.4686 27.6222 15.7658L34.8189 21.2381C39.1552 24.5354 38.296 31.2903 33.2724 33.3971L24.9348 36.8935C19.9112 39.0002 14.4908 34.8786 15.1782 29.4747L16.3189 20.506Z" fill="#4E25DD"/>
                        <path d="M20.05 24.4434L22.8191 30.3405L30.6648 26.4091" stroke="white" strokeWidth="2.35884" stroke-linecap="round"/>
                        </svg>
                        Organize your schedule
                    </div>
                    <div>
                        <svg width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.3189 20.506C17.0063 15.102 23.2859 12.4686 27.6222 15.7658L34.8189 21.2381C39.1552 24.5354 38.296 31.2903 33.2724 33.3971L24.9348 36.8935C19.9112 39.0002 14.4908 34.8786 15.1782 29.4747L16.3189 20.506Z" fill="#4E25DD"/>
                        <path d="M20.05 24.4434L22.8191 30.3405L30.6648 26.4091" stroke="white" strokeWidth="2.35884" stroke-linecap="round"/>
                        </svg>
                        Engage your audience in the comment section with much ease 
                    </div>
                    {/* <div>
                        <svg width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.3189 20.506C17.0063 15.102 23.2859 12.4686 27.6222 15.7658L34.8189 21.2381C39.1552 24.5354 38.296 31.2903 33.2724 33.3971L24.9348 36.8935C19.9112 39.0002 14.4908 34.8786 15.1782 29.4747L16.3189 20.506Z" fill="#4E25DD"/>
                        <path d="M20.05 24.4434L22.8191 30.3405L30.6648 26.4091" stroke="white" strokeWidth="2.35884" stroke-linecap="round"/>
                        </svg>
                        Embed videos, captions, screenshots, blend pre-recorded & live sections
                    </div> */}

                </div>
                
                <div className="features_section_image">
                    <img src="/images/features.svg" alt="" />
                </div>
               </div>
            </div>

            <div className="features_section">
               <div className='features_section_content'>
                    <div className="features_section_image">
                        <img src="/images/sss.svg" alt="" />
                    </div>


                    <div className="features_section_text">
                         <p>OUR FEATURES</p>
                         <h2 style={{width:"521px"}}>Stream Video to different social media platforms</h2>
                         <h4>Stream your videos to Facebook, Youtube, Twitter, Linkedln and other social media networks</h4>
                        <div>
                            <svg width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.3189 20.506C17.0063 15.102 23.2859 12.4686 27.6222 15.7658L34.8189 21.2381C39.1552 24.5354 38.296 31.2903 33.2724 33.3971L24.9348 36.8935C19.9112 39.0002 14.4908 34.8786 15.1782 29.4747L16.3189 20.506Z" fill="#4E25DD"/>
                            <path d="M20.05 24.4434L22.8191 30.3405L30.6648 26.4091" stroke="white" strokeWidth="2.35884" stroke-linecap="round"/>
                            </svg>
                            Customize your livestream
                        </div>
                        {/* <div>
                            <svg width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.3189 20.506C17.0063 15.102 23.2859 12.4686 27.6222 15.7658L34.8189 21.2381C39.1552 24.5354 38.296 31.2903 33.2724 33.3971L24.9348 36.8935C19.9112 39.0002 14.4908 34.8786 15.1782 29.4747L16.3189 20.506Z" fill="#4E25DD"/>
                            <path d="M20.05 24.4434L22.8191 30.3405L30.6648 26.4091" stroke="white" strokeWidth="2.35884" stroke-linecap="round"/>
                            </svg>
                            Add watermark, brand icons to your livestream 
                        </div> */}
                        <div>
                            <svg width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.3189 20.506C17.0063 15.102 23.2859 12.4686 27.6222 15.7658L34.8189 21.2381C39.1552 24.5354 38.296 31.2903 33.2724 33.3971L24.9348 36.8935C19.9112 39.0002 14.4908 34.8786 15.1782 29.4747L16.3189 20.506Z" fill="#4E25DD"/>
                            <path d="M20.05 24.4434L22.8191 30.3405L30.6648 26.4091" stroke="white" strokeWidth="2.35884" stroke-linecap="round"/>
                            </svg>
                            Customize which platform you’re streaming to
                        </div>

                    </div>
               </div>
            </div>

            <div className="get_started_section">
                <div className="get_started_section_content">
                    <h1>Get Started with LiveSnap</h1>
                    <p>We create experiences that are attractive, simple to use, and drive results for your company. </p>
                    <Link to="/sign-up">Get Started</Link>
                </div>
            </div>

            <div className="footer_section">
                <div className="footer_content">
                   <div className="footer_left">
                        <div className="footer_left_content">
                            <div style={{marginBottom:"2rem"}}>
                                <svg width="144" height="32" viewBox="0 0 144 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M37.8188 8.192H41.5264V21.2787H49.5596V24.32H37.8188V8.192Z" fill="#451ECC"/>
                                    <path d="M51.3794 11.9245H54.9498V24.32H51.3794V11.9245ZM53.1646 10.1965C52.5085 10.1965 51.9745 10.0045 51.5625 9.62048C51.1506 9.23648 50.9446 8.76032 50.9446 8.192C50.9446 7.62368 51.1506 7.14752 51.5625 6.76352C51.9745 6.37952 52.5085 6.18752 53.1646 6.18752C53.8207 6.18752 54.3547 6.37184 54.7667 6.74048C55.1786 7.10912 55.3846 7.56992 55.3846 8.12288C55.3846 8.72192 55.1786 9.22112 54.7667 9.62048C54.3547 10.0045 53.8207 10.1965 53.1646 10.1965Z" fill="#451ECC"/>
                                    <path d="M70.4847 11.9245L65.2895 24.32H61.6047L56.4324 11.9245H60.1171L63.5272 20.3571L67.0518 11.9245H70.4847Z" fill="#451ECC"/>
                                    <path d="M83.6676 18.1683C83.6676 18.2144 83.6447 18.537 83.5989 19.136H74.2841C74.4519 19.904 74.8486 20.5107 75.4742 20.9562C76.0998 21.4016 76.8779 21.6243 77.8086 21.6243C78.4494 21.6243 79.014 21.5322 79.5022 21.3478C80.0057 21.1482 80.4711 20.841 80.8983 20.4262L82.7979 22.4998C81.6383 23.8362 79.9447 24.5043 77.7171 24.5043C76.3286 24.5043 75.1004 24.2355 74.0323 23.6979C72.9643 23.145 72.1404 22.3846 71.5606 21.417C70.9808 20.4493 70.6909 19.351 70.6909 18.1222C70.6909 16.9088 70.9732 15.8182 71.5377 14.8506C72.1175 13.8675 72.9033 13.1072 73.895 12.5696C74.902 12.0166 76.0235 11.7402 77.2593 11.7402C78.4647 11.7402 79.5556 12.0013 80.5321 12.5235C81.5086 13.0458 82.2715 13.7984 82.8208 14.7814C83.3853 15.7491 83.6676 16.8781 83.6676 18.1683ZM77.2822 14.4589C76.4736 14.4589 75.7946 14.6893 75.2453 15.1501C74.6961 15.6109 74.3604 16.2406 74.2383 17.0394H80.3033C80.1812 16.256 79.8455 15.6339 79.2962 15.1731C78.747 14.697 78.0756 14.4589 77.2822 14.4589Z" fill="#451ECC"/>
                                    <path d="M91.5602 24.5965C90.2938 24.5965 89.0656 24.4275 87.8755 24.0896C86.7007 23.7363 85.7547 23.2832 85.0376 22.7302L86.2963 19.9194C86.9829 20.4262 87.7992 20.8333 88.7452 21.1405C89.6912 21.4477 90.6371 21.6013 91.5831 21.6013C92.6359 21.6013 93.4141 21.4477 93.9176 21.1405C94.4211 20.8179 94.6728 20.3955 94.6728 19.8733C94.6728 19.4893 94.5202 19.1744 94.2151 18.9286C93.9252 18.6675 93.5437 18.4602 93.0707 18.3066C92.613 18.153 91.9875 17.984 91.1941 17.7997C89.9734 17.5078 88.9741 17.216 88.1959 16.9242C87.4178 16.6323 86.7464 16.1638 86.1819 15.5187C85.6326 14.8736 85.358 14.0134 85.358 12.9382C85.358 12.0013 85.6097 11.1565 86.1132 10.4038C86.6167 9.63584 87.372 9.02912 88.379 8.58368C89.4013 8.13824 90.6448 7.91552 92.1095 7.91552C93.1318 7.91552 94.1312 8.0384 95.1077 8.28416C96.0842 8.52992 96.9386 8.8832 97.671 9.344L96.5266 12.1779C95.0466 11.3331 93.5666 10.9107 92.0866 10.9107C91.0491 10.9107 90.2786 11.0797 89.7751 11.4176C89.2868 11.7555 89.0427 12.201 89.0427 12.7539C89.0427 13.3069 89.325 13.7216 89.8895 13.9981C90.4693 14.2592 91.3466 14.5203 92.5215 14.7814C93.7421 15.0733 94.7415 15.3651 95.5196 15.657C96.2978 15.9488 96.9615 16.4096 97.5107 17.0394C98.0753 17.6691 98.3575 18.5216 98.3575 19.5968C98.3575 20.5184 98.0982 21.3632 97.5794 22.1312C97.0759 22.8838 96.313 23.4829 95.2908 23.9283C94.2685 24.3738 93.025 24.5965 91.5602 24.5965Z" fill="#451ECC"/>
                                    <path d="M108.123 11.7402C109.649 11.7402 110.877 12.201 111.808 13.1226C112.754 14.0442 113.227 15.4112 113.227 17.2237V24.32H109.657V17.7766C109.657 16.7936 109.443 16.064 109.016 15.5878C108.589 15.0963 107.971 14.8506 107.162 14.8506C106.262 14.8506 105.545 15.1347 105.011 15.703C104.477 16.256 104.21 17.0854 104.21 18.1914V24.32H100.639V11.9245H104.049V13.376C104.522 12.8538 105.11 12.4544 105.812 12.1779C106.513 11.8861 107.284 11.7402 108.123 11.7402Z" fill="#451ECC"/>
                                    <path d="M121.43 11.7402C123.337 11.7402 124.801 12.201 125.824 13.1226C126.846 14.0288 127.357 15.4035 127.357 17.2467V24.32H124.016V22.7763C123.344 23.9283 122.093 24.5043 120.262 24.5043C119.316 24.5043 118.492 24.343 117.791 24.0205C117.104 23.6979 116.578 23.2525 116.211 22.6842C115.845 22.1158 115.662 21.4707 115.662 20.7488C115.662 19.5968 116.089 18.6906 116.944 18.0301C117.813 17.3696 119.149 17.0394 120.949 17.0394H123.787C123.787 16.256 123.55 15.657 123.077 15.2422C122.604 14.8122 121.895 14.5971 120.949 14.5971C120.293 14.5971 119.644 14.7046 119.004 14.9197C118.378 15.1194 117.844 15.3958 117.401 15.7491L116.12 13.2378C116.791 12.7616 117.592 12.393 118.523 12.1318C119.469 11.8707 120.438 11.7402 121.43 11.7402ZM121.155 22.0851C121.765 22.0851 122.307 21.9469 122.78 21.6704C123.253 21.3786 123.589 20.9562 123.787 20.4032V19.136H121.338C119.873 19.136 119.141 19.6198 119.141 20.5875C119.141 21.0483 119.316 21.417 119.667 21.6934C120.033 21.9546 120.529 22.0851 121.155 22.0851Z" fill="#451ECC"/>
                                    <path d="M137.866 11.7402C139.011 11.7402 140.048 12.009 140.979 12.5466C141.925 13.0688 142.665 13.8138 143.199 14.7814C143.733 15.7338 144 16.8474 144 18.1222C144 19.3971 143.733 20.5184 143.199 21.4861C142.665 22.4384 141.925 23.1834 140.979 23.721C140.048 24.2432 139.011 24.5043 137.866 24.5043C136.295 24.5043 135.059 24.0051 134.159 23.0067V28.7898H130.588V11.9245H133.999V13.353C134.884 12.2778 136.173 11.7402 137.866 11.7402ZM137.248 21.5552C138.164 21.5552 138.912 21.248 139.491 20.6336C140.086 20.0038 140.384 19.1667 140.384 18.1222C140.384 17.0778 140.086 16.2483 139.491 15.6339C138.912 15.0042 138.164 14.6893 137.248 14.6893C136.333 14.6893 135.578 15.0042 134.983 15.6339C134.403 16.2483 134.113 17.0778 134.113 18.1222C134.113 19.1667 134.403 20.0038 134.983 20.6336C135.578 21.248 136.333 21.5552 137.248 21.5552Z" fill="#451ECC"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.48131 12.3152L6.30117 13.9946L17.5551 7.47592C17.7785 7.34666 18.0107 7.23451 18.2472 7.14098L23.5448 4.07647C25.6693 2.84752 28.3057 4.41759 28.2903 6.90259L28.1765 25.2638C28.1611 27.7488 25.5055 29.2849 23.3964 28.0289L23.2588 27.9469V24.043L24.8648 24.9994L24.9755 7.12447L22.2792 8.68422C22.3222 9.14069 22.3115 9.70606 22.3041 10.0978C22.3025 10.1802 22.3011 10.2549 22.3004 10.3192L22.089 28.8047C22.0607 31.2743 19.4263 32.7983 17.3237 31.5613L1.58496 22.3024C-0.537199 21.054 -0.526056 17.9352 1.60498 16.7025L1.90049 16.5316L5.13607 18.5355L3.45264 19.5093L18.5575 28.422L18.5972 25.2381L15.8954 23.6122L4.47514 16.811L2.9649 15.927L2.97805 15.9194L1.60029 15.0989C-0.508806 13.8429 -0.489565 10.7366 1.63492 9.50766L17.3324 0.427229C19.4569 -0.801717 22.0932 0.76835 22.0778 3.25335L22.0742 3.84283L18.7492 5.71675L18.7631 3.47523L3.48131 12.3152ZM18.7339 10.735L9.69376 15.9645L18.6457 21.3413L18.6632 19.9328L18.7339 10.735Z" fill="#451ECC"/>
                                </svg>
                            </div>
                            <p>LiveStream & Pre-recorded Video platform</p>
                            <span>©2022 All right reserved. </span>
                        </div>
                   </div>

                   
                   <div className="footer_right">
                     <div className="footer_right_content">
                         <div className='footer_right_item'>
                            <h3>Company</h3>
                            <ul>
                                <li><Link to="/">About Us</Link></li>
                                <li><Link to="/">Contact Us</Link></li>
                            </ul>
                         </div>
                         <div className='footer_right_item'>
                            <h3>Resources</h3>
                            <ul>
                                <li><Link to="/terms-service">Terms of service</Link></li>
                                <li><Link to="/privacy-policy">Privacy policy</Link></li>
                            </ul>
                         </div>
                        
                     </div>

                   </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default HomePage