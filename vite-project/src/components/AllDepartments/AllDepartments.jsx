import { CiSearch } from "react-icons/ci";
import './AllDepartments.css'
import { useEffect, useState } from "react";
import { CiBellOn } from "react-icons/ci";

const AllDepartments = () => {
    const [dataEmployee, setdataEmployee] = useState([])
    useEffect(() => {
        const handleData = async () => {
            const res = await fetch('https://671c5ff22c842d92c382ba18.mockapi.io/mindxpro')
            const data = await res.json()
            setdataEmployee(data)
        }
        handleData()
    }, [])
    const listDepart = []
    dataEmployee.forEach(item => {
        if (!listDepart.includes(item.department)) {
            listDepart.push(item.department)
        }
    })
    return (
        <>
            <div style={{ width: '1230px' }} className="content">
                <div style={{ marginBottom: '50px', marginTop: '20px', width: '1107px', marginLeft: '65px' }} className='header'>
                    <div className='header-1'>
                        <p style={{
                            fontSize: '20px',
                            fontWeight: '600',
                            lineHeight: '30px',
                            textAlign: 'left'
                        }}>All Departments</p>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '300',
                            lineHeight: '22px',
                            textAlign: 'left',
                            color: 'rgba(162, 161, 168, 1)'
                        }}  >All Departments</p>
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
                <div className="AllDepartments">
                    <div className="boxSearch">
                        <CiSearch />
                        <input className="search" placeholder="Search" type="text" />
                    </div>
                    <div className="listDepartment">
                        {listDepart.map((data) => {

                            const memDepart = []
                            dataEmployee.forEach(item => {
                                if (item.department == data) {
                                    memDepart.push(item)
                                }
                            })
                            return (
                                <>
                                    <div className="content">

                                        <div className="detailDepartment">
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="topDepart">
                                                <h3 style={{ fontSize: '20px' }}>{data}</h3>
                                                <p style={{ fontSize: '14px', color: '#A2A1A8' }}>{memDepart.length} member</p>
                                                <hr style={{ width: '100%' }} />
                                                {memDepart.map((item) => {
                                                    return (
                                                        <div style={{ display: 'flex', gap: '20px' }} className="member">
                                                            <img style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={item.img} />
                                                            <div>
                                                                <p>{item.name}</p>
                                                                <p style={{ fontSize: '12px', color: '#A2A1A8' }}>{item.designation}</p>
                                                            </div>

                                                        </div>
                                                    )
                                                })}

                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div >
                </div>
            </div>
        </>
    )
}
export default AllDepartments