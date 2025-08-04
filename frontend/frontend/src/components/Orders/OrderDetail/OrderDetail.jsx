import React, { useEffect, useState } from "react";
import AddVehicle from "../../Vehicle/AddVehicle";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { ChevronLeft, ChevronRight, Edit, Check, X, Plus } from "lucide-react";
const OrderDetail = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [customerRes, vehiclesRes] = await Promise.all([
          axios.get(`/customer/${customerId}`),
          axios.get(`/vehicle/customer/${customerId}`),
        ]);
        setCustomer(customerRes.data.data);
        setVehicles(vehiclesRes.data.vehicle);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message);
        setLoading(false);
      }
    };

    if (customerId) fetchData();
  }, [customerId]);

  const handleSelectVehicle = (vehicleId) => {
    setSelectedVehicle(vehicleId);
    navigate(`/orders/new/${customerId}/vehicle/${vehicleId}`);
  };

  const handleBack = () => navigate(-1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto ">
        <div className=" flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            <button
              onClick={handleBack}
              className="flex items-center text-blue-600 hover:underline mb-4"
            >
              <ChevronLeft size={20} className="mr-1" />
              Back to customers
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Create a new order
            </h1>

            {customer && (
              <>
                {/* Customer Info */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">
                    {customer.customer_first_name} {customer.customer_last_name}
                  </h2>
                  <div className="space-y-2 text-black-600">
                    <p>
                      Email:
                      <span className="text-gray-600">
                        {customer.customer_email}
                      </span>
                    </p>
                    <p>
                      Phone Number:
                      <span className="text-gray-600">
                        {" "}
                        {customer.customer_phone_number}
                      </span>
                    </p>
                    <p>
                      Active:
                      <span className="text-gray-600">
                        {customer.active_customer_status ? "Yes" : "No"}
                      </span>
                    </p>
                    <div>
                      Edit customer info{" "}
                      <Link
                        to={`/customers/edit/${customer.customer_id}`}
                        className="text-red-600 hover:underline inline-block"
                      >
                        <Edit />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Vehicle List */}
              </>
            )}
          </div>

          {/* Sidebar (Optional) */}
          <div className=" bg-white p-6 rounded-lg shadow mt-4">
            <div>
              <h2 className="text-xl font-semibold mb-4">Choose a vehicle</h2>
              {vehicles.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border rounded">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-3 text-left">Year</th>
                        <th className="p-3 text-left">Make</th>
                        <th className="p-3 text-left">Model</th>
                        <th className="p-3 text-left">Tag</th>
                        <th className="p-3 text-left">Serial</th>
                        <th className="p-3 text-left">Color</th>
                        <th className="p-3 text-left">Mileage</th>
                        <th className="p-3 text-left">Choose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((vehicle) => (
                        <tr
                          key={vehicle.vehicle_id}
                          className={`border-t hover:bg-gray-50 ${
                            selectedVehicle === vehicle.vehicle_id
                              ? "bg-blue-50"
                              : ""
                          }`}
                        >
                          <td className="p-3">{vehicle.vehicle_year}</td>
                          <td className="p-3">{vehicle.vehicle_make}</td>
                          <td className="p-3">{vehicle.vehicle_model}</td>
                          <td className="p-3">{vehicle.vehicle_tag}</td>
                          <td className="p-3">{vehicle.vehicle_serial}</td>
                          <td className="p-3">{vehicle.vehicle_color}</td>
                          <td className="p-3">{vehicle.vehicle_mileage}</td>
                          <td className="p-3">
                            <button
                              onClick={() =>
                                handleSelectVehicle(vehicle.vehicle_id)
                              }
                              className={`text-blue-600 hover:underline ${
                                selectedVehicle === vehicle.vehicle_id
                                  ? "font-bold"
                                  : ""
                              }`}
                            >
                              {selectedVehicle === vehicle.vehicle_id
                                ? "Selected"
                                : "Select"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                  <div className="bg-white shadow p-4 rounded">
                    <p className="text-yellow-800 mb-4">
                      No vehicles found for this customer.
                    </p>
                    <Link
                      onClick={() => setShowAddVehicle(!showAddVehicle)}
                      className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 hover:cursor-pointer "
                    >
                      {showAddVehicle ? "CLOSE FORM" : "ADD NEW VEHICLE"}
                    </Link>

                    {showAddVehicle && (
                      <div className="mt-6">
                        <AddVehicle customerId={customerId} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {selectedVehicle && (
              <div className="mt-6">
                <button
                  onClick={() => navigate(`/vehicle/add`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                >
                  Proceed to Order Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
