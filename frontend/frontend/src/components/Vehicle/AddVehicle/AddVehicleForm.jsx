import React, { useState } from "react";
import axios from "../../../utils/axios";

const AddVehicleForm = ({ customerId, onVehicleAdded }) => {
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
    <div className="bg-white p-6 shadow-md rounded-md">
      <h3 className="text-xl font-bold text-blue-900 mb-4 border-b-2 border-red-600 inline-block">
        Add a new vehicle
      </h3>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {[
          "vehicle_year",
          "vehicle_make",
          "vehicle_model",
          "vehicle_type",
          "vehicle_mileage",
          "vehicle_tag",
          "vehicle_serial",
          "vehicle_color",
        ].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2"
            placeholder={field
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
            required
          />
        ))}

        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "ADD VEHICLE"}
        </button>

        {message && (
          <p className="text-sm text-red-700 font-semibold">{message}</p>
        )}
      </form>
    </div>
  );
};

export default AddVehicleForm;
