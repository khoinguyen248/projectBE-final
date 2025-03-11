import React, { useEffect, useState, useContext } from 'react';
import './button.css';
import logo from './logo2.png';
import { RxDashboard } from "react-icons/rx";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { CiDollar } from "react-icons/ci";
import { RxBackpack } from "react-icons/rx";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

import { StoreContext } from '../../store';

import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const Button = () => {




    const navigate = useNavigate()
    const { userId } = useParams()
    const store = useContext(StoreContext)
    const {currentPage ,setCurrentPage} = store
    

    const handleCheckbut = (int) => {

        navigate(`/Homepage/${int}`)


    };

    useEffect(() => {
        setCurrentPage(localStorage.getItem('tokenBackend'))
    }, 
[])



    return (
        <>

        {
            currentPage ?  <div style={{
                width: '1500px',
                display: 'flex',
                justifyContent: 'space-between'

            }}>


                <div className="parent">
                    <div className='menu'>
                        <div onClick={() => navigate(`/Homepage`)} style={{
                            display: "flex",
                            alignItems: 'center',
                            width: '90%',
                            gap: '10px',
                            marginBottom: '30px'
                        }}>
                            <img src={logo} alt="" style={{ width: "40px", height: "40px" }} />
                            <p style={{ fontFamily: 'lexend', fontSize: '24px' }}>HRSM</p>
                        </div>
                        <button className={userId === "Dashboard" ? 'selected' : ''} onClick={() => handleCheckbut("Dashboard")}><RxDashboard />Dashboard</button>
                        <button className={userId === "Allemployee" ? 'selected' : ''} onClick={() => handleCheckbut("Allemployee")}><BsPersonLinesFill />All employees</button>
                        <button className={userId === "AllDepartments" ? 'selected' : ''} onClick={() => handleCheckbut("AllDepartments")}><MdOutlineLocalFireDepartment />All departments</button>
                        <button className={userId === "Attendance" ? 'selected' : ''} onClick={() => handleCheckbut("Attendance")}><GrSchedules />Attendance</button>
                        <button className={userId === "Payroll" ? 'selected' : ''} onClick={() => handleCheckbut("Payroll")}><CiDollar />Payroll</button>
                        <button className={userId === "Jobs" ? 'selected' : ''} onClick={() => handleCheckbut("Jobs")}><RxBackpack />Jobs</button>
                        <button className={userId === "Candidates" ? 'selected' : ''} onClick={() => handleCheckbut("Candidates")}><IoPersonAddOutline />Candidates</button>
                        <button className={userId === "Leave" ? 'selected' : ''} onClick={() => handleCheckbut("Leave")}><MdEventNote />Leaves</button>
                        <button className={userId === "Holiday" ? 'selected' : ''} onClick={() => handleCheckbut("Holiday")}><LuCalendarDays />Holidays</button>
                        <button className={userId === "Setting" ? 'selected' : ''} onClick={() => handleCheckbut("Setting")}><IoSettingsOutline />Setting</button>
                    </div>

                </div>

                {!userId && <div style={{ width: '82%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>

                    <p style={{
                        marginBottom: '8px',
                        fontFamily: 'Lexend',
                        fontSize: '40px',
                        fontWeight: '600',
                        lineHeight: '40px'
                    }}>Welcome</p>
                    <p style={{
                        marginBottom: '30px',
                        fontFamily: 'lexend',
                        fontSize: '26px',
                        lineHeight: '24px',
                        fontWeight: '300px',
                        color: 'rgba(162, 161, 168, 1)'
                    }}>Let's get started</p>

                </div>}

                <Outlet />
            </div> : <>
            <p>HEM VÔ ĐƯỢC NHE</p>
            </>
        }
          












        </>
    );
};
