import jwt from "jsonwebtoken";

// Secret key for verifying JWT token from environment variables
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware function to authenticate requests using JWT
const authMiddleware = (req, res, next) => {
    // Extract the token from the Authorization header (Bearer <token>)
    const token = req.headers.authorization?.split(" ")[1];

    // If the token is missing, return a 401 Unauthorized response
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided.", accessToken: null });
    }

    try {
         // Verify the token using the secret key, which decodes and validates the token
        const verified = jwt.verify(token, SECRET_KEY);

        // Attach the decoded user information to the request object for further processing
        req.user = verified;

        // Call next() to pass control to the next middleware or route handler
        next();
    } catch (error) {
        // If the token is invalid or expired, return a 400 Bad Request response
        res.status(400).json({ message: "Invalid token", session: "Expired", accessToken: null });
    }
};

export default authMiddleware;
