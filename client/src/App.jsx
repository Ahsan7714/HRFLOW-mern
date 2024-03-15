import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';
import Employees from './pages/Employees/Employees.jsx';
import Attendance from './pages/Attendance/Attendance.jsx';
import History from './pages/History/History.jsx';
import EmployeeLogin from './pages/EmployeeLogin/EmployeeLogin.jsx';
import EmployeeDashboard from './pages/EmployeeDashboard/EmployeeDashboard.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/employeeLogin" element={<EmployeeLogin/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/employees" element={<Employees/>} />
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/employee-dashboard/:id" element={<EmployeeDashboard/>} />
      </Routes>
     
    </>
  )
}

export default App
