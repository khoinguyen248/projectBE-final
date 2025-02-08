import React from 'react'
import { useNavigate } from 'react-router-dom'
import congrats from './congrats.png'
export const Modal = () => {
  const navigate = useNavigate()
  return (
    <div style={{  position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',backdropFilter: 'blur(5px)'}}>

            <div style={{width:'436px', height:'415px', backgroundColor:'white',borderRadius:'10px', margin:'auto', marginTop:'100px', position:'relative', display:'flex', flexDirection:'column',  textAlign:'center'}}>
               <img src={congrats} alt="" style={{position:'absolute', left:'50%',top:'7%', transform: 'translateX(-50%)',}}/>

               <p style={{marginTop:'140px', fontSize:'30px', fontWeight:'600', lineHeight:'40px', fontFamily:'lexend' }}>Password Update 
               Successfully</p>
               <p style={{fontFamily:'lexend', fontSize:'16px', fontWeight:'300', lineHeight:'24px', color:'rgba(162, 161, 168, 1)'}}>Your password has been update successfully</p>
               <button style={{padding:'20px', width:'80%', margin:'auto', border:'none', borderRadius:'10px', backgroundColor:'rgba(113, 82, 243, 1)', fontFamily:'lexend', fontSize:'16px', fontWeight:'300', lineHeight:'24px', color:'white', cursor:'pointer',  display: 'flex',
            justifyContent:'center',
            alignItems:'center',}} onClick={() => {navigate("/signup")}} >Back to login</button>
            </div>
        </div>
  )
}
