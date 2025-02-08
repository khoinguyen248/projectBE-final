import React, { useState } from 'react'
import './Signin.css';
import logo from './logo.png';
import dashboard from './dashboard.png';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { Otp } from './Otp';

const Forget = () => {

    const navigate = useNavigate()
    
    const [mail, setMail] = useState("")
    
    const handleCode = () => {
        navigate("/otp", { state: { mail } })
    }

    const handleMail = (e) => {
        setMail(e.target.value)
      
    }
  return (
 <>
   <div className='container'>
    <div style={{
        backgroundColor: 'rgba(113, 82, 243, 0.05)',
        height: '100%',
        width: '58%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
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
        }} onClick={() => { navigate("/") }}>
           <FaArrowLeft />
            <h1 style={{ fontFamily: 'lexend' }}>Back</h1>
        </div>

        <p style={{
            marginBottom: '8px',
            fontFamily: 'Lexend',
            fontSize: '30px',
            fontWeight: '600',
            lineHeight: '40px'
        }}>Forgot Password</p>
        <p style={{
            marginBottom: '30px',
            fontFamily: 'lexend',
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: '300px',
            color: 'rgba(162, 161, 168, 1)',
            width:'500px'
        }}>Enter your registered email address. we’ll send you a code to reset your password.</p>

        <div className="input-container" style={{ marginBottom: '20px' }}>
            <input type="email" id="email" name="email" placeholder=" " value={mail} required className='sign' onChange={handleMail} />
            <label htmlFor="email" className='title'>Email Address</label>
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
            cursor:'pointer',
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
        }}

        onClick={handleCode}
        >Send OTP</button>
    </div>
</div>
          

   
</>
  )
}

export default Forget