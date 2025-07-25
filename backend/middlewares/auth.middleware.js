import User from "../models/user.model.js";

/**
 * Middleware to protect routes by validating Clerk auth and user existence in DB
 */
export const protect = async (req, res, next) => {
  try {
    // Check if Clerk middleware has attached the auth object
    const auth = await req.auth?.();
    if (!auth || !auth.userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    // Find the user in MongoDB by Clerk ID
    const user = await User.findOne({ clerkId: auth.userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Attach user to request for downstream use
    req.user = user;
    next();
  } catch (error) {
    console.error("🔐 Auth Middleware Error:", error.message);
    res.status(500).json({ success: false, message: "Authentication failed" });
  }
};
