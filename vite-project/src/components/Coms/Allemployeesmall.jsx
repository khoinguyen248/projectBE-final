import React from 'react'
import { useParams } from 'react-router-dom'
import AddEmployee from '../AllEmployees/AddEmployee/AddEmployee'
import PersonalInf from '../AllEmployees/AddEmployee/PersonalInf'

const Allemployeesmall = () => {

  const {employeeId}  = useParams()
  return (
    <>
    {employeeId === "addemployee" ? <AddEmployee /> : <PersonalInf/>}
    
    </>
     
  )
}

export default Allemployeesmall