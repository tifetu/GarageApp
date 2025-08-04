import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { ChevronLeft, Edit, Check, AlertCircle } from "lucide-react";

const NewOrder = () => {
  const { customerId, vehicleId } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [additionalRequests, setAdditionalRequests] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Verify IDs are valid numbers
        if (isNaN(customerId)) throw new Error("Invalid customer ID");
        if (isNaN(vehicleId)) throw new Error("Invalid vehicle ID");

        // Fetch all data in parallel
        const [customerRes, vehicleRes, servicesRes] = await Promise.all([
          axios.get(`/customer/${customerId}`),
          axios.get(`/vehicle/${vehicleId}`),
          axios.get("/services"),
        ]);

        // Validate responses
        if (!customerRes.data) throw new Error("Customer data not found");
        if (!vehicleRes.data) throw new Error("Vehicle data not found");
        if (!servicesRes.data?.length) throw new Error("No services available");

        setCustomer(customerRes.data);
        setVehicle(vehicleRes.data);
        setServices(servicesRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load order data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerId, vehicleId]);

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.service_id === serviceId);
      return total + (service?.base_price || 0);
    }, 0);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const orderData = {
        customer_id: parseInt(customerId),
        vehicle_id: parseInt(vehicleId),
        employee_id: 1, // Would come from auth in real app
        services: selectedServices.map((serviceId) => ({
          service_id: serviceId,
          price: services.find((s) => s.service_id === serviceId).base_price,
        })),
        additional_requests: additionalRequests,
        total_price: calculateTotal(),
      };

      const response = await axios.post("/orders", orderData);
      navigate(`/orders/${response.data.order_id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
      setLoading(false);
    }
  };

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
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center text-red-500 mb-4">
            <AlertCircle className="mr-2" size={20} />
            <h3 className="text-lg font-bold">Error Loading Order Data</h3>
          </div>
          <p className="mb-4">{error}</p>
          <div className="flex space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Retry
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b flex items-center">
          <button
            onClick={() => navigate(`/orders/new/${customerId}`)}
            className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
          >
            <ChevronLeft className="mr-1" size={20} />
            Back to Vehicles
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Create New Order</h1>
        </div>

        {/* Customer Information */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {customer.customer_first_name} {customer.customer_last_name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                <p>Email: {customer.customer_email}</p>
                <p>Phone: {customer.customer_phone_number}</p>
                <p>
                  Status:
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      customer.active_customer_status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {customer.active_customer_status ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/customers/edit/${customerId}`)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Edit className="mr-1" size={16} />
              Edit
            </button>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {vehicle.vehicle_year} {vehicle.vehicle_make}{" "}
                {vehicle.vehicle_model}
              </h2>
              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <p>VIN: {vehicle.vehicle_serial}</p>
                <p>License: {vehicle.vehicle_tag}</p>
                <p>Color: {vehicle.vehicle_color}</p>
                <p>
                  Mileage: {vehicle.vehicle_mileage?.toLocaleString() || "N/A"}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/vehicles/edit/${vehicleId}`)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Edit className="mr-1" size={16} />
              Edit
            </button>
          </div>
        </div>

        {/* Service Selection */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Select Services</h2>
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.service_id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedServices.includes(service.service_id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => toggleService(service.service_id)}
              >
                <div className="flex items-start">
                  <div
                    className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 mt-1 ${
                      selectedServices.includes(service.service_id)
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedServices.includes(service.service_id) && (
                      <Check size={14} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{service.service_name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {service.service_description}
                    </p>
                    <p className="text-blue-600 font-medium mt-2">
                      ${service.base_price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Requests */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-2">Additional Requests</h2>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Enter any special instructions or requests..."
            value={additionalRequests}
            onChange={(e) => setAdditionalRequests(e.target.value)}
          />
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {selectedServices.length > 0 ? (
            <>
              <div className="mb-4 space-y-2">
                {selectedServices.map((serviceId) => {
                  const service = services.find(
                    (s) => s.service_id === serviceId
                  );
                  return (
                    <div
                      key={serviceId}
                      className="flex justify-between py-2 border-b"
                    >
                      <span>{service.service_name}</span>
                      <span>${service.base_price.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 mb-6">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </>
          ) : (
            <p className="text-gray-500 mb-6">No services selected</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || selectedServices.length === 0}
            className={`w-full py-3 rounded-lg font-medium text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : selectedServices.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
