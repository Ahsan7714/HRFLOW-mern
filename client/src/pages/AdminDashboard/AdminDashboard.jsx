import React from "react";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuCircleDollarSign } from "react-icons/lu";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSalary, getAllEmployees ,getEmployeeCount } from "../../store/reducers/adminReducer";

import img from "../../assets/logo.jpg";
import { CgProfile } from "react-icons/cg";
import Spinner from "../../components/spinner/Spinner";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { sumOfSalary, allEmployees,totalEmployee , loading, error } = useSelector(
    (state) => state.admin
  );
  useEffect(() => {
    dispatch(getSalary());
    dispatch(getAllEmployees());
    dispatch(getEmployeeCount());
  }, [dispatch]);
  

  if (loading) {
    return <Spinner/>;
  }

  return (
    <>
      <div className="flex">
        <AdminSidebar />
        <div className="flex flex-col ml-[23%] mr-10 my-10 w-full gap-10">
          <div className="flex justify-between items-center">
            <h1 className="text-[30px]">Dashboard</h1>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="search"
                className="border border-gray-300 rounded-lg px-4 py-2 w-[300px] outline-none text-[#0000007a]"
              />
              <div className="relative rounded-full border border-[#00000042] h-10 w-10 flex justify-center items-center">
                <IoNotificationsOutline className=" text-[25px] text-[#0000008f]" />
                <p className="absolute -top-12 right-0 text-red-600 text-[50px]">
                  .
                </p>
              </div>
              <div className=" rounded-full border border-[#00000042] h-11 w-11 flex justify-center items-center">
                <img
                  src={img}
                  alt=""
                  className=" rounded-full h-10 w-10 object-cover"
                />
              </div>
              <h1 className=" font-semibold text-[18px]">Admin</h1>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between my-4">
            <div className="flex gap-10 p-9 h-[160px] w-[320px] items-center rounded-lg bg-gradient-to-r from-[#003268] to-[#006ee8] text-white">
              <div className="flex flex-col gap-4">
                <h1 className=" text-[20px]">Total Employees</h1>
                 {totalEmployee ?(<p className="text-[30px] font-bold">{totalEmployee}</p>)  : (<p className="text-[30px] font-bold">0</p>)}
                 
              </div>
              <div className="bg-[white] h-fit rounded-full text-[30px] p-4 ">
                <CgProfile className="text-[30px] font-light text-[#222286aa]" />
              </div>
            </div>
            <div className="flex gap-10 p-9 h-[160px] w-[320px] items-center rounded-lg bg-gradient-to-r from-[#003268] to-[#006ee8] text-white">
              <div className="flex flex-col gap-4">
                <h1 className=" text-[20px]">Total Budget</h1>
                <p className="text-[30px] font-bold">40000$</p>
              </div>
              <div className="bg-[white] h-fit rounded-full text-[30px] p-4 ">
                <LuCircleDollarSign className="text-[30px] font-light text-[green]" />
              </div>
            </div>
            <div className="flex gap-10 p-9 h-[160px] w-[320px] items-center rounded-lg bg-gradient-to-r from-[#003268] to-[#006ee8] text-white">
              <div className="flex flex-col gap-4">
                <h1 className=" text-[20px]">Total Salary</h1>
                {sumOfSalary ? (
                  <p className="text-[30px] font-bold">{sumOfSalary}$</p>
                ) : (
                  <p className="text-[30px] font-bold">0 $</p>
                )}
              </div>
              <div className="bg-[white] h-fit rounded-full text-[30px] p-4 ">
                <LuCircleDollarSign className="text-[30px] font-light text-[#ff3b5c]" />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-[30px]">Employees</h1>
            </div>
            <div className="flex justify-center items-center  w-full">
              <div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 1010 }} aria-label="simple table">
                    <TableHead>
                      <TableRow className="bg-[#0157b3] text-[white] text-[40px]">
                        <TableCell
                          align="center"
                          className="text-white text-[45px]"
                        >
                          Employee ID
                        </TableCell>
                        <TableCell
                          align="center"
                          className="text-white text-[45px]"
                        >
                          Name
                        </TableCell>
                        <TableCell
                          align="center"
                          className="text-white text-[45px]"
                        >
                          Email
                        </TableCell>
                        <TableCell
                          align="center"
                          className="text-white text-[45px]"
                        >
                          Salary
                        </TableCell>
                        <TableCell
                          align="center"
                          className="text-white text-[45px]"
                        >
                          Designation
                        </TableCell>
                        <TableCell
                          align="center"
                          className="text-white text-[45px]"
                        >
                          Address
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allEmployees ? (
                        allEmployees?.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">{row._id}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.salary}k</TableCell>
                            <TableCell align="center">
                              {row.designation}
                            </TableCell>
                            <TableCell align="center">{row.address}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <p className="text-[20px] text-center flex justify-center items-center" >No Employee Found</p>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
