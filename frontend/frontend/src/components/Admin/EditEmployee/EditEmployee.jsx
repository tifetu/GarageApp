import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    employee_first_name: "",
    employee_last_name: "",
    employee_email: "",
    employee_phone: "",
    active_employee: 1,
    company_role_id: "",
  });
  // const [roles, setRoles] = useState([]);

  // Fetch employee data and roles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeRes = await axios.get(`/employee/${id}`);
        // axios.get("/api/roles"),
        setFormData({
          employee_first_name: employeeRes.data.employee_first_name,
          employee_last_name: employeeRes.data.employee_last_name,
          employee_email: employeeRes.data.employee_email,
          employee_phone: employeeRes.data.employee_phone,
          active_employee: employeeRes.data.active_employee,
          company_role_id: employeeRes.data.company_role_id.toString(),
        });

        // setRoles(rolesRes.data);
      } catch (err) {
        toast.error("Failed to load employee data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `/employee/${id}`,
        formData
        // {

        //   company_role_id: parseInt(formData.company_role_id),
        // },
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     "Content-Type": "application/json",
        //   },
        // }
      );

      if (response.status === 200) {
        toast.success("Employee updated successfully");
        navigate("/employees");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      toast.error(errorMessage);
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="employee_first_name"
            value={formData.employee_first_name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="employee_last_name"
            value={formData.employee_last_name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="employee_email"
            value={formData.employee_email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            name="employee_phone"
            value={formData.employee_phone}
            onChange={handleChange}
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">Format: 123-456-7890</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="active_employee"
            value={formData.active_employee}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="company_role_id"
            value={formData.company_role_id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {roles.map((role) => (
              <option key={role.company_role_id} value={role.company_role_id}>
                {role.company_role_name}
              </option>
            ))}
          </select>
        </div> */}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
