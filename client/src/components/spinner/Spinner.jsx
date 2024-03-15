import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center text-center mt-[20%]" >

    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    </div>
  );
};

export default Spinner;
