import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseurl from "../baseurl";

const initialState = {
  loading: false,
  error: "",
  sumOfSalary: null,
  allEmployees: null,
  totalEmployee: null,
  isAdminLogin: false,
  isEmployeeLogin: false,
  isEmployeeCreated: false,
  isEmployeeDeleted: false,
  isAttendanceAdded: false,
  allAttendance: null,
  isLogout: false,
  isEmloyeeUpdated: false,
  singleEmployee: null,
  singleAttendance: null,
  employeeId: null,
};

// get total salary
export const getSalary = createAsyncThunk(
  "admin/getSalary",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/salary`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.sumOfSalary);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all employees
export const getAllEmployees = createAsyncThunk(
  "admin/getAllEmployees",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/all-employees`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.employees);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get employee count
export const getEmployeeCount = createAsyncThunk(
  "admin/getEmployeeCount",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/total-employee`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// admin login
export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`${baseurl}/admin/login`, info, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// logout
export const adminLogout = createAsyncThunk(
  "admin/Logout",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/logout`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// employee login
export const employeeLogin = createAsyncThunk(
  "admin/employeeLogin",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`${baseurl}/employee-login`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data.id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//create employee
export const createEmployee = createAsyncThunk(
  "admin/createEmployee",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`${baseurl}/create-employee`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//delete employee
export const deleteEmployee = createAsyncThunk(
  "admin/deleteEmployee",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.delete(`${baseurl}/all-employees/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// add attendance
export const addAttendance = createAsyncThunk(
  "admin/attendance",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`${baseurl}/attendance`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update employee
export const updateEmployee = createAsyncThunk(
  "admin/updateEmployee",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await axios.put(
        `${baseurl}/update/${info}`,
        info.updateData,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all attendance
export const getAllAttendance = createAsyncThunk(
  "admin/all-attendance",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/all-attendance`, {
        withCredentials: true,
      });
      return fulfillWithValue(data.attendances);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get single employee data
export const getSingleEmployee = createAsyncThunk(
  "admin/single-employee",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/all-employees/${id}`, {
        withCredentials: true,
      });
      console.log(data.employee);
      return fulfillWithValue(data.employee);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get single attendance data
export const getSingleAttendance = createAsyncThunk(
  "admin/single-attendance",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${baseurl}/attendance?id=${id}`, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data.attendance);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminReducer = createSlice({
  name: "adminReducer",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.error = "";
      state.sumOfSalary = null;
      state.allEmployees = null;
      state.isAdminLogin = false;
      state.isEmployeeLogin = false;
      state.isEmployeeCreated = false;
      state.isEmployeeDeleted = false;
      state.isAttendanceAdded = false;
      state.allAttendance = null;
      state.isEmloyeeUpdated = false;
      state.isLogout = false;
      state.singleEmployee = null;
      state.employeeId = null;
      state.singleAttendance = null;
    },
  },
  extraReducers: (builder) => {
    // get salary
    builder.addCase(getSalary.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSalary.fulfilled, (state, action) => {
      state.loading = false;
      state.sumOfSalary = action.payload;
    });
    builder.addCase(getSalary.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // get all employees
    builder.addCase(getAllEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.allEmployees = action.payload;
    });
    builder.addCase(getAllEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // admin login
    builder.addCase(adminLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdminLogin = true;
    });
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // employee login
    builder.addCase(employeeLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(employeeLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.isEmployeeLogin = true;
    });
    builder.addCase(employeeLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // create employee
    builder.addCase(createEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.isEmployeeCreated = true;
    });
    builder.addCase(createEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // get employee count
    builder.addCase(getEmployeeCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEmployeeCount.fulfilled, (state, action) => {
      state.loading = false;
      state.totalEmployee = action.payload;
    });
    builder.addCase(getEmployeeCount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // delete employee
    builder.addCase(deleteEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.isEmployeeDeleted = true;
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // add attendance
    builder.addCase(addAttendance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.isAttendanceAdded = true;
    });
    builder.addCase(addAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // get all attendance
    builder.addCase(getAllAttendance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.allAttendance = action.payload;
    });
    builder.addCase(getAllAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // logout
    builder.addCase(adminLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(adminLogout.fulfilled, (state, action) => {
      state.loading = false;
      state.isLogout = true;
    });
    builder.addCase(adminLogout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // update employee
    builder.addCase(updateEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.isEmloyeeUpdated = true;
    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // get single employee data
    builder.addCase(getSingleEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.singleEmployee = action.payload;
    });
    builder.addCase(getSingleEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // get single attendance data
    builder.addCase(getSingleAttendance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.singleAttendance = action.payload;
    });
    builder.addCase(getSingleAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default adminReducer.reducer;
export const { clearState } = adminReducer.actions;
