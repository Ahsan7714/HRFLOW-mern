import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import EmployeeSidebar from "../../components/EmployeeSidebar/EmployeeSiderbar";
import img from "../../assets/logo.jpg";
import { getSingleEmployee , getSingleAttendance } from "../../store/reducers/adminReducer";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner/Spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { singleEmployee, error, loading , singleAttendance } = useSelector(
    (state) => state.admin
  );

  const { id } = useParams(); // Extract id from URL params using useParams hook

  useEffect(() => {
    dispatch(getSingleEmployee(id));
    dispatch(getSingleAttendance(id));
    console.log(singleAttendance);
  }, [dispatch, id]); // Include id in the dependencies array

  return (
    <div className="flex">
      <EmployeeSidebar />
      <div className="ml-[26%] mr-[6%] w-full my-[2%] flex flex-col gap-5">
        <div>

        
        {loading ? (
          <Spinner/>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          singleEmployee && (
            <div className=" bg-[#f8fafb] w-full p-10 rounded-lg flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                  <p className="text-[35px] font-semibold">{singleEmployee.name}</p>
                  <p className="text-[25px] text-[#00000065]">
                    {singleEmployee.designation}
                  </p>
                </div>
                <div className="border-4 border-[#006adf] rounded-full p-1">
                  <img
                      src={`http://localhost:8000/images/${singleEmployee?.image}`}
                    alt=""
                    className="w-[150px] h-[150px] rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="bg-white flex justify-between p-5 rounded-xl">
                <div className="flex gap-5 items-center">
                  <div className="flex flex-col gap-4 text-[#0000005f] font-semibold">
                    <p>Salary</p>
                    <p>Email</p>
                    <p>Phone</p>
                    <p>Address</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p>{singleEmployee.salary}$</p>
                    <p>{singleEmployee.email}</p>
                    <p>{singleEmployee.phoneNo}</p>
                    <p>{singleEmployee.address}</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex flex-col gap-4  text-[#0000005f] font-semibold">
                    <p>Department</p>
                    <p>Designation</p>
                    <p>Leave deduction</p>
                    <p>Joining Date</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p>{singleEmployee.department}</p>
                    <p>{singleEmployee.designation}</p>
                    <p>{singleEmployee.deductionForLeave}$</p>
                    <p>{new Date(singleEmployee.dateOfJoined).toLocaleDateString('en-GB')}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
        </div>
        <div>
        <div className="text-[30px] font-semibold py-4">Attendance History</div>
        <div>
          {singleAttendance ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                  <TableRow className="bg-[#0157b3] text-[white] text-[40px]">
                    <TableCell align="center" className="text-white text-[45px]">
                      Hiistory ID
                    </TableCell>
                    <TableCell align="center" className="text-white text-[45px]">
                      Employee ID
                    </TableCell>
                    <TableCell align="center" className="text-white text-[45px]">
                      Date
                    </TableCell>
                    <TableCell align="center" className="text-white text-[45px]">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {singleAttendance?.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{row._id}</TableCell>
                      <TableCell align="center">{row.employeeId}</TableCell>
                      <TableCell align="center">
                      {new Date(row.date).toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell align="center">
                        <span
                          className={`text-${row.status === 'present' ? 'green-500 font-semibold text-[15px]' : 'red-500 font-semibold text-[15px]'}`}
                        >
                          {row.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div className="text-[20px] ml-10 text-gray-500 text-center">
              No history found.
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
