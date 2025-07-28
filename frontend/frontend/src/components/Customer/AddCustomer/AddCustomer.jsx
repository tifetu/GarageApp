import React, { useState } from "react";
import axios from "../../../utils/axios"; // Adjust path as needed

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    customer_email: "",
    customer_first_name: "",
    customer_last_name: "",
    customer_phone_number: "",
    customer_hash: "",
    active_customer_status: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post("/customer/add-customer", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      }); // Adjust endpoint if needed
      setMessage("Customer added successfully!");
      setFormData({
        customer_email: "",
        customer_first_name: "",
        customer_last_name: "",
        customer_phone_number: "",
        customer_hash: "",
        active_customer_status: "",
      });
      console.log(response.data);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="p-6 sm:p-12 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 border-b-2 border-red-600 inline-block">
        Add a new customer
      </h2>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <input
          type="email"
          name="customer_email"
          placeholder="Customer email"
          value={formData.customer_email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="customer_first_name"
          placeholder="Customer first name"
          value={formData.customer_first_name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="customer_last_name"
          placeholder="Customer last name"
          value={formData.customer_last_name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="tel"
          name="customer_phone_number"
          placeholder="Customer phone (555-555-5555)"
          value={formData.customer_phone_number}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="tel"
          name="customer_hash"
          placeholder="Customer password"
          value={formData.customer_hash}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          name="active_customer_status"
          value={formData.active_customer_status}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select status</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          ADD CUSTOMER
        </button>

        {message && (
          <p
            className={`mt-4 text-sm ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddCustomer;
