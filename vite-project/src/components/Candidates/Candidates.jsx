import { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { CiBellOn } from "react-icons/ci";
import './Candidates.css'
const Candidates = () => {

    const [dataCandidates, setdataCandidates] = useState([])
    useEffect(() => {
        const handleData = async () => {
            const res = await fetch('https://671bac7c2c842d92c380df8e.mockapi.io/product')
            const data = await res.json()
            setdataCandidates(data)
        }
        handleData()
    }, [])

    return (
        <>
            <div style={{ marginRight: '70px' }} className="content">
                <div style={{ marginBottom: '50px', marginTop: '20px' }} className='header'>
                    <div className='header-1'>
                        <p style={{
                            fontSize: '20px',
                            fontWeight: '600',
                            lineHeight: '30px',
                            textAlign: 'left'
                        }}>Candidates</p>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '300',
                            lineHeight: '22px',
                            textAlign: 'left',
                            color: 'rgba(162, 161, 168, 1)'
                        }}  >All employees Candidates</p>
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
                <div className="main">
                    <div className="boxSearch">
                        <CiSearch />
                        <input className="search" placeholder="Search" type="text" />
                    </div>
                    <div className="Candidates">
                        <div style={{ color: '#A2A1A8' }} className="content">
                            <div className="checkbox">
                                <input type="checkbox" />
                            </div>
                            <div className="candi">Candidates</div>
                            <div className="appFor">Applied For</div>
                            <div className="appDate">Applied Date</div>
                            <div className="email">Email Address</div>
                            <div className="mobile">Moblie Number</div>
                            <div className="status">Status</div>
                        </div>
                        {dataCandidates.map(item => {
                            return (
                                <div className="content">
                                    <div className="checkbox">
                                        <input type="checkbox" />
                                    </div>
                                    <div className="candi">
                                        <img style={{ height: '36px', width: '36px', borderRadius: '50%' }} src={item.img} />
                                        <p>{item.Name}</p>
                                    </div>
                                    <div className="appFor">{item.Designation}</div>
                                    <div className="appDate">{item.ApplieDate}</div>
                                    <div className="email">{item.Email}</div>
                                    <div className="mobile">{item.Moblie}</div>
                                    <div className="status">
                                        <div className={item.Status}>{item.Status}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </>
    )
}
export default Candidates