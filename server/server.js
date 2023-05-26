const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 8080;
const conn = require("./config/database");
const { handleError } = require("./middlewares/errorHandler");

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const touristRoute = require("./routes/touristRoute");

const app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.disable("x-powered-by"); //for sec purposes

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/tourist", touristRoute);

app.use(handleError);

conn()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
