import React, { use, useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { LiaEdit } from "react-icons/lia";
import { Link, useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import AddVehicle from "../../Vehicle/AddVehicle";
const CustomerProfile = () => {
  const { customerId } = useParams();
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  const [customer, setCustomer] = useState({
    vehicles: [],
  });
  useEffect(() => {
    async function fetchCustomerData() {
      const res = await axios.get(`/customer/${customerId}`);
      setCustomer(res.data.data);
    }

    fetchCustomerData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Section */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-blue-900 text-white w-64 p-6 min-h-screen space-y-4">
          <h2 className="text-lg font-semibold mb-4">ADMIN MENU</h2>
          <nav className="space-y-2">
            <a href="#" className="block">
              Dashboard
            </a>
            <a href="#" className="block">
              Orders
            </a>
            <a href="#" className="block">
              New order
            </a>
            <a href="#" className="block">
              Add employee
            </a>
            <a href="#" className="block">
              Employees
            </a>
            <a href="#" className="block">
              Add customer
            </a>
            <a href="#" className="block">
              Customers
            </a>
            <a href="#" className="block">
              Services
            </a>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-10 bg-gray-50">
          {/* Info Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Customer: {customer.customer_first_name}{" "}
              {customer.customer_last_name}
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                Email:{" "}
                <span className="font-semibold">{customer.customer_email}</span>
              </p>
              <p>
                Phone Number:{" "}
                <span className="font-semibold">
                  {customer.customer_phone_number}
                </span>
              </p>
              <p>
                Active Customer:{" "}
                <span className="font-semibold">
                  {customer.active_customer_status ? "Yes" : "No"}
                </span>
              </p>
              <p>
                Edit customer info:
                <Link
                  to={`/customer/edit/${customer.id}`}
                  className="text-blue-600 inline-flex items-center ml-2"
                >
                  <LiaEdit size={22} className="text-red-600" />
                </Link>
              </p>
            </div>
          </div>

          {/* Cars Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Vehicles of{" "}
              <span className="font-semibold text-blue-900">
                {customer.customer_first_name}
              </span>
            </h3>
            <div className="bg-white shadow p-4 rounded">
              <button
                onClick={() => setShowAddVehicle(!showAddVehicle)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                {showAddVehicle ? "CLOSE FORM" : "ADD NEW VEHICLE"}
              </button>

              {showAddVehicle && (
                <div className="mt-6">
                  <AddVehicle customerId={customerId} />
                </div>
              )}
            </div>
          </div>

          {/* Orders Section */}
          <div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Orders of {customer.first_name}
            </h3>
            <div className="bg-white shadow p-4 rounded text-gray-500">
              Orders will be displayed here
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerProfile;
