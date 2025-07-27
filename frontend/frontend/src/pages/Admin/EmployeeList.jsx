import React from "react";
import EmployeeList from "../../components/Admin/EmployeeList/EmployeeList";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
function EmployeeListPage() {
  return (
    <div className="flex">
      <AdminMenu />
      <div className="flex-1">
        <EmployeeList />
      </div>
    </div>
  );
}

export default EmployeeListPage;

  
