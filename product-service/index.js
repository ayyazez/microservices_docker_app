const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5001;
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/product-service", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});
const Product = mongoose.model("Product", productSchema);

// Middleware to Authenticate JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// Routes
app.post("/products", authenticate, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

app.get("/products", authenticate, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.put("/products/:id", authenticate, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

app.delete("/products/:id", authenticate, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
