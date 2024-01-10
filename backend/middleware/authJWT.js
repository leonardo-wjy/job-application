const jwt = require("jsonwebtoken");
const { user } = require("../models/index");
const config = process.env;

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["access_token"];
  if (!token) {
    return res.status(403).send({
      status: false,
      message: "Token is required",
    });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    const customer = await user.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        email: decoded.email
      },
    });
    /* const pegawai = await employee.findOne({
      where: {
        nip: decoded.nip,
      },
    }); */
    req.user = decoded;
    req.personal_data = customer;
  } catch (err) {
    return res.status(401).send({
      status: false,
      message: "Invalid Token",
      reason: err.message,
    });
  }
  return next();
};

module.exports = verifyToken;