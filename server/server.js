require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

const app = express();

// Behind a proxy (Render/Vercel/Nginx) so rate-limit & req.ip work correctly
app.set("trust proxy", 1);

// Security headers (CSP off by default here since this API only
// serves JSON, not HTML/JS - the frontend sets its own headers)
app.use(helmet());

// Gzip/br compression for all JSON responses -> faster responses,
// less bandwidth
app.use(compression());

// CORS - only the configured frontend origin may call this API
app.use(
  cors({
    origin: "https://tarun-sahu-house-cleaning.vercel.app",
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Strip any keys starting with "$" or containing "." from
// req.body/req.query/req.params to block NoSQL injection attempts
app.use(
  mongoSanitize({
    onSanitize: ({ key }) => {
      console.warn(`Sanitized a potentially malicious key: ${key}`);
    },
  })
);

// General rate limit - protects the whole API from abuse/DoS
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api", generalLimiter);

// Strict rate limit on admin login - blocks brute-force password guessing
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again in 15 minutes." },
});
app.use("/api/auth/admin-login", adminLoginLimiter);

// Routes
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Tarun Sahu House Cleaning API Running");
});

// 404 Route (FIXED)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error Handler - never leak stack traces to the client
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.status ? err.message : "Server Error",
  });
});

const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
