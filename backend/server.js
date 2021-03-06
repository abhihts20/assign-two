let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let multer = require("multer");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");
const app = express();
const userRoute = require("../backend/routes/user.route");
const { create } = require("./models/User");
const { createRef } = require("react");
imageDir="E://Product Dev//NodeJS//assign-two//public//";


app.use(express.static('E://Product Dev//NodeJS//assign-two//public//'))

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
  var storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'E://Product Dev//NodeJS//assign-two//public//')
    },
    filename:function(req,file,cb){
      cb(null,Date.now()+"-"+file.originalname)
    }
  })
  
  const upload=multer({storage})

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/users", userRoute);
app.post('/upload',upload.single('image'),(req,res)=>{
  if(req.file){
    res.json({imageUrl:`./public/${req.file.filename}`})
  }
})

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
