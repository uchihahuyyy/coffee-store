// app.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

// -------------------- KẾT NỐI CSDL --------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB đã kết nối"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const loggingMiddleware = require("./middleware/logginMiddleware");
app.use(loggingMiddleware);

app.use(
  session({
    secret: process.env.JWT_SECRET || "huy_secret",
    resave: false,
    saveUninitialized: true,
  })
);

const passport = require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

const attachUser = require("./middleware/attachUser");
app.use(attachUser);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// -------------------- MOUNT ROUTERS --------------------
app.use("/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.use("/cart", require("./routes/cart"));
app.use("/checkout", require("./routes/checkout"));
app.use("/review", require("./routes/review"));
app.use("/payment", require("./routes/payment"));
app.use("/order", require("./routes/order"));
app.use("/status", require("./routes/status"));

require("./public/backend")(app);

// -------------------- ROUTE CHI TIẾT SẢN PHẨM --------------------
app.get("/product/:id", async (req, res) => {
  try {
    const Product = require("./models/Product");
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Sản phẩm không tồn tại");
    
    res.render("detail", { 
      product, 
      user: res.locals.user 
    });
  } catch (error) {
    res.status(500).send("Lỗi lấy chi tiết sản phẩm: " + error.message);
  }
});

// -------------------- ROUTE TRANG CHỦ --------------------
app.get("/", async (req, res) => {
  const Product = require("./models/Product");
  const { search, category, minPrice, maxPrice } = req.query;
  let query = {};

  if (search) query.name = { $regex: search, $options: "i" };
  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  try {
    const products = await Product.find(query);
    res.render("home", {
      products,
      search,
      category,
      minPrice,
      maxPrice,
      user: res.locals.user,
    });
  } catch (error) {
    res.status(500).send("Lỗi lấy danh sách sản phẩm: " + error.message);
  }
});

app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
});