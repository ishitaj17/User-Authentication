// const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET;

// exports.authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("JWT Verification Error:", error);
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_SECRET = process.env.JWT_SECRET;
exports.authMiddleware = (req, res, next) => {
  // Log the entire headers object
  console.log("Headers received:", req.headers);

  // Retrieve the token from the Authorization header
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No Authorization header provided" });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];
  console.log("Extracted token:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    // console.log("Secret token:", JWT_SECRET, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Attach user information to the request
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
