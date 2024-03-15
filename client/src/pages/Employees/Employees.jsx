import React from "react";
import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import { HiDotsHorizontal } from "react-icons/hi";
import { CgMail } from "react-icons/cg";
import { FiPhoneCall } from "react-icons/fi";
import { Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import baseurl from "../../store/baseurl";
import {
  createEmployee,
  getAllEmployees,
  clearState,
  getEmployeeCount,
  deleteEmployee,
} from "../../store/reducers/adminReducer";
import toast from "react-hot-toast";
import Spinner from "../../components/spinner/Spinner";

const Employees = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [dateOfJoined, setDateOfJoined] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [deductionForLeave, setDeductionForLeave] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState("");
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    dateOfJoined: "",
    salary: "",
    department: "",
    dateOfJoined: "",
    phoneNo: "",
    deductionForLeave: "",
    designation: "",
    gender: "",
  });
  const {
    isEmployeeCreated,
    totalEmployee,
    allEmployees,
    isEmployeeDeleted,
    loading,
    error,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllEmployees());
    dispatch(getEmployeeCount());
  }, [dispatch]);

  // Handle form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !dateOfJoined ||
      !salary ||
      !department ||
      !phoneNo ||
      !deductionForLeave ||
      !designation ||
      !gender ||
      !image
    ) {
      alert("Please fill in all fields.");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("designation", designation);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("salary", salary);
    formData.append("image", image);
    formData.append("dateOfJoined", dateOfJoined);
    formData.append("department", department);
    formData.append("phoneNo", phoneNo);
    formData.append("deductionForLeave", deductionForLeave);
    dispatch(createEmployee(formData));
  };
  const clearFormData = () => {
    setName("");
    setEmail("");
    setPassword("");
    setAddress("");
    setImage("");
    setDateOfJoined("");
    setSalary("");
    setDepartment("");
    setPhoneNo("");
    setDeductionForLeave("");
    setDesignation("");
    setGender("");
  };

  useEffect(() => {
    if (isEmployeeCreated) {
      dispatch(clearState());
      dispatch(getAllEmployees());
      dispatch(getEmployeeCount());
      clearFormData();
      toast.success("Employee Created Successfully");
    }
  }, [isEmployeeCreated, error, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Error in creating employee");
      dispatch(clearState());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isEmployeeDeleted) {
      dispatch(clearState());
      dispatch(getAllEmployees());
      dispatch(getEmployeeCount());
      toast.success("Employee Deleted Successfully");
    }
  }, [isEmployeeDeleted, dispatch, error]);
  useEffect(() => {
    if (error) {
      toast.error("Error in deleting employee");
      dispatch(clearState());
    }
  }, [error, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateData = (employeeId) => {
    setSelectedId(employeeId);
    
    const editData = allEmployees.find((emp) => emp._id === employeeId);
    if(editData){
      setUpdateData({
        name: editData.name,
        email: editData.email,
        address: editData.address,
        dateOfJoined: editData.dateOfJoined,
        salary: editData.salary,
        department: editData.department,
        phoneNo: editData.phoneNo,
        deductionForLeave: editData.deductionForLeave,
        designation: editData.designation,
        gender : editData.gender
      })
      
    } else {
      toast.error("Employee not found");
      console.log("error")
    }
  }



  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`${baseurl}/update/${selectedId}`, updateData)
      .then((res) => {
        console.log(res);
        dispatch(getAllEmployees());
        toast.success('Employee Updated successfully');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error in updating employee');
      }
      );
  };
  



  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="mt-14 ml-[22%] mr-6  flex flex-col w-full gap-10 mb-3">
        {/*  */}
        <div className="flex justify-between">
          <div className="flex gap-4 text-[35px] items-center">
            {totalEmployee ? (
              <p className="text-[#0042e8]">{totalEmployee}</p>
            ) : (
              <p className="text-[35px] text-[#0042e8] ">0</p>
            )}

            <p>Employees</p>
          </div>
          <div>
            <button
              className=" bg-gradient-to-r from-[#003268] to-[#006ee8] text-[white] px-4 py-2 rounded-lg text-[20px]"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              + Add Employee
            </button>
          </div>
        </div>
        {/*  */}
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-[25px]" id="staticBackdropLabel">
                  Add Employee
                </h5>
                <button
                  type="button"
                  class=" text-white bg-[#54595e] px-2 py-1 rounded-md"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  close
                </button>
              </div>
              <div class="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="flex w-full flex-col gap-6">
                    <Input
                      color="blue"
                      label="Enter name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                      color="blue"
                      type="email"
                      label="Enter Email Address"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      color="blue"
                      label="Enter password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      color="blue"
                      label="Enter Address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <Input
                      color="blue"
                      type="date"
                      label="Enter Date"
                      name="dateOfJoined"
                      value={dateOfJoined}
                      onChange={(e) => setDateOfJoined(e.target.value)}
                    />
                    <Input
                      color="blue"
                      label="Enter Phone Number"
                      type="number"
                      name="phoneNo"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                    <Input
                      color="blue"
                      label="Enter salary"
                      name="salary"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                    <Input
                      color="blue"
                      label="Enter Department"
                      name="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                    <Input
                      color="blue"
                      label="Enter deduction for leave"
                      name="deductionForLeave"
                      value={deductionForLeave}
                      onChange={(e) => setDeductionForLeave(e.target.value)}
                    />
                    <Input
                      color="blue"
                      label="Enter Designation"
                      name="designation"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                    <Input
                      color="blue"
                      label="Enter Gender"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <input
                      className="w-full border border-[black] rounded-lg "
                      type="file"
                      id="formFile"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <div class="modal-footer">
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        className=" bg-gradient-to-r from-[#003268] to-[#006ee8] text-[white] px-4 py-2 rounded-lg"
                      >
                        Add Employee
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className=" grid grid-cols-3  gap-[30px]">
          {allEmployees ? (
            allEmployees?.map((emp, index) => {
              return (
                <div
                  className="flex flex-col p-4 rounded-xl h-[410px] w-[350px] bg-[#f8fafb]"
                  key={index}
                >
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <img
                        src={`http://localhost:8000/images/${emp?.image}`}
                        alt="user"
                        className=" rounded-full h-[80px] w-[80px] object-cover"
                      />
                      <h1 className="mt-2 text-[21px]">{emp.name}</h1>
                      <p className=" text-[#0000007b]">{emp.designation}</p>
                    </div>
                    {/*  */}
                    <div class="dropdown">
                      <button
                        type="button"
                        id={`dropdownMenuButton${index}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <HiDotsHorizontal className="text-[25px] cursor-pointer" />
                      </button>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby={`dropdownMenuButton${index}`}
                      >
                        <li>
                          <a class="dropdown-item">
                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => handleUpdateData(emp._id)}
                            >
                              Update
                            </button>
                          </a>
                        </li>

                        {/*  */}
                        <li>
                          <a
                            class="dropdown-item hover:bg-[red] hover:text-white"
                            href="#"
                            onClick={() => handleDelete(emp._id)}
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl mt-4 p-4">
                    <div className="flex justify-between text-[#0000007b]">
                      <p>Department</p>
                      <p>Hired Date</p>
                    </div>
                    <div className=" flex justify-between my-2 font-medium">
                      <p>{emp.department}</p>
                      <p>
                        {new Date(emp.dateOfJoined).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div className="flex gap-3 items-center mt-6">
                      <CgMail className="text-[20px]" />
                      <p>{emp.email}</p>
                    </div>
                    <div className="flex gap-3 items-center mt-3">
                      <FiPhoneCall className="text-[20px] " />
                      <p>{emp.phoneNo}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
          {/*  */}
          {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        dsadsafsafafa
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}

          {/* Update employee modal */}
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-[25px]" id="exampleModalLabel">
                    Update Employee
                  </h5>
                  <button
                    type="button"
                    class=" text-white bg-[#54595e] px-2 py-1 rounded-md"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    close
                  </button>
                </div>
                <div class="modal-body">
                  <form onSubmit={handleSubmitUpdate}>
                    <div className="flex w-full flex-col gap-6">
                      <Input
                        color="blue"
                        label="Enter name"
                        name="name"
                        value={updateData.name}
                        onChange={handleChange}
                      />
                      <Input
                        color="blue"
                        type="email"
                        label="Enter Email Address"
                        name="email"
                        value={updateData.email}
                        onChange={handleChange}
                      />
                      <Input
                        color="blue"
                        label="Enter Address"
                        name="address"
                        value={updateData.address}
                        onChange={handleChange}
                      />
                      <Input
                        color="blue"
                        type="date"
                        label="Enter Date"
                        name="dateOfJoined"
                        value={updateData.dateOfJoined}
                        onChange={handleChange}
                      />
                      <Input
                        color="blue"
                        label="Enter Phone Number"
                        type="number"
                        name="phoneNo"
                        value={updateData.phoneNo}
                        onChange={handleChange}
                      />
                      <Input
                        color="blue"
                        label="Enter salary"
                        name="salary"
                        value={updateData.salary}
                        onChange={handleChange}
                      />
                      <Input
                        color="blue"
                        label="Enter Department"
                        name="department"
                        value={updateData.department}
                        onChange={handleChange}
                      />
                      <Input
                        color="blue"
                        label="Enter deduction for leave"
                        name="deductionForLeave"
                        value={updateData.deductionForLeave}
                        onChange={handleChange}
                      />
                      <Input
                        color="blue"
                        label="Enter Designation"
                        name="designation"
                        value={updateData.designation}
                        onChange={handleChange}
                      />
                      <Input
                        color="blue"
                        label="Enter Gender"
                        name="gender"
                        value={updateData.gender}
                        onChange={handleChange}
                      />
                      <div class="modal-footer">
                        <button
                          type="submit"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          className=" bg-gradient-to-r from-[#003268] to-[#006ee8] text-[white] px-4 py-2 rounded-lg"
                        >
                          Update Employee
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default Employees;
