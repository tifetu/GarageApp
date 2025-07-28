import React from "react";
import CustomerList from "../../components/Customer/CustomerList/CustomerList";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
function CustomerListPage() {
  return (
    <div className="flex">
      <AdminMenu />
      <div className="flex-1">
        <CustomerList />
      </div>
    </div>
  );
}

export default CustomerListPage;
