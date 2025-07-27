import React from "react";

function AddCustomer() {
  async function handlSubmit(e) {
    e.preventDefault();
  }
  return (
    <div>
      <div>
        <div>
          <h1>Add Customer</h1>
          <form onSubmit={handlSubmit}>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;
