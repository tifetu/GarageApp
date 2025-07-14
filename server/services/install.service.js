const pool = require("../config/db.config.js"); // Adjust the path as necessary
const fs = require("fs");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const install = async () => {
  const queryfile = path.join(__dirname, "sql", "queryTables.sql");
  let queries = [];
  let templine = "";
  let finalmessage = {};

  try {
    const data = fs.readFileSync(queryfile, "utf-8");
    const lines = data.split("\n");

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("--") || trimmedLine === "") return;

      templine += line;

      if (trimmedLine.endsWith(";")) {
        queries.push(templine);
        templine = "";
      }
    });

    if (templine.trim()) queries.push(templine);

    for (let i = 0; i < queries.length; i++) {
      try {
        await pool.query(queries[i]);
      } catch (error) {
        finalmessage.message = `Error executing query at index ${i}: ${error.message}`;
        finalmessage.status = StatusCodes.INTERNAL_SERVER_ERROR;
        return finalmessage;
      }
    }

    finalmessage.message = "Tables created successfully.";
    finalmessage.status = StatusCodes.OK;
  } catch (error) {
    finalmessage.message = "Unexpected error: " + error.message;
    finalmessage.status = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  return finalmessage;
};

module.exports = { install };
