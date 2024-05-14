const envConfig = require("../utils/env.config");
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authorization = req?.headers?.authorization;
  if (!authorization) {
    return res?.status(401)?.json({
      isSuccess: false,
      message: "Unauthorized access: No token provided",
    });
  }

  const token = authorization?.split(" ")[1];
  if (!token) {
    return res?.status(401)?.json({
      isSuccess: false,
      message: "Unauthorized access: Token is missing",
    });
  }

  jwt.verify(token, envConfig?.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res?.status(401)?.json({
        isSuccess: false,
        message: "Unauthorized access: Invalid token",
      });
    }

    // Additional checks
    if (decoded && decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res?.status(401)?.json({
        isSuccess: false,
        message: "Unauthorized access: Token has expired",
      });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = { verifyJWT };

// const envConfig = require("../utils/env.config");
// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const authorization = req?.headers?.authorization;
//   if (!authorization) {
//     return res?.status(401)?.json({
//       isSuccess: false,
//       message: "unauthorized access",
//     });
//   }

//   const token = authorization?.split(" ")[1];
//   jwt.verify(token, envConfig?.JWT_SECRET, (err, decoded) => {
//     console.log(decoded);
//     if (err) {
//       return res?.status(401)?.json({
//         isSuccess: false,
//         message: "unauthorized access",
//       });
//     }
//     req.decoded = decoded;
//     next();
//   });
// };

// module.exports = verifyToken;
