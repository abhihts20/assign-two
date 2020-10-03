let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");
const app = express();
const userRoute = require("../backend/routes/user.route");
const { create } = require("./models/User");
const { createRef } = require("react");


app.use(express.static('./public'))

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,useUnifiedTopology:true
  })
  .then(
    () => {
      console.log("Database successfully connected!");
    },
    (error) => {
      console.log("Could not connect to db:" + error);
    }
  );


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/users", userRoute);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("Connected to port :" + port);
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
