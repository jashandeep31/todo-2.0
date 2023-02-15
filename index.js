const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const AppError = require("./utils/appError");
const errorController = require("./controllers/errorController");
const cors = require("cors");
// app port and dotenv settings
dotenv.config({ path: "./config.env" });
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);
// env settings
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// database connection
const db = process.env.DATABASE_URL;
mongoose
    .connect(
        "mongodb+srv://jashan:jashan@cluster0.uk6ibk0.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("DB connection successful!");
    })
    .catch((err) => {
        console.log(err);
    });

mongoose.set("strictQuery", false);
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
