import React from 'react'


const UpdateEmployee = () => {

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        // Add the logic to update the employee using dispatch(updateEmployee(id, updateData));
        dispatch(updateEmployee(emp._id, updateData));
      };
      
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
  return (
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
                label="Enter password"
                name="password"
                value={updateData.password}
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

  )
}

export default UpdateEmployee