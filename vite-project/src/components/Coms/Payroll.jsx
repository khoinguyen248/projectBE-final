import React, { useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiExport } from "react-icons/ci";

import "./Payroll.css"
const Payroll = () => {

    
    const [check, setCheck] = useState(false)
    const [arr, setArr]  = useState([])

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
      },[])
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

          }}>Payroll</p>
          <p style={{

            fontSize: '14px',
            fontWeight: '300',
            lineHeight: '22px',
            textAlign: 'left',
            color: 'rgba(162, 161, 168, 1)'

          }}  >All employees Payroll</p>
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

          
          <button
                
                style={{

                  width: '120px',
                  height: '50px',
                  paddingLeft: '20px',
                  borderRadius: '10px',

                  fontSize: '16px',
                  fontWeight: '300',
                  lineHeight: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(113, 82, 243, 1)',
                  color: 'white'


                }}
              ><CiExport /> <span>Export</span></button>

        </div>

        <div className="boxcontent">
          <div className='boxcontent-1 ' style={{

            fontSize: '16px',
            fontWeight: '300',
            lineHeight: '24px',
            color: 'rgba(162, 161, 168, 1)'

          }} >
            <p style={{
              width: '308px',
              textAlign: 'left'
            }}>Employee Name</p>
           
            <p style={{
              width: '258px',
              textAlign: 'left'
            }}>CTC</p>
           
            <p style={{
                width:'182px',
                textAlign: 'left'
            }}>
                Salary per Month
            </p>
            <p style={{
              width: '192px',
              textAlign: 'left'
            }}>Deduction</p>

            <p style={{
              width: '100px',
              textAlign: 'left'
            }}>Status</p>
            
          </div>
          <hr style={{ border: "1px solid rgba(162, 161, 168, 0.1)" }} />

          {check && <p style={{margin:'auto', color:'rgba(162, 161, 168, 1)'}}>please wait</p>}
          {!check && arr.length >0 && arr?.map(item => {
            return ( <> <div key={item.id} style={{display:"flex", 
                width: "100%"}}>
              <div style={{
                display: 'flex',
                width: '308px',
                alignItems:'center',
                gap:'3px'

              }}>

                <img src={item.img} style={{height: '30px',
                    width: '30px',
                    borderRadius: '50%'}} />
              
                <p >{item.Name}</p>

              </div> 
              
              <p style={{
              width: '258px',
              textAlign: 'left',
              alignItems:'center',display:'flex',
                
            }}>{item.CTC}</p>
            <p style={{
                width:'182px',
                textAlign: 'left',
                display:'flex',
                alignItems:'center'
            }}>{item.SPM}</p>

            <p style={{
                width:'192px',
                textAlign: 'left',
                display:'flex',
                alignItems:'center'
            }}>{item.Deduct}</p>

<p style={{ color: item.PSt === "Completed" ? 'rgba(63, 194, 138, 1)' : 'rgba(239, 190, 18, 1)',
                        backgroundColor: item.PSt === "Completed" ? 'rgba(63, 194, 138, 0.1)' : 'rgba(239, 190, 18, 0.1)',
                        display:'flex',
                        alignItems:'center',
                        padding: '3px 8px',
                        fontSize:'12px',
                        borderRadius:'4px'

              }}>
            {item.PSt}
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

export default Payroll