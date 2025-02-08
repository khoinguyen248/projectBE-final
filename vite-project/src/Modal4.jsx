import React from 'react'
import { useState } from 'react';
import './Modal4.css'
import { useNavigate } from 'react-router-dom';
export const Modal4 = ({ setArr, toogle, arr }) => {
    const nav = useNavigate()
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [emnums, setEmnums] = useState();
    const [department, setDepartment] = useState('');
    const [designation, setDesignation] = useState('');
    const [type, setType] = useState('');
    const newEm = {
        name,
        img,
        emnums,
        department,
        designation,
        type,
        status: "Permanent",
        id: Date.now().toString() // Tạo ID duy nhất dựa trên thời gian
    };
    const handleAddProduct = () => {
        const updatedEmData = [...arr, newEm]
        setArr(updatedEmData)
        toogle(false);
        alert('Employee data updated successfully!');
        const url = 'https://671c5ff22c842d92c382ba18.mockapi.io/mindxpro';
        updatedEmData.forEach(category => {
            fetch(`${url}/${category.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(category)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Updated successfully:', data);
                })
                .catch(error => {
                    console.error('Error updating:', error);
                });
        });
        nav("/Homepage/Allemployee")
    };
    return (
        <div style={{
            position: 'fixed',
            height: '1110px',
            width: '100%',

            backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(5px)'
        }} >
            <div style={{ width: '436px', height: 'fit-content', backgroundColor: 'white', borderRadius: '10px', margin: 'auto', marginTop: '100px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ width: '80%', margin: 'auto', marginTop: '30px' }}>Add new employee</p>
                <input className='chosin' type="text" style={{ width: '80%', margin: 'auto' }} placeholder='Employee Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input className='chosin' type="text" style={{ width: '80%', margin: 'auto' }} placeholder='Image link' value={img} onChange={(e) => setImg(e.target.value)} />
                <input className='chosin' type="text" style={{ width: '80%', margin: 'auto' }} placeholder='Employee ID' value={emnums} onChange={(e) => setEmnums(e.target.value)} />
                <input className='chosin' type="text" style={{ width: '80%', margin: 'auto' }} placeholder='Department' value={department} onChange={(e) => setDepartment(e.target.value)} />
                <input className='chosin' type="text" style={{ width: '80%', margin: 'auto' }} placeholder='Designation' value={designation} onChange={(e) => setDesignation(e.target.value)} />
                <input className='chosin' type="text" style={{ width: '80%', margin: 'auto' }} placeholder='Type' value={type} onChange={(e) => setType(e.target.value)} />
                <div style={{ width: '80%', margin: 'auto', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <button onClick={handleAddProduct} style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', backgroundColor: 'rgba(113, 82, 243, 1)', color: 'white', }}>Add</button>
                    <button onClick={() => { toogle(false) }} style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: ' white', color: 'rgba(113, 82, 243, 1)', border: '1px solid grey', borderRadius: '10px' }}>Cancle</button>
                </div>
            </div>
        </div>
    )
}