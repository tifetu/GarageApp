// const { getConnection } = require("../config/db.config");
// const { v4: uuidv4 } = require("uuid");

// // Status constants
// const ORDER_STATUS = {
//   CREATED: 1,
//   IN_PROGRESS: 2,
//   COMPLETED: 3,
//   CANCELLED: 4,
// };

// // Create a new order with full validation
// const createOrder = async (orderData) => {
//   const conn = await getConnection();
//   try {
//     await conn.beginTransaction();

//     // Validate required relationships exist
//     const validations = [
//       { table: "employee", id: orderData.employee_id },
//       { table: "customer_identifier", id: orderData.customer_id },
//       { table: "customer_vehicle_info", id: orderData.vehicle_id },
//     ];

//     for (const validation of validations) {
//       const [result] = await conn.query(
//         `SELECT 1 FROM ${validation.table} WHERE ${
//           validation.table.split("_")[0]
//         }_id = ?`,
//         [validation.id]
//       );
//       if (result.length === 0) {
//         throw new Error(`Invalid ${validation.table.replace("_", " ")} ID`);
//       }
//     }

//     // Validate services exist
//     if (orderData.services && orderData.services.length > 0) {
//       const [services] = await conn.query(
//         "SELECT service_id FROM common_services WHERE service_id IN (?)",
//         [orderData.services.map((s) => s.service_id)]
//       );
//       if (services.length !== orderData.services.length) {
//         throw new Error("One or more service IDs are invalid");
//       }
//     }

//     // Create order with unique hash
//     const orderHash = uuidv4();
//     const [orderResult] = await conn.query(
//       `INSERT INTO orders (
//         employee_id, customer_id, vehicle_id, 
//         active_order, order_hash
//       ) VALUES (?, ?, ?, ?, ?)`,
//       [
//         orderData.employee_id,
//         orderData.customer_id,
//         orderData.vehicle_id,
//         orderData.active_order || 1,
//         orderHash,
//       ]
//     );

//     const orderId = orderResult.insertId;

//     // Create order info
//     await conn.query(
//       `INSERT INTO order_info (
//         order_id, order_total_price, 
//         additional_request, additional_requests_completed
//       ) VALUES (?, ?, ?, ?)`,
//       [
//         orderId,
//         orderData.order_total_price || 0,
//         orderData.additional_request || "",
//         orderData.additional_requests_completed || 0,
//       ]
//     );

//     // Add order services
//     if (orderData.services && orderData.services.length > 0) {
//       const serviceValues = orderData.services.map((service) => [
//         orderId,
//         service.service_id,
//         service.service_completed || 0,
//       ]);

//       await conn.query(
//         `INSERT INTO order_services (
//           order_id, service_id, service_completed
//         ) VALUES ?`,
//         [serviceValues]
//       );
//     }

//     // Set initial status
//     await conn.query(
//       "INSERT INTO order_status (order_id, status) VALUES (?, ?)",
//       [orderId, orderData.initial_status || ORDER_STATUS.CREATED]
//     );

//     await conn.commit();
//     return await getOrderById(orderId);
//   } catch (error) {
//     await conn.rollback();
//     console.error("Order creation failed:", error);
//     throw error;
//   } finally {
//     conn.release();
//   }
// };

// // Get complete order details
// const getOrderById = async (orderId) => {
//   const conn = await getConnection();
//   try {
//     // Get order header info
//     const [orders] = await conn.query(
//       `
//       SELECT 
//         o.order_id, o.order_date, o.order_hash,
//         e.employee_id, e.employee_first_name, e.employee_last_name,
//         c.customer_id, c.customer_first_name, c.customer_last_name,
//         v.vehicle_id, v.vehicle_make, v.vehicle_model, v.vehicle_year,
//         oi.order_total_price, oi.additional_request,
//         os.status as current_status
//       FROM orders o
//       JOIN employee_info e ON o.employee_id = e.employee_id
//       JOIN customer_info c ON o.customer_id = c.customer_id
//       JOIN customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
//       JOIN order_info oi ON o.order_id = oi.order_id
//       JOIN (
//         SELECT order_id, status 
//         FROM order_status 
//         WHERE order_id = ? 
//         ORDER BY order_status_id DESC 
//         LIMIT 1
//       ) os ON o.order_id = os.order_id
//       WHERE o.order_id = ?
//     `,
//       [orderId, orderId]
//     );

//     if (orders.length === 0) {
//       throw new Error("Order not found");
//     }

//     // Get services
//     const [services] = await conn.query(
//       `
//       SELECT os.*, cs.service_name, cs.service_description
//       FROM order_services os
//       JOIN common_services cs ON os.service_id = cs.service_id
//       WHERE os.order_id = ?
//     `,
//       [orderId]
//     );

//     // Get status history
//     const [statusHistory] = await conn.query(
//       `
//       SELECT * FROM order_status 
//       WHERE order_id = ?
//       ORDER BY order_status_id
//     `,
//       [orderId]
//     );

//     return {
//       ...orders[0],
//       services,
//       status_history: statusHistory,
//     };
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     throw error;
//   } finally {
//     conn.release();
//   }
// };

// // Update order status with history tracking
// const updateOrderStatus = async (orderId, newStatus) => {
//   const conn = await getConnection();
//   try {
//     await conn.beginTransaction();

//     // Verify order exists
//     const [order] = await conn.query(
//       "SELECT 1 FROM orders WHERE order_id = ?",
//       [orderId]
//     );
//     if (order.length === 0) {
//       throw new Error("Order not found");
//     }

//     // Add new status
//     await conn.query(
//       "INSERT INTO order_status (order_id, status) VALUES (?, ?)",
//       [orderId, newStatus]
//     );

//     // If completing order, mark services as completed
//     if (newStatus === ORDER_STATUS.COMPLETED) {
//       await conn.query(
//         `
//         UPDATE order_services 
//         SET service_completed = 1 
//         WHERE order_id = ? AND service_completed = 0
//       `,
//         [orderId]
//       );

//       await conn.query(
//         `
//         UPDATE order_info 
//         SET additional_requests_completed = 1 
//         WHERE order_id = ?
//       `,
//         [orderId]
//       );
//     }

//     await conn.commit();
//     return await getOrderById(orderId);
//   } catch (error) {
//     await conn.rollback();
//     console.error("Error updating order status:", error);
//     throw error;
//   } finally {
//     conn.release();
//   }
// };

// module.exports = {
//   createOrder,
//   getOrderById,
//   updateOrderStatus,
//   ORDER_STATUS,
// };
