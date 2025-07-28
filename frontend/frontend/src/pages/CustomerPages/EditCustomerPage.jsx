import React from "react";
import EditCustomer from "../../components/Customer/EditCustomer/EditCustomer";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
function EditCustomerPage() {
  return (
    <div className="flex">
      <AdminMenu />
      <div className="flex-1">
        <EditCustomer />
      </div>
    </div>
  );
}

export default EditCustomerPage;
