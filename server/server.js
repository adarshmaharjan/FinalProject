const express = require("express");
// const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;

const UserRouter = require("./routes/user.route");
const InitiateMongoServer = require("./config/db");

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

InitiateMongoServer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/user", UserRouter);

// if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.resolve(__dirname, "../client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});
// }

app.listen(port, () => {
  console.log(`server started in port ${port}`);
});
