// import costomer service
const customerService = require("../services/customer.service");
const { StatusCodes } = require("http-status-codes");
async function createCustomer(req, res) {
  const customerExists = await customerService.checkIfCustomerExist(
    req.body.customer_email
  );

  if (customerExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Customer already exists" });
  }
  try {
    const newCustomer = await customerService.createCustomer(req.body);
    // console.log(newCustomer);
    if (newCustomer) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "customer not add" });
    } else {
      res
        .status(StatusCodes.CREATED)
        .json({ message: "customer created succefuly", data: newCustomer });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something was wrong" });
  }
}
// get all customers
async function getAllCustomers(req, res) {
  const customers = await customerService.getAllCustomers();
  try {
    return res.status(StatusCodes.OK).json({
      data: customers,
      count: customers.length,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "somethin with wrong" });
  }
}
// get single customers by id
async function getCustomerById(req, res) {
  try {
    const customer = await customerService.getCustomerById(
      req.params.customerId
    );
    return res.status(StatusCodes.OK).json(customer);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch customer",
    });
  }
}
async function updateCustomer(req, res) {
  try {
    const updatedCustomer = await customerService.updateCustomer(
      req.params.customerId,
      req.body
    );
    return res.status(StatusCodes.OK).json({
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something with wrong" });
  }
}
async function deleteCustomer(req, res) {
  try {
    const deleletSuccess = customerService.deleteCustomer(
      req.params.customerId
    );
    if (!deleletSuccess) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Customer not found",
      });
    } else {
      return res.status(StatusCodes.OK).json({
        message: "Customer deleted successfully",
      });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something with wrong" });
  }
}
module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
