import React from "react";

import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddCustomer from "../../components/Customer/AddCustomer/AddCustomer";

function CustomerPage() {
  return (
    <div className="flex">
      <AdminMenu />
      <div className="flex-1">
        <AddCustomer />
      </div>
    </div>
  );
}

export default CustomerPage;
