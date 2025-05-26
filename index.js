const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = 5000;

// View Engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'src', 'views'));

// Middleware
app.use(express.static("public"));
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB Connection
connectDB();

app.get("/", (req, res) => {
    res.send("server is running")
})


app.use("/", authRoutes);
app.use("/", taskRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
