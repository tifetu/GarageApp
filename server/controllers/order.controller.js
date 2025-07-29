const { StatusCodes } = require("http-status-codes");
const orderService = require("../services/order.service");

// Create new order with comprehensive validation
const createOrder = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ["employee_id", "customer_id", "vehicle_id"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Validate services structure if provided
    if (req.body.services && !Array.isArray(req.body.services)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Services must be an array",
      });
    }

    const newOrder = await orderService.createOrder(req.body);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error("Order creation error:", error);

    const statusCode =
      error.message.includes("Invalid") || error.message.includes("not found")
        ? StatusCodes.BAD_REQUEST
        : StatusCodes.INTERNAL_SERVER_ERROR;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to create order",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
};
// get all orders with pagination and filtering
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const orders = await orderService.getAllOrders({
      page: parseInt(page),
      limit: parseInt(limit),
      status,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Fetch all orders error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// Get order with detailed information
const getOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    if (!orderId || isNaN(parseInt(orderId))) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Valid order ID is required",
      });
    }

    const order = await orderService.getOrderById(orderId);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Order fetch error:", error);

    const statusCode = error.message.includes("not found")
      ? StatusCodes.NOT_FOUND
      : StatusCodes.INTERNAL_SERVER_ERROR;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to fetch order",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
};

// Update order status with validation
const updateStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId || !status || isNaN(parseInt(status))) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Valid order ID and status are required",
      });
    }

    // Validate status value
    const validStatuses = Object.values(orderService.ORDER_STATUS);
    if (!validStatuses.includes(parseInt(status))) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: `Invalid status. Valid values are: ${validStatuses.join(
          ", "
        )}`,
      });
    }

    const updatedOrder = await orderService.updateOrderStatus(orderId, status);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Status update error:", error);

    const statusCode = error.message.includes("not found")
      ? StatusCodes.NOT_FOUND
      : StatusCodes.INTERNAL_SERVER_ERROR;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to update order status",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
};

module.exports = {
  createOrder,
  getOrder,
  updateStatus,
  getAllOrders,
};
