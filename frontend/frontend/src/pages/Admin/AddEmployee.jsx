import React from "react";
import AddEmployeeForm from "../../components/Admin/AddEmployeeForm/AddEmployeeForm";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
function AddEmployee() {
  return (
    <div className="flex">
      <AdminMenu />
      <div className="flex-1">
        <AddEmployeeForm />
      </div>
    </div>
  );
}

export default AddEmployee;
