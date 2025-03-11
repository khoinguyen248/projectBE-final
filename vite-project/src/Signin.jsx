import React, { useState, useEffect } from 'react';
import './Signin.css';
import logo from './logo.png';
import dashboard from './dashboard.png';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { signin } from './api';

const Signin = () => {





    


    const [checkPassword, setCheckPassword] = useState(false)
    const [pass, setPass] = useState(true)
    const [report, setReport] = useState(true)
    const navigate = useNavigate()
    const [errstr, setErrstr] = useState('')

    const [email, setMail] = useState("")
    

    const checkPass = () => {
        setPass(!pass)
    }

    const [password, setPassword] = useState("")
    

    


const handleSubmit = async (e) => {
            
            e.preventDefault()

            if(checkPassword){
                try {
                    const account = { email, password };
                    const response = await signin(account);
                   
                    localStorage.setItem("tokenBackend", response.data.token);
                    localStorage.setItem("email", response.data.account.email)

                    navigate("/Homepage")

                    
                } catch (err) {
                    console.error("Signin failed:", err.response?.data || err.message);
                    setReport(false)
                    setErrstr(err.response?.message)
                }
                setCheckPassword(false);
            }
        
            
        };

        const handleCheckPassword = (e) => {
            e.preventDefault(); // Thêm dòng này để event được truyền đúng
            setCheckPassword(true);
            handleSubmit(e);
        };

    


   
    return (
        <>
          <div className="container">

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
                        gap: '10px'
                    }}>
                        <img src={logo} alt="" style={{ width: "50px", height: "50px" }} />
                        <h1 style={{ fontFamily: 'lexend', fontSize:'30px' }}>HRMS</h1>
                    </div>


                    
                    <p style={{
                        marginBottom: '8px',
                        fontFamily: 'Lexend',
                        fontSize: '30px',
                        fontWeight: '600',
                        lineHeight: '40px'
                    }}>Welcome</p>
                    <p style={{
                        marginBottom: '30px',
                        fontFamily: 'lexend',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: '300px',
                        color: 'rgba(162, 161, 168, 1)'
                    }}>Please login here</p>

{report ? <>  
  <div className="input-container" style={{ marginBottom: '20px' }}>

                        <input  id="email" name="email" type='email' placeholder=" " required className='sign' value={email} onChange={(e) => setMail(e.target.value)} />
                        <label htmlFor="email" className='title'>Email Address</label>
                    </div>

                        <div className="input-container" style={{ position: 'relative' }}>
                            <input
                                type={pass ? "password" : "text"}
                                id="password"
                                name="password"
                                placeholder=" "
                                required
                                className='sign'
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password" className='title'>Password</label>
                            {pass ? <FaEye onClick={checkPass} style={{ cursor: 'pointer', position: 'absolute', top: '24px', left: '470px' }} /> : <FaRegEyeSlash onClick={checkPass} style={{ cursor: 'pointer', position: 'absolute', top: '35%', left: '470px' }} />}
                        </div> </> : <>
                        <div className="input-container" style={{ marginBottom: '20px' }}>
                            <input id="email" type='text' name="email"  className='sign2' value={email} onChange={(e) => setMail(e.target.value)} />
                            <label htmlFor="email" className='title2'>Email Address</label>
                            <p style={{
                                fontFamily: 'lexend',
                                fontSize: '16px',
                                lineHeight: '24px',
                                fontWeight: '300px',
                                color: 'red'
                            }}>{errstr}, Please enter your email again</p>
                        </div>


                        <div className="input-container" style={{ position: 'relative' }}>
                            <input
                               type={pass ? "password" : "text"}
                               id="password"
                               name="password"
                               
                               className='sign2'
                               value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password" className='title2' >Password</label>
                            {pass ? <FaEye onClick={checkPass} style={{ cursor: 'pointer', position: 'absolute', top: '24px', left: '470px' }} /> : <FaRegEyeSlash onClick={checkPass} style={{ cursor: 'pointer', position: 'absolute', top: '25%', left: '470px' }} />}
                            <p style={{
                                fontFamily: 'lexend',
                                fontSize: '16px',
                                lineHeight: '24px',
                                fontWeight: '300px',
                                color: 'red'
                            }}>{errstr}, Please re-enter</p>
                        </div> </>}
                        <div style={{
                        display: 'flex',
                        width: '500px',
                        justifyContent: 'space-between',
                        marginTop: '16px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="checkbox" className='box' style={{ margin: '0', height: '20px', width: '20px',cursor:'pointer' }} />
                            <label htmlFor="checkboxLabel" style={{
                                fontFamily: 'lexend',
                                fontSize: '16px',
                                lineHeight: '24px',
                                fontWeight: '300px',
                                cursor:'pointer'
                            }}>Remember me</label>
                        </div>
                        <p style={{
                            fontSize: '16px',
                            lineHeight: '24px',
                            fontWeight: '300px',
                            fontFamily: 'lexend',
                            cursor: 'pointer'
                        }} onClick={() => { navigate("/forgetPass") }}>Forgot password</p>
                    </div>
                    <button style={{
                        width: '500px',
                        padding: '20px',
                        marginTop: '30px',
                        marginBottom:'30px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(113, 82, 243, 1)',
                        color: 'white',
                        border: 'none',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: '300px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }} onClick={handleCheckPassword} >Login</button>

<p style={{
                            fontSize: '16px',
                            lineHeight: '24px',
                            fontWeight: '300px',
                            fontFamily: 'lexend',
                            cursor: 'pointer'
                        }} onClick={() => { navigate("/signup") }}>Don't have an account ?</p>

                </div>
          </div>
        </>
    );
};

export default Signin;
