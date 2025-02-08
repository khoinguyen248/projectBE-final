import React, { useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

import { IoIosAddCircleOutline } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { useContext } from 'react';
import { StoreContext } from '../../store';

import { useState } from 'react';

const Attendance = () => {

  const [check, setCheck] = useState(false)
  const [arr, setArr] = useState([])

  const fetchOne = async () => {
    try {
      setCheck(true)
      const respone = await fetch('https://671c5ff22c842d92c382ba18.mockapi.io/products')
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

  return (
    <div className='cha'>
      <div className='con'>
        <div className='header'>
          <div className='header-1'>
            <p style={{
              fontSize: '20px',
              fontWeight: '600',
              lineHeight: '30px',
              textAlign: 'left'

            }}>Attendance</p>
            <p style={{

              fontSize: '14px',
              fontWeight: '300',
              lineHeight: '22px',
              textAlign: 'left',
              color: 'rgba(162, 161, 168, 1)'

            }}  >All employees Attendance</p>
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




          </div>

          <div className="boxcontent">
            <div className='boxcontent-1 ' style={{

              fontSize: '16px',
              fontWeight: '300',
              lineHeight: '24px',
              color: 'rgba(162, 161, 168, 1)'

            }} >
              <p style={{
                width: '328px',
                textAlign: 'left'
              }}>Employee Name</p>

              <p style={{
                width: '258px',
                textAlign: 'left'
              }}>Designation</p>
              <p style={{
                width: '162px',
                textAlign: 'left'
              }}>Type</p>
              <p style={{
                width: '192px',
                textAlign: 'left'
              }}>
                Check-in time
              </p>
              <p style={{
                width: '110px',
                textAlign: 'left'
              }}>Status</p>

            </div>
            <hr style={{ border: "1px solid rgba(162, 161, 168, 0.1)" }} />

            {check && <p style={{ margin: 'auto', color: 'rgba(162, 161, 168, 1)' }}>please wait</p>}
            {!check && arr.length > 0 && arr?.map(item => {
              return (<> <div key={item.id} style={{ display: "flex" }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  width: '328px',
                  height: '30px'

                }}>

                  <img src={item.img} style={{
                    height: '30px',
                    width: '30px',
                    borderRadius: '50%'
                  }} />

                  <p >{item.Name}</p>

                </div>

                <p style={{
                  width: '258px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center'
                }}>{item.Designation}</p>

                <p style={{
                  width: '162px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center'
                }}> {item.Type}</p>

                <p style={{
                  width: '192px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center'
                }}> {item.CheckTime}</p>
                <p style={{
                  color: item.Status === "On Time" ? 'rgba(63, 194, 138, 1)' : 'rgba(244, 91, 105, 1)',
                  backgroundColor: item.Status === "On Time" ? 'rgba(63, 194, 138, 0.1)' : 'rgba(244, 91, 105, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '3px 8px',
                  fontSize: '12px',
                  borderRadius: '4px'

                }}>
                  {item.Status}
                </p>
              </div>
                <hr style={{ border: "1px solid rgba(162, 161, 168, 0.1)" }} />


              </>)
            })}

            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', height: '50px', alignItems: 'center' }}
            >


              <p style={{ color: 'rgba(162, 161, 168, 1)' }}>Showing 1 to 12 out of 60 records</p>

            </div>
          </div>

        </div>




      </div>
    </div>
  )
}

export default Attendance