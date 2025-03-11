
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
import { addEmployee } from '../../../api.js';


const AddEmployee = () => {
    const nav = useNavigate()
    const [check, setCheck] = useState(false)
    const [arr, setArr] = useState([])
    const [toogle, setToogle] = useState(false)

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [department, setDepartment] = useState('');
    const [emnums, setEmnums] = useState('');
    const [designation, setDesignation] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [mobilenumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [marriedstatus, setMarriedStatus] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [DOB, setDOB] = useState('');
    const [attendance, setAttendance] = useState([]);
    const [projects, setProjects] = useState([]);

   const test = async  (e)  => {
    e.preventDefault()

    const empl = {
        firstname: firstname,
        lastname: lastname,
        name: name,
        img: img,
        department: department,
        emnums: emnums,
        designation: designation,
        type: type,
        status: status,
        email: email,
        mobilenumber: mobilenumber,
        address: address,
        marriedstatus: marriedstatus,
        gender: gender,
        city: city,
        state: state,
        zipcode: zipcode,
        DOB: DOB,
        attendance: attendance,
        projects: projects
        
    };

    try {
        const respone = await addEmployee(empl)
        console.log(respone.data)
        alert('employee added !')
        console.log(empl)
    } catch (error) {
        console.error("add failed", error.response?.data || error.message);
    }

    
   }

    useEffect(() => {
       
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
                        {nowList == 1 ? < div onClick={() => { setnowList(1) }} className="topDetailOn" style={{ cursor: 'pointer' }}>
                            <FaUser />
                            <p>Personal Information</p>
                        </div>
                            :
                            <div onClick={() => { setnowList(1) }} className="topDetailOff" style={{ cursor: 'pointer' }}>
                                <FaUser />
                                <p>Personal Information</p>
                            </div>
                        }
                        {nowList == 2 ? < div onClick={() => { setnowList(2) }} className="topDetailOn" style={{ cursor: 'pointer' }}>
                            <SlBriefcase />
                            <p>Professional Information</p>
                        </div>
                            :
                            <div onClick={() => { setnowList(2) }} className="topDetailOff" style={{ cursor: 'pointer' }}>
                                <SlBriefcase />
                                <p>Professional Information</p>
                            </div>
                        }
                        {nowList == 3 ? < div onClick={() => { setnowList(3) }} className="topDetailOn" style={{ cursor: 'pointer' }}>
                            <IoDocumentTextOutline />

                            <p>Documents</p>
                        </div>
                            :
                            <div onClick={() => { setnowList(3) }} className="topDetailOff" style={{ cursor: 'pointer' }}>
                                <IoDocumentTextOutline />

                                <p>Documents</p>
                            </div>
                        }
                        {nowList == 4 ? < div onClick={() => { setnowList(4) }} className="topDetailOn" style={{ cursor: 'pointer' }}>
                            <IoAccessibilityOutline />

                            <p>Account Access</p>
                        </div>
                            :
                            <div onClick={() => { setnowList(4) }} className="topDetailOff" style={{ cursor: 'pointer' }}>
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
                                <input
                                    placeholder='First Name'
                                    className="firstName"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />

                                <input
                                    placeholder='Last Name'
                                    className="lastName"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />

                                <input
                                    placeholder='Mobile Number'
                                    className="mobileNumber"
                                    value={mobilenumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />

                                <input
                                    placeholder='Email Address'
                                    className="emailAddress"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <input
                                    placeholder='Date of Birth'
                                    className="dateOfBirth"
                                    value={DOB}
                                    onChange={(e) => setDOB(e.target.value)}
                                />

                                <input
                                    placeholder='Marital Status'
                                    className="maritalStatus"
                                    value={marriedstatus}
                                    onChange={(e) => setMarriedStatus(e.target.value)}
                                />

                                <input
                                    placeholder='Gender'
                                    className="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                 <input
                                    placeholder='Full Name'
                                    className="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                               

                            </form>
                            <form className="input1">
                                <input
                                    placeholder='Address'
                                    className="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                               
                            </form>
                            <form className="input3">
                                <input placeholder='City' className='city' value={city} onChange={(e)=> setCity(e.target.value)}></input>
                                <input placeholder='State' className="state" value={state} onChange={(e)=> setState(e.target.value)}></input>
                                <input placeholder='Zip Code' className='zipCode' value={zipcode} onChange={(e)=> setZipcode(e.target.value)}></input>
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
                                <input placeholder='Employee ID' className="employeeID" value={emnums} onChange={(e) => {setEmnums(e.target.value)}}></input>
                                <input placeholder='Employee Type' className="employeeType" value={type} onChange={(e) => setType(e.target.value)}></input>
                                <input placeholder='Department' className="dapartment" value={department} onChange={(e) => setDepartment(e.target.value)}></input>
                                <input placeholder='Status' className='status' value={status} onChange={(e)=> {setStatus(e.target.value)}}/>
                                <input placeholder='Enter Designation' className="enterDesighnation" value={designation} onChange={(e)=> setDesignation(e.target.value)}></input>
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
                            <button className="add" onClick={test}>Add</button>
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
