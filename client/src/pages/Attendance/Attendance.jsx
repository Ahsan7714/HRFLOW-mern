import React from "react";
import { useState , useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import { addAttendance , clearState } from "../../store/reducers/adminReducer";
import toast from "react-hot-toast";
import Spinner from "../../components/spinner/Spinner";

const Attendance = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("present");  const dispatch = useDispatch();
  const { isAttendanceAdded, loading, error } = useSelector((state) => state.admin);
  useEffect(() => {
    if (isAttendanceAdded) {
      setEmployeeId("");
      setDate("");
      setSelectedStatus("present");
      dispatch(clearState());
      toast.success("Attendance added successfully");
    } 
     if (error) {
      toast.error("Error adding attendance");
    }
  }, [isAttendanceAdded, error, dispatch]);
  
  

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    await dispatch(addAttendance({employeeId: employeeId,date: date, status: selectedStatus }));
  };


  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  if(loading){
    return <Spinner/>
  }
  
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex flex-col justify-center items-center mx-[43%] mt-[5%]">
        <form
          onSubmit={handleFormSubmit}
          className="bg-[#f8fafb] p-4 flex flex-col gap-7 rounded-lg"
        >
          <h1 className="m-auto text-[25px] font-semibold mb-3">
            Add Attendance
          </h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-[20px]">
              Enter Employee ID
            </label>
            <input
              type="text"
              placeholder="Enter ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="text-[black] w-[360px] p-2 border border-[#00000041] rounded-lg outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-[20px]">
              Enter Date
            </label>
            <input
              type="date"
              placeholder="Enter ID"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-[black] w-[360px] p-2 cursor-pointer border border-[#00000041] rounded-lg outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="status">Select Status: </label>
            <select
              id="status"
              
              value={selectedStatus}
              onChange={handleStatusChange}
              className="text-[black] cursor-pointer w-[360px] p-2 border border-[#00000041] rounded-lg outline-none"
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#003268] to-[#006ee8] w-full rounded-lg text-white h-[48px] text-[20px]"
            >
              Update Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Attendance;
