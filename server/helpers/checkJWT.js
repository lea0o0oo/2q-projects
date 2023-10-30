const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = async function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({
      success: false,
      error: "No Auth token found",
    });
  }

  jwt.verify(token, config.accounts.secretJWT, async (err, jwtContent) => {
    if (jwtContent != null) {
      if (err) {
        return res.status(403).json({
          success: false,
          error: "Invalid token",
        });
      }
      req.username = jwtContent.username;
      next();
    } else {
      res.status(403).json({
        success: false,
        error: "Invalid token",
      });
    }
  });
};
