// components/AddEmployeeForm.jsx
import React, { useState } from "react";
import axios from "../../../utils/axios";

function AddEmployeeForm() {
  const [employee, setEmployee] = useState({
    employee_email: "",
    employee_first_name: "",
    employee_last_name: "",
    employee_phone: "",
    employee_password_hashed: "",
    active_employee: 1, // Default to active
    company_role_id: "", // Default role (adjust as needed)
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Basic validation
      if (!employee.employee_email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }
      if (employee.employee_password_hashed.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      const response = await axios.post(
        "/employee/add-employee", // Your API endpoint
        employee,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        // Reset form
        setEmployee({
          employee_email: "",
          employee_first_name: "",
          employee_last_name: "",
          employee_phone: "",
          employee_password_hashed: "",
          active_employee: 1,
          company_role_id: "",
        });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Error adding employee:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to add employee. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Add a new employee
          <span className="ml-4 h-1 w-16 bg-red-600 inline-block"></span>
        </h1>
      </div>

      <div className="flex">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl w-full">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              Employee added successfully!
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="employee_email"
                placeholder="Employee email"
                className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent text-gray-600"
                value={employee.employee_email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="employee_first_name"
                placeholder="Employee first name"
                className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent text-gray-600"
                value={employee.employee_first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="employee_last_name"
                placeholder="Employee last name"
                className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent text-gray-600"
                value={employee.employee_last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                type="tel"
                name="employee_phone"
                placeholder="Employee phone (555-555-5555)"
                className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent text-gray-600"
                value={employee.employee_phone}
                onChange={handleChange}
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
              <small className="text-gray-500">Format: 123-456-7890</small>
            </div>

            <div>
              <input
                type="password"
                name="employee_password_hashed"
                placeholder="Employee password"
                className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent text-gray-600"
                value={employee.employee_password_hashed}
                onChange={handleChange}
                minLength="8"
                required
              />
              <small className="text-gray-500">Minimum 8 characters</small>
            </div>

            <div>
              <label className="block mb-2 text-gray-700">
                Employee Status
              </label>
              <select
                name="active_employee"
                className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent text-gray-600"
                value={employee.active_employee}
                onChange={handleChange}
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Employee Role</label>
              <select
                name="company_role_id"
                className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent text-gray-600"
                value={employee.company_role_id}
                onChange={handleChange}
                required
              >
                <option value="1">Employee</option>
                <option value="2">Manager</option>
                <option value="3">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-red-600 text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition-colors disabled:bg-red-400"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "ADD EMPLOYEE"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployeeForm;
