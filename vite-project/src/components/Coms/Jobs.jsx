import React, { useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { IoBriefcase } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

import { IoIosAddCircleOutline } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { useContext } from 'react';
import { StoreContext } from '../../store';

import { useState } from 'react';
import { Modal3 } from '../../Modal3';
import { jobs } from '../../api';

const Jobs = () => {

    const [check, setCheck] = useState(false)
    const [arr, setArr] = useState([])
    const [toogle, setToogle] = useState(false)

    const fetchOne = async () => {
        try {
            setCheck(true)
            const respone = await jobs()

            const data = await respone.data.data
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

    return (
        <>
            <div className='cha'>
                <div className='con'>
                    <div className='header'>
                        <div className='header-1'>
                            <p style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                lineHeight: '30px',
                                textAlign: 'left'

                            }}>Jobs</p>
                            <p style={{

                                fontSize: '14px',
                                fontWeight: '300',
                                lineHeight: '22px',
                                textAlign: 'left',
                                color: 'rgba(162, 161, 168, 1)'

                            }}  >All jobs available</p>
                        </div>

                        <div className='header-2' style={{
                            position: 'relative',
                            height: '50px',

                            display: 'flex',
                            gap: '12px'
                        }}>
                            <input type="text" style={{
                                border: '1px solid rgba(162, 161, 168, 0.1)',
                                paddingLeft: '40px',
                                height: '50px'
                            }} />
                            <label htmlFor="" style={{
                                position: 'absolute',
                                top: '50%',
                                left: '20px',
                                transform: 'translateY(-50%)'
                            }}><CiSearch size={24} />
                            </label>
                            <button style={{
                                borderRadius: '10px',
                                backgroundColor: 'rgba(162, 161, 168, 0.1)'

                            }}><CiBellOn size={24} /></button>
                        </div>
                    </div>

                    <div className='inforbox'>
                        <div className="searchbar" style={{

                            marginTop: '20px'
                        }}>
                            <div className="searchbar1" style={{
                                position: 'relative', height: '50px'
                            }}>
                                <input type="text" style={{
                                    border: '1px solid rgba(162, 161, 168, 0.1)',
                                    paddingLeft: '40px',
                                    height: '50px'
                                }} />
                                <label htmlFor="" style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '20px',
                                    transform: 'translateY(-50%)'
                                }}><CiSearch size={24} /></label>
                            </div>

                            <button style={{

                                width: '140px',
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

                            }}><IoIosAddCircleOutline />Add Job</button>


                        </div>

                        <div style={{
                            width: "97%",
                            display: 'flex',
                            margin: 'auto',
                            justifyContent: 'space-between',

                        }}>

                            {check && <p style={{ margin: 'auto', color: 'rgba(162, 161, 168, 1)', marginBottom: '20px' }}>please wait</p>}
                            {!check && arr?.map(item => {
                                return <>
                                    <>
                                        <div style={{
                                            width: '28.5%',
                                            height: 'fit-content',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '20px',
                                            border: '1px solid rgba(162, 161, 168, 0.2)', marginBottom: '20px', borderRadius: '10px', paddingTop: '20px', paddingBottom: '20px', marginTop: '20px'
                                        }} key={item.id}>
                                            <div style={{ display: 'flex', alignItems: 'center', width: '80%', margin: 'auto', gap: '3px' }}>
                                                <div style={{
                                                    backgroundColor: `${item.type == 'Active Jobs' ? 'yellow' : item.type == 'Finished Jobs' ? 'red' : 'green'}`,
                                                    height: "8px",
                                                    width: "8px",
                                                    borderRadius: '50%'
                                                }}></div>
                                                <p >{item.type}</p>
                                            </div>

                                            {item?.jobs?.map(item1 => {
                                                return <>

                                                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', width: '90%', margin: 'auto', borderRadius: '10px', backgroundColor: 'rgba(162, 161, 168, 0.05)', padding: '10px', alignItems: 'center', gap: '16px' }}>
                                                        <div style={{ display: 'flex', gap: '12px', width: '95%' }}>

                                                            <div style={{ backgroundColor: 'rgba(162, 161, 168, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: "center", height: '45px', width: '45px' }}><IoBriefcase size={20} /></div>


                                                            <div style={{ display: 'flex', flexDirection: 'column', height: '45px', justifyContent: 'space-between' }}> <p style={{ fontSize: '16px', fontWeight: "600" }}>{item1.name}</p>
                                                                <p style={{ fontSize: '14px', fontWeight: "300", color: "rgba(162, 161, 168, 1)" }}>{item1.spec}</p></div>

                                                        </div>



                                                        <div style={{ display: 'flex', width: '95%', gap: '8px' }}>
                                                            <p style={{ fontSize: '12px', padding: '10px', display: 'flex', alignItems: 'center', borderRadius: '5px', backgroundColor: 'rgba(113, 82, 243, 1)', color: 'white', fontWeight: '300' }}>{item1.spec}</p>
                                                            <p style={{ fontSize: '12px', padding: '10px', display: 'flex', alignItems: 'center', borderRadius: '5px', backgroundColor: 'rgba(113, 82, 243, 1)', color: 'white', fontWeight: '300' }}>{item1.time}</p>
                                                            <p style={{ fontSize: '12px', padding: '10px', display: 'flex', alignItems: 'center', borderRadius: '5px', backgroundColor: 'rgba(113, 82, 243, 1)', color: 'white', fontWeight: '300' }}>{item1.place}</p>
                                                        </div>

                                                        <div style={{ display: 'flex', width: '95%', justifyContent: 'space-between', alignItems: 'center' }}>

                                                            <p><FaMapMarkerAlt />{item1.location}</p>

                                                            <p>{item1.pricetag}$/Month</p>
                                                        </div>

                                                    </div>

                                                </>

                                            })}
                                        </div>

                                    </>


                                </>

                            })}
                        </div>

                    </div>




                </div>
            </div>

            {toogle && arr?.length > 0 && <Modal3 toogle={setToogle} setArr={setArr} arr={arr} />}
        </>
    )
}

export default Jobs