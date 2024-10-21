// External imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");  // Importing inboxRouter

// Internal imports
const { notFoundHandler, errorHandler } = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

// Database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Database connection successful!"))
.catch((err) => console.log(err));

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine, EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter); // Using inboxRouter


// 404 not found handler
app.use(notFoundHandler);

// Common error handler
app.use(errorHandler);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
