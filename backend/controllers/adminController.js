import jwt from "jsonwebtoken";

// Fixed admin credentials
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Email and password required" });
    }

    // Check fixed credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Invalid admin credentials" });
    }

    // Create admin token
    const token = jwt.sign(
      { role: "admin", email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Admin login successful",
      admin: {
        email,
        role: "admin",
      },
    });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};