// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();
// const cors = require("cors");
// const authController = require("./controllers/authController");
// const blogController = require("./controllers/blogController");
// const multer = require("multer");
// const app = express();

// console.log("Starting server...");

// // connect db
// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URL, () =>
//   console.log("MongoDB has been started successfully")
// );

// // routes
// app.use("/images", express.static("public/images"));

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/auth", authController);
// app.use("/blog", blogController);

// app.get("/blog/getAll", (req, res) => {
//   res.json({ msg: "Direct test works" });
// });

// // multer
// console.log("BODY:", req.body);
// console.log("FILE:", req.file);

// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/images");
//   },
//   filename: function (req, file, cb) {
//     // Generate unique filename here, do NOT use req.body.filename
//     const uniqueName =
//       Date.now() +
//       "-" +
//       Math.round(Math.random() * 1e9) +
//       path.extname(file.originalname);
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage });

// app.post("/upload", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   // Send back the generated filename to frontend
//   res.status(200).json({ filename: req.file.filename });
// });

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "public/images");
// //   },
// //   filename: function (req, file, cb) {
// //     // cb(null, req.body.filename);
// //     cb(null, req.body.filename || Date.now() + path.extname(file.originalname));
// //   },
// // });

// // const upload = multer({
// //   storage: storage,
// // });

// // app.post("/upload", upload.single("image"), async (req, res) => {
// //   return res.status(200).json({ msg: "Successfully uploaded" });
// // });

// // connect server
// app.listen(process.env.PORT, () =>
//   console.log("Server has been started successfully")
// );

// app.get("/test", (req, res) => {
//   res.json({ msg: "Backend is working" });
// });

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const authController = require("./controllers/authController");
const blogController = require("./controllers/blogController");
const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

console.log("✅ NODE_ENV:", process.env.NODE_ENV);
console.log("✅ MONGO_URL:", process.env.MONGO_URL);

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://myblogapp-1.onrender.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint for Render
// app.get("/healthz", (req, res) => {
//   console.log("🧠 Health check triggered");
//   res.status(200).send("OK");
// });

app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
    time: new Date().toISOString(),
    env: process.env.NODE_ENV,
    port: process.env.PORT,
  });
});

// Serve static files
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Use routes
app.use("/auth", authController);
app.use("/blog", blogController);

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

// Upload logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  console.log("FILE:", req.file);
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ filename: req.file.filename });
});

app.get("/test", (req, res) => {
  res.json({ msg: "Backend is working" });
});

app.get("/", (req, res) => {
  res.send("🚀 Hello from BlogApp backend!");
});

app.use((req, res, next) => {
  console.warn("Route not found:", req.originalUrl);
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on Render's port ${PORT}`);
});

// Start server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const PORT = process.env.PORT;
// console.log("✅ Starting server... process.env.PORT =", process.env.PORT);
// console.log("✅ Environment:", process.env);

// if (!PORT) {
//   console.error("❌ PORT is not defined. Set process.env.PORT.");
//   process.exit(1);
// }
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
