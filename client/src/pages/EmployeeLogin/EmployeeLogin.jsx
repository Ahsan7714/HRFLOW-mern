import React, {useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { employeeLogin , clearState } from "../../store/reducers/adminReducer";
import toast from "react-hot-toast";
import Spinner from "../../components/spinner/Spinner";

const EmployeeLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let id = null;
    const [selectedButton, setSelectedButton] = useState('Employee');
    const {isEmployeeLogin ,loading ,error  } = useSelector((state)=>state.admin);
    const [state,setState]=useState({
        email :"",
        password:""
    })
    const inputHandle =(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value,
        })
    }
    
   const submit = async (e) => {
  e.preventDefault();
  try {
    // Disable the button to prevent multiple clicks
    e.target.querySelector('button').disabled = true;

    const action = await dispatch(employeeLogin(state))

    id = action.payload;

    // Now you can use the ID in your component

    if (isEmployeeLogin && id !== null) {
      // Navigate and display toast only if the login was successful
      navigate(`/employee-dashboard/${id}`);
      toast.success("Login Successfully");
    }

  } catch (error) {
    toast.error(error.message);
  } finally {
    // Re-enable the button after the login attempt is completed
    e.target.querySelector('button').disabled = false;
  }
};


     

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  if(loading){
      return <Spinner/>
  }


  return (
    <div className="bg-gradient-to-r from-[#003268] to-[#006ee8] h-[100vh] w-full flex justify-center items-center">
      <div className=" bg-white h-fit w-[400px] px-5 py-7 rounded-lg">
        <div className=" flex flex-col gap-7">
            <h1 className=" m-auto text-[30px] font-bold">Welcome Back</h1>
            <div className="flex border border-[#00000038] rounded-lg text-center text-[17px]">
      <Link
        className={`flex-1 w-[120px] px-4 py-2 rounded-lg ${selectedButton === 'Employee' ? 'bg-gradient-to-r from-[#003268] to-[#006ee8] text-white' : ' bg-white text-black'}`}
        onClick={() => handleButtonClick('Employee')}
      >
        Employee
      </Link>
      <Link
      to="/"
        className={`flex-1 w-[120px] px-4 py-2 rounded-lg ${selectedButton === 'Admin' ? 'bg-gradient-to-r from-[#003268] to-[#006ee8] text-white' : 'bg-white text-black'}`}
        onClick={() => handleButtonClick('Admin')}
      >
        Admin
      </Link>
    </div>
          <form action="" onSubmit={submit} className="flex flex-col gap-7">
          <div className="flex flex-col gap-7">
            <input type="text" placeholder="Email Address"
            name="email"
            value={state.email}
            onChange={inputHandle}
            required
             className="w-full text-[black] p-2 border border-[#00000041] rounded-lg outline-none"/>
            <input type="password" placeholder="Password"
             name="password"
             value={state.password}
             onChange={inputHandle}
             required
             className="w-full text-[black] p-2 border border-[#00000041] rounded-lg outline-none"/>
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

export default EmployeeLogin;
