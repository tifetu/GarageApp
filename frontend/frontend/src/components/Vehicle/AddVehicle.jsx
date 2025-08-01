import React, { useState } from "react";
import axios from "../../utils/axios";

const AddVehicle = ({ customerId, onVehicleAdded = () => {} }) => {
  const [formData, setFormData] = useState({
    vehicle_year: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_type: "",
    vehicle_mileage: "",
    vehicle_tag: "",
    vehicle_serial: "",
    vehicle_color: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(`/vehicle/add-vehicle`, {
        ...formData,
        customer_id: customerId,
      });

      setMessage("Vehicle added successfully.");
      setFormData({
        vehicle_year: "",
        vehicle_make: "",
        vehicle_model: "",
        vehicle_type: "",
        vehicle_mileage: "",
        vehicle_tag: "",
        vehicle_serial: "",
        vehicle_color: "",
      });

      onVehicleAdded(); // reload vehicle list if needed
    } catch (error) {
      console.error("Add vehicle error:", error);
      setMessage("Failed to add vehicle.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          Add a new vehicle{" "}
          <span className="border-b-2 border-red-500 inline-block w-12 align-middle ml-2"></span>
        </h2>

        <div className="bg-white shadow-md rounded p-6">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="vehicle_year"
              value={formData.vehicle_year}
              placeholder="Vehicle year"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={handleChange}
            />
            <input
              type="text"
              name="vehicle_make"
              value={formData.vehicle_make}
              placeholder="Vehicle make"
              className="border border-gray-300 rounded px-4 py-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="vehicle_model"
              value={formData.vehicle_model}
              placeholder="Vehicle model"
              className="border border-gray-300 rounded px-4 py-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="vehicle_type"
              value={formData.vehicle_type}
              placeholder="Vehicle type"
              className="border border-gray-300 rounded px-4 py-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="vehicle_mileage"
              value={formData.vehicle_mileage}
              placeholder="Vehicle mileage"
              className="border border-gray-300 rounded px-4 py-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="vehicle_tag"
              value={formData.vehicle_tag}
              placeholder="Vehicle tag"
              className="border border-gray-300 rounded px-4 py-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="vehicle_serial"
              value={formData.vehicle_serial}
              placeholder="Vehicle serial"
              className="border border-gray-300 rounded px-4 py-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="vehicle_color"
              value={formData.vehicle_color}
              placeholder="Vehicle color"
              className="border border-gray-300 rounded px-4 py-2"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-red-600 text-white font-semibold px-6 py-2 rounded hover:bg-red-700 transition w-1/4 hover:cursor-pointer"
            >
              ADD VEHICLE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
