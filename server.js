const express = require("express");
// const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;

const UserRouter = require("./routes/user.route");
const InitiateMongoServer = require("./config/db");

const app = express();

InitiateMongoServer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(cors());

app.use("/api/user", UserRouter);

app.listen(port, () => {
  console.log(`server started in port ${port}`);
});
