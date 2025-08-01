// OrderList.jsx
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`/order?page=${page}&limit=10`).then((res) => {
      setOrders(res.data.data);
    });
  }, [page]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.order_id}
            className="bg-white p-4 shadow rounded border hover:shadow-md"
          >
            <p className="text-lg font-semibold text-gray-700">
              #{order.order_id} - {order.customer_first_name}{" "}
              {order.customer_last_name}
            </p>
            <p className="text-sm text-gray-500">
              {order.vehicle_make} {order.vehicle_model} ({order.vehicle_year})
            </p>
            <p className="text-sm">Status: {order.status}</p>
            <Link
              to={`/order/${order.order_id}`}
              className="text-blue-600 text-sm hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderList;
