var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var multer = require('multer');
var cors = require('cors');
var fs=require('fs');
var path=require('path');
imageDir="./public"

let userSchema = require("../models/User");


var storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'../public')
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+"-"+file.originalname)
  }
})
//Create a User
router.route("/create-user").post((req, res, next) => {
  userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

//Get all Users
router.route("/").get((req, res) => {
  userSchema.find((error, data) => {
    if (error) {
      // eslint-disable-next-line no-undef
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// Get Single User by ID
router.route("/edit-user/:id").get((req, res) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      // eslint-disable-next-line no-undef
      return next(error);
    } else {
      res.json(data);
    }
  });
});


router.route("/getfile/:filename").get((req,res)=>{
    var files=fs.readdirSync(imageDir);
    for (let index = 0; index < files.length; index++) {
      if (files[index]===req.params.filename) {
        res.status(200).json(files[index])
      }else{
        res.status(400).json({response:"file not found"})
      }
    }  
})

// Update single user
router.route("/update-user/:id").put((req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (error, data) => {
      if (error) {
        return  next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("User Update Successfully");
      }
    }
  );
});

// Delete User
router.route("/delete-user/:id").delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
