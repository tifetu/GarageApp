import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "../../../utils/axios";

const AddNewOrder = () => {
  const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText.trim()) {
        fetchCustomers(searchText);
      } else {
        setCustomers([]); // Clear list when input is empty
      }
    }, 300); // Debounce user input

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  const fetchCustomers = async (q) => {
    try {
      const response = await axios.get(`/customer/customer/search`, {
        params: { searchText: q }, // ✅ Correct query param
      });
      setCustomers(response.data.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 border-b-2 border-red-600 inline-block mb-6">
          Create a new order
        </h2>

        {/* Search Input */}
        <div className="relative max-w-2xl mb-6">
          <input
            type="text"
            placeholder="Search customers (name, email, phone)"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        {/* Results Table */}
        {customers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.customer_id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      {c.customer_first_name} {c.customer_last_name}
                    </td>
                    <td className="p-3">{c.customer_email}</td>
                    <td className="p-3">{c.customer_phone_number}</td>
                    <td className="p-3">
                      <Link
                        to={`/order/new/${c.customer_id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Select
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Add new customer */}
          </div>
        )}
        <Link
          to={"/add-customer"}
          className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 font-semibold transition"
        >
          ADD NEW CUSTOMER
        </Link>
        {/* Fallback when no results */}
        {searchText.trim() && customers.length === 0 && (
          <p className="text-gray-500 mt-4">No customers found.</p>
        )}
      </div>
    </div>
  );
};

export default AddNewOrder;
