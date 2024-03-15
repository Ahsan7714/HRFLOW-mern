import React, { useState, useEffect } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../store/reducers/adminReducer";
import toast from "react-hot-toast";
import Spinner from "../../components/spinner/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState('Admin');
  const { isAdminLogin, loading, error } = useSelector((state) => state.admin);
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isAdminLogin) {
      toast.success("Login Successfully");
      navigate("/admin");
    } 
     if (error) {
      toast.error("Invalid Email or Password");
    }
  }, [isAdminLogin,error]);

  const submit = (e) => {
    e.preventDefault();

    // Check if the entered email and password are for the admin
    if (state.email === 'admin@gmail.com' && state.password === 'adminpassword') {
      dispatch(adminLogin(state));
    } else {
      toast.error("Wrong email or password");
    }
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div className="bg-gradient-to-r from-[#003268] to-[#006ee8] h-[100vh] w-full flex justify-center items-center">
      <div className=" bg-white h-fit w-[400px] px-5 py-7 rounded-lg">
        <div className=" flex flex-col gap-7">
          <h1 className=" m-auto text-[30px] font-bold">Welcome Back</h1>
          <div className="flex border border-[#00000038] rounded-lg text-center text-[17px]">
            <Link
              to="/employeeLogin"
              className={`flex-1  w-[120px] px-4 py-2 rounded-lg ${selectedButton === 'Employee' ? 'bg-gradient-to-r from-[#003268] to-[#006ee8] text-white' : ' bg-white text-black'}`}
              onClick={() => handleButtonClick('Employee')}
            >
              Employee
            </Link>
            <Link
              className={`flex-1  w-[120px] px-4 py-2 rounded-lg ${selectedButton === 'Admin' ? 'bg-gradient-to-r from-[#003268] to-[#006ee8] text-white' : 'bg-white text-black'}`}
              onClick={() => handleButtonClick('Admin')}
            >
              Admin
            </Link>
          </div>
          <form action="" onSubmit={submit} className="flex flex-col gap-7">
            <div className="flex flex-col gap-7">
              <input
                type="text"
                placeholder="Email Address"
                name="email"
                value={state.email}
                onChange={inputHandle}
                required
                className="w-full text-[black] p-2 border border-[#00000041] rounded-lg outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={state.password}
                onChange={inputHandle}
                required
                className="w-full text-[black] p-2 border border-[#00000041] rounded-lg outline-none"
              />
            </div>
            <div>
              <button className="bg-gradient-to-r from-[#003268] to-[#006ee8] w-full rounded-lg text-white p-2" >Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
