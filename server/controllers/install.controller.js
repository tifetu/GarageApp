const installService = require("../services/install.service");
const { StatusCodes } = require("http-status-codes");
async function install(req, res) {
  const result = await installService.install();

  if (result.status == StatusCodes.OK) {
    res.status(StatusCodes.OK).json({ message: result });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: result });
  }
}
module.exports = { install };
