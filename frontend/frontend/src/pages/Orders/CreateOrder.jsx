// import { useState } from "react";

// export const CreateOrder = () => {
//   const [form, setForm] = useState({
//     employee_id: "",
//     customer_id: "",
//     vehicle_id: "",
//     order_total_price: "",
//     services: [],
//   });
//   const [status, setStatus] = useState(1);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/order", {
//         ...form,
//         initial_status: status,
//       });
//       alert("Order Created");
//     } catch (error) {
//       alert("Error creating order");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Create Order</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//         <input
//           type="text"
//           placeholder="Employee ID"
//           value={form.employee_id}
//           onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
//           className="w-full border px-4 py-2 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Customer ID"
//           value={form.customer_id}
//           onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
//           className="w-full border px-4 py-2 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Vehicle ID"
//           value={form.vehicle_id}
//           onChange={(e) => setForm({ ...form, vehicle_id: e.target.value })}
//           className="w-full border px-4 py-2 rounded"
//         />
//         <input
//           type="number"
//           placeholder="Total Price"
//           value={form.order_total_price}
//           onChange={(e) =>
//             setForm({ ...form, order_total_price: e.target.value })
//           }
//           className="w-full border px-4 py-2 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-red-600 text-white px-4 py-2 rounded"
//         >
//           Create Order
//         </button>
//       </form>
//     </div>
//   );
// };
