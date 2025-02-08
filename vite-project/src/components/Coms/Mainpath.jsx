import React, { useEffect, useContext } from 'react'

import { StoreContext } from '../../store';
import { Outlet, useParams } from 'react-router-dom';

import AllDepartments from '../AllDepartments/AllDepartments';
import Attendance from './Attendance';
import Payroll from './Payroll';
import AllEmployee from './AllEmployeeTest';
import Candidates from '../Candidates/Candidates';
import Jobs from './Jobs';

export const Mainpath = () => {
  const store = useContext(StoreContext)
  const { setCurrentPage } = store;
  const { setListWorkers } = store;
  const { userId } = useParams()

  useEffect(() => {
    setCurrentPage(userId);

  }, [userId])


  const { employeeId } = useParams()

  return (
    <>

      {!employeeId && <>
        {userId === "Allemployee" && <AllEmployee />}
        {userId === "AllDepartments" && <AllDepartments />}
        {userId === "Attendance" && <Attendance />}
        {userId === "Payroll" && <Payroll />}
        {userId === "Candidates" && <Candidates />}
        {userId === "Jobs" && <Jobs />}
        {userId === "Setting" && <img style={{ height: '400px', marginRight: '800px', marginTop: '50px' }} src='https://static.vecteezy.com/system/resources/previews/027/769/355/non_2x/update-icon-upgrade-system-sign-installing-software-gear-settings-application-update-process-completed-refresh-button-update-status-symbol-updating-system-software-illustration-vector.jpg'></img>}
        {userId === "Dashboard" && <img style={{ height: '400px', marginRight: '800px', marginTop: '50px' }} src='https://static.vecteezy.com/system/resources/previews/027/769/355/non_2x/update-icon-upgrade-system-sign-installing-software-gear-settings-application-update-process-completed-refresh-button-update-status-symbol-updating-system-software-illustration-vector.jpg'></img>}
        {userId === "Leave" && <img style={{ height: '400px', marginRight: '800px', marginTop: '50px' }} src='https://static.vecteezy.com/system/resources/previews/027/769/355/non_2x/update-icon-upgrade-system-sign-installing-software-gear-settings-application-update-process-completed-refresh-button-update-status-symbol-updating-system-software-illustration-vector.jpg'></img>}
        {userId === "Holiday" && <img style={{ height: '400px', marginRight: '800px', marginTop: '50px' }} src='https://static.vecteezy.com/system/resources/previews/027/769/355/non_2x/update-icon-upgrade-system-sign-installing-software-gear-settings-application-update-process-completed-refresh-button-update-status-symbol-updating-system-software-illustration-vector.jpg'></img>}



      </>}




      <Outlet />
    </>
  )
}
