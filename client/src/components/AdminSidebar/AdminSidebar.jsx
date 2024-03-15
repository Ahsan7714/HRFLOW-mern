import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { FaHistory } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { IoNewspaperOutline } from "react-icons/io5";
import logo from "../../assets/logo.png";
import { useDispatch , useSelector } from "react-redux";
import { useEffect } from "react";
import { adminLogout , clearState } from "../../store/reducers/adminReducer";
import toast from "react-hot-toast";
const AdminSidebar = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogout , loading , error } = useSelector((state) => state.admin);

  useEffect(() => {
    if(isLogout){
      navigate("/")
      alert("Logout Successfully");
      dispatch(clearState());
    }
    if(error){
      console.log(error);
    }
  }, [isLogout,error,dispatch,navigate]);
  const handleLogout = () => {
    dispatch(adminLogout());
  }
  return (
    <div className="bg-[#f8fafb] h-[100vh] fixed ">
      <div className="flex items-center justify-center">
        <img src={logo} alt="" className="h-[40px]" />
        <h1 className="py-5 font-bold text-[30px] text-black">HRFLOW</h1>
      </div>
      <div className="flex flex-col  px-12 py-10  gap-10">
        <Link
          to="/admin"
          className={`
        ${
          location.pathname == "/admin"
            ? "bg-gradient-to-r from-[#003268] to-[#006ee8] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <LuLayoutDashboard />
          <p>Dashboard</p>
        </Link>
        <Link
          to="/employees"
          className={`
        ${
          location.pathname == "/employees"
            ? "bg-gradient-to-r from-[#003268] to-[#006ee8] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <GoPeople />
          <p>Employees</p>
        </Link>
        <Link
          to="/attendance"
          className={`
        ${
          location.pathname == "/attendance"
            ? "bg-gradient-to-r from-[#003268] to-[#006ee8] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <IoNewspaperOutline />
          <p>Attendance</p>
        </Link>
        <Link
          to="/history"
          className={`
        ${
          location.pathname == "/history"
            ? "bg-gradient-to-r from-[#003268] to-[#006ee8] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <FaHistory />
          <p>History</p>
        </Link>
        <Link
          
          onClick={handleLogout}
          className={`
        ${
          location.pathname == "/manage-employees"
            ? "bg-gradient-to-r from-[#003268] to-[#006ee8] text-white "
            : "text-[#000000a5] "
        }
        flex gap-2 items-center text-[20px] h-10 px-4 rounded-md`}
        >
          <BiLogOutCircle />
          <p>Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
