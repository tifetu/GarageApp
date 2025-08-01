import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AddNewOrder from "../../components/Orders/AddNewOrder/AddNewOrder";
function Orders1Page() {
  return (
    <div className="flex">
      <AdminMenu />
      <div className="flex-1">
        <AddNewOrder />
      </div>
    </div>
  );
}

export default Orders1Page;
