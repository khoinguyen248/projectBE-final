
import { useState, useEffect } from 'react';
import './AddEmployee.css'
import { FaUser } from "react-icons/fa6";
import { SlBriefcase } from "react-icons/sl";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoAccessibilityOutline } from "react-icons/io5";
import { IoCameraOutline } from "react-icons/io5";
import React, { useRef } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { Modal4 } from '../../../Modal4';
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {
    const nav = useNavigate()
    const [check, setCheck] = useState(false)
    const [arr, setArr] = useState([])
    const [toogle, setToogle] = useState(false)

    const [name, setName] = useState('')
    const [img, setImg] = useState('')

    const [department, setDepartment] = useState('')
    const [emnums, setEmnums] = useState('')
    const [designation, setDesignation] =useState('')
    const [type, setType] = useState('')

    const fetchOne = async () => {
        try {
            setCheck(true)
            const respone = await fetch('https://671c5ff22c842d92c382ba18.mockapi.io/mindxpro')
            const data = await respone.json()
            setArr(data)
            setCheck(false)
        }
        catch {
            console.log('error')
        }
    }
    useEffect(() => {
        fetchOne()
    }, [])
    const [nowList, setnowList] = useState(1)
    const inputRef = useRef(null);
    const focusInput = () => {
        inputRef.current.click();
    };
    return (
        <>
            <div className='cha'>
                <div className="addEmployee">
                    <div className="topList">
                        {nowList == 1 ? < div onClick={() => { setnowList(1) }} className="topDetailOn" style={{cursor:'pointer'}}>
                            <FaUser />
                            <p>Personal Information</p>
                        </div>
                            :
                            <div onClick={() => { setnowList(1) }} className="topDetailOff" style={{cursor:'pointer'}}>
                                <FaUser />
                                <p>Personal Information</p>
                            </div>
                        }
                        {nowList == 2 ? < div onClick={() => { setnowList(2) }} className="topDetailOn" style={{cursor:'pointer'}}>
                            <SlBriefcase />
                            <p>Professional Information</p>
                        </div>
                            :
                            <div onClick={() => { setnowList(2) }} className="topDetailOff" style={{cursor:'pointer'}}>
                                <SlBriefcase />
                                <p>Professional Information</p>
                            </div>
                        }
                        {nowList == 3 ? < div onClick={() => { setnowList(3) }} className="topDetailOn" style={{cursor:'pointer'}}>
                            <IoDocumentTextOutline />

                            <p>Documents</p>
                        </div>
                            :
                            <div onClick={() => { setnowList(3) }} className="topDetailOff" style={{cursor:'pointer'}}>
                                <IoDocumentTextOutline />

                                <p>Documents</p>
                            </div>
                        }
                        {nowList == 4 ? < div onClick={() => { setnowList(4) }} className="topDetailOn" style={{cursor:'pointer'}}>
                            <IoAccessibilityOutline />

                            <p>Account Access</p>
                        </div>
                            :
                            <div onClick={() => { setnowList(4) }} className="topDetailOff" style={{cursor:'pointer'}}>
                                <IoAccessibilityOutline />
                                <p>Account Access</p>
                            </div>
                        }
                    </div>
                    {nowList == 1 && <>
                        <div className="content">
                            <div style={{ display: 'flex' }}>
                                <div onClick={focusInput} className="addPhoto">
                                    <IoCameraOutline size={25} />
                                </div>
                                <input style={{ display: 'none' }} ref={inputRef} type="file" />
                            </div>
                            <form className="input2">
                                <input placeholder='First Name' className="firstName"></input>
                                <input placeholder='Last Name' className="lastName"></input>
                                <input placeholder='Mobile Number' className="mobileNumber"></input>
                                <input placeholder='Email Address' className="emailAddress"></input>
                                <input placeholder='Date of Birth' className="dateOfBirth"></input>
                                <input placeholder='Marital Status' className="maritalStatus"></input>
                                <input placeholder='Gender' className="gender"></input>
                                <input placeholder='Nationality' className="Nationality"></input>
                            </form>
                            <form className="input1">
                                <input placeholder='Address' className="address" />
                            </form>
                            <form className="input3">
                                <input placeholder='City' className='city'></input>
                                <input placeholder='State' className="state"></input>
                                <input placeholder='Zip Code' className='zipCode'></input>
                            </form>
                        </div>
                        <div className="buttom">
                            <button style={{

                                width: '250px',
                                height: '50px',
                                paddingLeft: '20px',
                                borderRadius: '10px',

                                fontSize: '16px',
                                fontWeight: '300',
                                lineHeight: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: ' rgba(113, 82, 243, 1)',
                                color: 'White',
                                border: 'none',


                            }} onClick={() => {
                                setToogle(true)

                            }}><IoIosAddCircleOutline />Add Employee Test </button>
                            <button onClick={() => { nav("/Homepage/Allemployee") }} className="cancel">Cancel</button>
                            <button onClick={() => { setnowList(nowList + 1) }} className="next">Next</button>
                        </div>
                    </>
                    }
                    {nowList == 2 && <>
                        <div className="content">
                            <form className="input2">
                                <input placeholder='Employee ID' className="employeeID"></input>
                                <input placeholder='User Name' className="userName"></input>
                                <input placeholder='Employee Type' className="employeeType"></input>
                                <input placeholder='Email Address' className="emailAddressCompany"></input>
                                <input placeholder='Department' className="dapartment"></input>
                                <input placeholder='Enter Designation' className="enterDesighnation"></input>
                                <input placeholder='Working Days' className="workingDays"></input>
                                <input placeholder='Joining Date' className="joiningDate"></input>
                            </form>
                            <form className="input1">
                                <input placeholder='Office Location' className="officeLocation" />
                            </form>
                        </div>
                        <div className="buttom">
                            <button style={{

                                width: '250px',
                                height: '50px',
                                paddingLeft: '20px',
                                borderRadius: '10px',

                                fontSize: '16px',
                                fontWeight: '300',
                                lineHeight: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: ' rgba(113, 82, 243, 1)',
                                color: 'White',
                                border: 'none',


                            }} onClick={() => {
                                setToogle(true)

                            }}><IoIosAddCircleOutline />Add Employee Test </button>
                            <button onClick={() => { nav("/Homepage/Allemployee") }} className="cancel">Cancel</button>
                            <button onClick={() => { setnowList(nowList + 1) }} className="next">Next</button>
                        </div>
                    </>
                    }
                    {nowList == 3 && <>
                        <div className="buttom">
                            <button style={{

                                width: '250px',
                                height: '50px',
                                paddingLeft: '20px',
                                borderRadius: '10px',

                                fontSize: '16px',
                                fontWeight: '300',
                                lineHeight: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: ' rgba(113, 82, 243, 1)',
                                color: 'White',
                                border: 'none',


                            }} onClick={() => {
                                setToogle(true)

                            }}><IoIosAddCircleOutline />Add Employee Test </button>
                            <button onClick={() => { nav("/Homepage/Allemployee") }} className="cancel">Cancel</button>
                            <button onClick={() => { setnowList(nowList + 1) }} className="next">Next</button>
                        </div>
                    </>
                    }
                    {nowList == 4 && <>
                        <div className="content">
                            <form className="input2">
                                <input placeholder='Enter Email Address' className="firstName"></input>
                                <input placeholder='Enter Stack ID' className="lastName"></input>
                                <input placeholder='Enter Skype ID' className="mobileNumber"></input>
                                <input placeholder='Enter Github ID' className="emailAddress"></input>
                            </form>

                        </div>
                        <div className="buttom">
                            <button style={{

                                width: '250px',
                                height: '50px',
                                paddingLeft: '20px',
                                borderRadius: '10px',

                                fontSize: '16px',
                                fontWeight: '300',
                                lineHeight: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: ' rgba(113, 82, 243, 1)',
                                color: 'White',
                                border: 'none',


                            }} onClick={() => {
                                setToogle(true)

                            }}><IoIosAddCircleOutline />Add Employee Test </button>
                            <button onClick={() => { nav("/Homepage/Allemployee") }} className="cancel">Cancel</button>
                            <button className="add">Add</button>
                        </div>
                    </>
                    }

                </div >
            </div>
            {toogle && arr?.length > 0 && <Modal4 toogle={setToogle} setArr={setArr} arr={arr} />}
        </>
    )
}
export default AddEmployee
