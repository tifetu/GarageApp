const { query } = require("../config/db.config");

const empoyeeData = require("../services/employee.service");

const bcrypt = require("bcrypt");

// async function login(employeeData) {
//   try {
//     const employeeInfo = await empoyeeData.getEmployeeByEmail(
//       employeeData.employee_email
//     );
//     let returnData = {};
//     if (employeeInfo.length == 0) {
//       returnData = {
//         status: "Fail",
//         message: "Employee does not exist",
//       };

//       return returnData;
//     }
//     const passwordMatch = await bcrypt.compare(
//       employeeData.employee_password,
//       employeeInfo[0].employee_password_hashed
//     );

//     if (!passwordMatch) {
//       returnData = {
//         status: "Fail",
//         message: "Incorrect password",
//       };
//       return returnData;
//     }

//     returnData = {
//       status: "Success",
//       data: employeeInfo[0],
//     };
//     return returnData;
//   } catch (error) {
//     console.log("error", error);
//   }
// }
async function login(employeeData) {
  try {
    console.log("Received employee data:", employeeData);

    const employeeInfo = await empoyeeData.getEmployeeByEmail(
      employeeData.employee_email
    );

    console.log("Fetched employee info:", employeeInfo);

    if (employeeInfo.length === 0) {
      console.log("Employee does not exist.");
      return {
        status: "Fail",
        message: "Employee does not exist",
      };
    }
    if (
      !employeeData.employee_password_hashed ||
      !employeeInfo[0]?.employee_password_hashed
    ) {
      console.log("Missing password data.");
      return {
        status: "Fail",
        message: "Missing password data",
      };
    }

    const passwordMatch = await bcrypt.compare(
      employeeData.employee_password_hashed,
      employeeInfo[0].employee_password_hashed
    );

    console.log("Password match result:", passwordMatch);

    if (!passwordMatch) {
      console.log("Incorrect password.");
      return {
        status: "Fail",
        message: "Incorrect password",
      };
    }

    return {
      status: "Success",
      data: employeeInfo[0],
    };
  } catch (error) {
    console.error("Login Service Error:", error);
    return {
      status: "Fail",
      message: "Something went wrong during login",
    };
  }
}

module.exports = { login };
