import React from 'react'
import { useState } from 'react'
import './Signin.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import dashboard from './dashboard.png';
import { Modal } from './Modal';


export const Otp = () => {
    const [otp, setOtp] = useState(new Array(5).fill(""))
    const [appear, setAppear] = useState(false)
    const handlechange = (e, index) => {
        if (isNaN(e.target.value)) return false

        setOtp([
            ...otp.map((data, indx) => (indx === index ? e.target.value : data))
        ])

        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus()
        }
    }

    const navigate = useNavigate()
    const hardpass = ['1', '2', '3', '4', '5']

    const checkOt = () => {
        const inp = JSON.stringify(otp)
        const hard = JSON.stringify(hardpass)

        if(inp == hard) {
            setAppear(true)
        }
    }

    const location = useLocation();
    const mail = location.state?.mail || '';
    return (

        <>
            <div className='container'>
                <div style={{
                    backgroundColor: 'rgba(113, 82, 243, 0.05)',
                    height: '100%',
                    width: '58%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',

                }}>
                    <img src={dashboard} alt="" style={{ height: "80%", width: "80%" }} />
                </div>



                <div className='checkBox' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: '100%',
                    width: '42%',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: 'center',
                        marginBottom: '40px',
                        width: '100%',
                        gap: '10px',
                        cursor: 'pointer'
                    }} onClick={() => { navigate("/forgetPass") }}>
                        <FaArrowLeft />
                        <h1 style={{ fontFamily: 'lexend' }}>Back</h1>
                    </div>

                    <p style={{
                        marginBottom: '8px',
                        fontFamily: 'Lexend',
                        fontSize: '30px',
                        fontWeight: '600',
                        lineHeight: '40px'
                    }}>Enter OTP</p>
                    <p style={{
                        marginBottom: '30px',
                        fontFamily: 'lexend',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: '300px',
                        color: 'rgba(162, 161, 168, 1)',
                        width: '500px'
                    }}>We have share a code of your registered email address {mail}</p>

                    <div className='otp-area' style={{
                        display: 'flex',
                        width: '80%',
                        gap: '22px'
                    }} >
                        {
                            otp.map((data, i) => {
                                return <input type="text"
                                    value={data}
                                    maxLength={1}
                                    onChange={(e) => handlechange(e, i)}

                                    style={{
                                        width: '10%',
                                        textAlign: 'center',
                                        height: '50px',
                                        borderRadius: '10px',
                                        border: data ? 'solid 2px #a084eb' : 'solid 1px rgba(162, 161, 168, 1)'
                                    }}
                                />
                            })
                        }
                    </div>




                    <button style={{
                        width: '500px',
                        padding: '20px',
                        marginTop: '30px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(113, 82, 243, 1)',
                        color: 'white',
                        border: 'none',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: '300px',
                        display: 'flex',
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                        onClick={checkOt}
                    >Verify</button>
                </div>
            </div>

           {appear && <Modal />}
        </>

    )
}
