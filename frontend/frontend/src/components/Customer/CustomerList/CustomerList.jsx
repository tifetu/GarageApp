import React, { useState, useEffect } from "react";
import { Pencil, Search, Trash2, Edit2 } from "lucide-react";
import { LiaEdit } from "react-icons/lia";
import { Link } from "react-router-dom";
import axios from "../../../utils/axios";

const CustomerList = () => {
  const [CustomerList, setCustomerList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Replace this with axios.get("/api/customer") to fetch real data
    const fetchCustomerList = async () => {
      try {
        const response = await axios.get("/customer/customers");
        setCustomerList(response.data.data);
      } catch (error) {
        console.error("Error fetching customer list:", error);
      }
    };
    fetchCustomerList();
  }, []);

  const filteredCustomerList = CustomerList?.filter((customer) =>
    `${customer.customer_first_name} ${customer.customer_last_name} ${customer.customer_email} ${customer.customer_phone_number}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`/customer/${customerId}`);
        setCustomerList((prev) =>
          prev.filter((customer) => customer.customer_id !== customerId)
        );
        alert("Customer deleted successfully.");
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };
  if (!CustomerList) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-red-600 inline-block mb-6">
          Customers
        </h2>

        {/* Search Bar */}
        <div className="flex items-center mb-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for a customer using first name, last name, email address or phone number"
              className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-500"
              size={18}
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm text-left border border-gray-200">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">First Name</th>
                <th className="px-4 py-2 border">Last Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Added Date</th>
                <th className="px-4 py-2 border">Active</th>
                <th className="px-4 py-2 border">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomerList.map((customer) => (
                <tr key={customer.customer_id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{customer.customer_id}</td>
                  <td className="px-4 py-2 border">
                    {customer.customer_first_name}
                  </td>
                  <td className="px-4 py-2 border">
                    {customer.customer_last_name}
                  </td>
                  <td className="px-4 py-2 border">
                    {customer.customer_email}
                  </td>
                  <td className="px-4 py-2 border">
                    {customer.customer_phone_number}
                  </td>
                  <td className="px-4 py-2 border">
                    {customer.customer_added_date}
                  </td>
                  <td
                    className={`px-4 py-2 border font-semibold ${
                      customer.active_customer_status
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {customer.active_customer_status ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border text-blue-600 hover:text-blue-800 cursor-pointer">
                    <Link
                      to={`/customer/edit/${customer.customer_id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <LiaEdit
                        size={20}
                        className="inline-block w-4 h-4 hover:cursor-pointer"
                      />
                    </Link>
                    <Link
                      onClick={() => handleDeleteCustomer(customer.customer_id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2
                        size={16}
                        className="inline-block w-4 h-4 hover:cursor-pointer"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (static) */}
        <div className="flex justify-end mt-4 space-x-2 text-sm">
          <button className="px-3 py-1 border rounded bg-gray-200" disabled>
            &laquo; First
          </button>
          <button className="px-3 py-1 border rounded bg-gray-200" disabled>
            &lsaquo; Previous
          </button>
          <button className="px-3 py-1 border rounded bg-blue-600 text-white">
            Next &rsaquo;
          </button>
          <button className="px-3 py-1 border rounded bg-blue-600 text-white">
            Last &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
