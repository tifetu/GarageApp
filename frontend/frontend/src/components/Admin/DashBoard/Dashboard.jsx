import React from "react";
import DashboardCard from "./DashBoardCard";
import {
  ShoppingCart,
  Plus,
  Users,
  UserPlus,
  Wrench,
  Car,
  Settings,
  Palette,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex-1 bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Bring to the table win-win survival strategies to ensure proactive
            domination. At the end of the day, going forward, a new normal that
            has evolved from generation X is on the runway heading towards a
            streamlined cloud solution.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Row */}
          <DashboardCard
            title="All Orders"
            subtitle="OPEN FOR ALL"
            buttonText="LIST OF ORDERS"
            icon={ShoppingCart}
            buttonColor="red"
            to="/orders/new"

          />

          <DashboardCard
            title="New Orders"
            subtitle="OPEN FOR LEADS"
            buttonText="ADD ORDER"
            icon={Plus}
            buttonColor="red"
            to="/orders/new"
          />

          <DashboardCard
            title="Employees"
            subtitle="OPEN FOR ADMINS"
            buttonText="LIST OF EMPLOYEES"
            icon={Users}
            buttonColor="red"
            to ="/employees"
          />

          {/* Second Row */}
          <DashboardCard
            title="Add Employee"
            subtitle="OPEN FOR ADMINS"
            buttonText="READ MORE"
            icon={UserPlus}
            buttonColor="red"
            to="/add-employee"
          />

          <DashboardCard
            title="Engine Service & Repair"
            subtitle="SERVICE AND REPAIRS"
            buttonText="READ MORE"
            icon={Wrench}
            buttonColor="red"
          />

          <DashboardCard
            title="Tyre & Wheels"
            subtitle="SERVICE AND REPAIRS"
            buttonText="READ MORE"
            icon={Car}
            buttonColor="red"
          />

          {/* Third Row */}
          <DashboardCard
            title="Denting & Painting"
            subtitle="SERVICE AND REPAIRS"
            buttonText="READ MORE"
            icon={Palette}
            buttonColor="red"
          />

          <DashboardCard
            title="Engine Service & Repair"
            subtitle="SERVICE AND REPAIRS"
            buttonText="READ MORE"
            icon={Settings}
            buttonColor="red"
          />

          <DashboardCard
            title="Tyre & Wheels"
            subtitle="SERVICE AND REPAIRS"
            buttonText="READ MORE"
            icon={Car}
            buttonColor="red"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
