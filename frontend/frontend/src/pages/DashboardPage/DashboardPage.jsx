import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import Dashboard from "../../components/Admin/DashBoard/Dashboard";
function DashboardPage() {
  return (
    <div className="flex">
      <AdminMenu />
      <div className="flex-1">
        <Dashboard />
      </div>
    </div>
  );
}

export default DashboardPage;
