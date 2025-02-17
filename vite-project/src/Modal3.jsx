import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useState } from 'react';
import './Modal3.css'
import { updateJobs } from './api';


export const Modal3 = ({ setArr, toogle, arr }) => {



  const [jobType, setJobType] = useState('0');
  const [department, setDepartment] = useState('0');
  const [time, setTime] = useState('0');
  const [salary, setSalary] = useState('');
  const [place, setPlace] = useState('');
  const [jobName, setJobName] = useState('');
  const [location, setLocation] = useState('');

  const newJob = {
    name: jobName,
    spec: department,
    time: time === '1' ? 'Part time' : 'Full time',
    place,
    location,
    pricetag: salary,
    id: Date.now().toString() // Tạo ID duy nhất dựa trên thời gian
  };

  const handleAddProduct = async () => {
    const updatedJobsData = arr?.map(category => {
      if (
        (jobType === '1' && category.type === 'Active Jobs') ||
        (jobType === '2' && category.type === 'Finished Jobs') ||
        (jobType === '3' && category.type === 'Pending Jobs')
      ) {
        return {
          ...category,
          jobs: [...category.jobs, newJob] // Thêm job mới vào danh sách jobs
        };
      }
      return category
  

      
    });

    console.log(updatedJobsData)
    setArr(updatedJobsData)

    toogle(false);
    alert('Job data updated successfully!');

    await updateJobs(updatedJobsData)


    
  };







  return (
    <div style={{
      position: 'fixed',
      height: '1110px',
      width: '100%',

      backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(5px)'
    }} >

      <div style={{ width: '436px', height: 'fit-content', backgroundColor: 'white', borderRadius: '10px', margin: 'auto', marginTop: '100px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p style={{ width: '80%', margin: 'auto' }}>Add new jobs</p>

        <select value={jobType} style={{ width: '80%', margin: 'auto' }} onChange={(e) => setJobType(e.target.value)}>
          <option value='0'>Select State</option>
          <option value='1'>Active Jobs</option>
          <option value='2'>Finished Jobs</option>
          <option value='3'>Pending Jobs</option>
        </select>

        <select value={department} style={{ width: '80%', margin: 'auto' }} onChange={(e) => setDepartment(e.target.value)}>
          <option value='0'>Select Department</option>
          <option value='Design'>Design</option>
          <option value='Development'>Development</option>
          <option value='Management'>Management</option>
          <option value='Analysis'>Analysis</option>
          <option value='Marketing'>Marketing</option>
        </select>

        <select value={time} style={{ width: '80%', margin: 'auto' }} onChange={(e) => setTime(e.target.value)}>
          <option value='0'>Select Time</option>
          <option value='1'>Part time</option>
          <option value='2'>Full time</option>
        </select>

        <input className='chosin' type="text" style={{ width: '80%', margin: 'auto' }} placeholder='Salary' value={salary} onChange={(e) => setSalary(e.target.value)} />

        <input className='chosin' type="text" style={{ width: '80%', margin: 'auto' }} placeholder='Place' value={place} onChange={(e) => setPlace(e.target.value)} />

        <input className='chosin' type="text" style={{ width: '80%', margin: 'auto' }} placeholder='Job name' value={jobName} onChange={(e) => setJobName(e.target.value)} />

        <input className='chosin' type="text" style={{ width: '80%', margin: 'auto' }} placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />



        <div style={{ width: '80%', margin: 'auto', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>

          <button onClick={handleAddProduct} style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', backgroundColor: 'rgba(113, 82, 243, 1)', color: 'white', }}>Add</button>
          <button onClick={() => { toogle(false) }} style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: ' white', color: 'rgba(113, 82, 243, 1)', border: '1px solid grey', borderRadius: '10px' }}>Cancle</button>
        </div>

      </div>
    </div>
  )
}