import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllAttendance } from "../../store/reducers/adminReducer";
import Spinner from "../../components/spinner/Spinner";

const History = () => {
  const dispatch = useDispatch();
  const { allAttendance, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllAttendance());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex justify-center items-center w-full mx-[30%] mt-[5%] mb-4 shadow-xl">
        <div  >
          {allAttendance && allAttendance.length > 0 ? (
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
                  {allAttendance.map((row, index) => (
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
  );
};

export default History;
