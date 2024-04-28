const jwt = require("jsonwebtoken");
const prisma = require("../db/client/prismaClient");


const requireAuth = async (req, res, next) => {

  // Verify authentication
  const { authorization } = req.headers;


  if (!authorization) {
    return res.status(401).json({ error: "Auth token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET);

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true } // Select only the id field
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
