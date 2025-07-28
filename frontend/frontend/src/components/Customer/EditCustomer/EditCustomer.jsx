import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";

const EditCustomer = () => {
  const { customerId } = useParams(); // Get customer ID from route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_phone_number: "",
    customer_email: "",
    active_customer_status: false,
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch customer data on load

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`/customer/${customerId}`);
        const customer = res.data.data;
        console.log("Fetched customer:", customer);
        setFormData({
          customer_first_name: customer.customer_first_name,
          customer_last_name: customer.customer_last_name,
          customer_email: customer.customer_email,
          customer_phone_number: customer.customer_phone_number,
          active_customer_status: customer.active_customer_status,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching customer", err);
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/customer/${customerId}`, formData);
      setMessage("Customer updated successfully.");
      setTimeout(() => {
        navigate("/customers");
      }, 1500);
    } catch (err) {
      setMessage("Update failed.");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 border-b-2 border-red-600 inline-block">
          Edit: {formData.customer_first_name} {formData.customer_last_name}
        </h2>

        <p className="mb-6 font-medium text-gray-700">
          Customer email:
          <span className="font-semibold text-blue-900">
            {formData.customer_email}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="customer_first_name"
            value={formData.customer_first_name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent text-gray-600"
            placeholder="First name"
            required
          />

          <input
            type="text"
            name="customer_last_name"
            value={formData.customer_last_name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent text-gray-600"
            placeholder="Last name"
            required
          />

          <input
            type="tel"
            name="customer_phone_number"
            value={formData.customer_phone_number}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent text-gray-600"
            placeholder="Phone number"
            required
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="active_customer_status"
              checked={formData.active_customer_status}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Is active customer</span>
          </label>

          <button
            type="submit"
            className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700"
          >
            UPDATE
          </button>

          {message && (
            <p className="text-sm mt-2 text-green-700 font-semibold">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
