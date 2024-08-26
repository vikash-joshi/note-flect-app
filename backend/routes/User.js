var express = require("express");
const mongoose = require('mongoose');
const Users = require("../models/User");
var router = express.Router();
const jwt = require('jsonwebtoken');
const {
    body,
    validationResult
} = require("express-validator");
const { GeneratePassword } = require("../common/password");
const {authenticateToken} = require("../middleware/fetchuser");
//const {} = require("../middleware/fetchuser");
const { SaveEmailLog } = require("../common/MailMethods");
const  {Registration_Mail}  = require("../common/mailbody");




router.post(
    "/create",
    [
        body(
            "name",
            "Name Cannot be Blank or Cannot be Less than 3 character"
        ).isLength({
            min: 3
        }),
        body("email", "Email Cannot Be Blank and Provide Correct Email").isEmail(),
        body("phoneNumber").isLength({
            min: 10
        }),
    ],
    async (req, res) => {

        const {
            name,
            email,
            Gender,
            UserBio,
            phoneNumber,
            UserType
        } = req.body;
        try {
            console.log(req.body)
            const _error = validationResult(req);
            if (!_error.isEmpty()) {
                console.log(_error.array());
                res
                    .status(200)
                    .json({
                        message: '0:' + _error.array().map((x) => x.path + " " + x.msg).join(' ')
                    });
            } 
            else {
                let MakePassWordHas = req.body.password;
                let Object = await GeneratePassword({
                    Password: MakePassWordHas,
                    Message: "1:",
                });
                if (Object.Message.includes("0:")) {
                    res.json({
                        message: "0:Something Went Wrong Try Again Later"
                    });
                    return;
                } 
                else {
                    MakePassWordHas = Object.Password;
                }
                const newUser = new Users({
                    name: name,
                    email: email,
                    password: MakePassWordHas,
                    gender: Gender,
                    UserBio: UserBio,
                 //   createdAt: Date.now(),
                    phoneNumber: phoneNumber,
                    UserType: UserType,
                });
                let _Result = await newUser.save();
                if (_Result) 
                    {
                   
                    //    let UserId=await  Users.findOne({UserType:'Admin'});
   
                    let Body=Registration_Mail(req.body.name);
                    let MailModel = {
                      ...Body,
                        ToEmail: req.body.email,
                        createdAt: Date.now(),
                        //,
                        UserId:_Result['_id']
                    }
                    let ress = await SaveEmailLog(MailModel);

                    res.status(201).json({ message: '1:Registration Success' });
                }
                else 
                {
                    res.status(201).json({ message: '1:Registration Failed' });
                }
                /*   .then(
                        async(result) => {
                            let UserId=await Get_Admin_UserId();
                         
                            let MailModel={
                                ...Registration_Mail(req.body.name),
                                ToEmail:req.body.email,
                                createdAt:Date.now(),
                                UserId:UserId 
                            }
                            console.log(MailModel)
                            let ress =await SaveEmailLog(MailModel);
                            console.clear()
                            console.log(ress)
                            res.status(201).json({message:'1:Registration Success'});
                        }).catch(err => {
                            console.log('error',err)
                            if (err.code === 11000) {
                                // Duplicate key error
                                console.log(Object.keys(err.keyPattern));
                                const field = Object.keys(err.keyPattern)[0]; // Get the field that caused the error
                                res
                                    .status(200)
                                    .json({
                                        message: `The ${field} is already in use.`
                                    });
                            } else {
                                res.status(200).json({
                                    message: err.message
                                });
                            }
                        }
                    );*/
            }
        } 
        catch (err) {
            if (err.code === 11000) {
                // Duplicate key error
                const field = Object.keys(err.keyPattern)[0]; // Get the field that caused the error
                res.status(200).json({
                    message: `The ${field} is already in use.`
                });
            } else {
                res.status(200).json({
                    message: err.message
                });
            }
        }
    }
);

router.get("/get", async (req, res) => {
    try {
        const limit = 5;  // Number of documents per page
        const skip = (req.query.Page - 1) * limit;
        let TotalRecords = await Users.countDocuments(Condition);

        const _user = await Users.find({}, {
            name: 1,
            email: 1,
            UserBio: 1,
            phoneNumber: 1
        }).skip(skip).limit(limit);
        if (_user) {
            res.json({ Users: _user, TotalRecord: TotalRecords });
        } else {
            res.status(200).json({
                message: "0:Data Not Found"
            });
        }
    } catch (ex) {
        res.json({
            message: "0:" + ex.message
        });
    }
});

router.get("/getuser", authenticateToken, async (req, res) => {
    try {
        const _user = await Users.find({
            _id: (new mongoose.Types.ObjectId(req.body.UserId))
        }, {
            name: 1,
            email: 1,
            UserBio: 1,
            phoneNumber: 1,
            gender: 1, UserType: 1
        });
        console.log(_user);
        if (_user) {
            res.json(_user[0]);
        } else {
            res.status(200).json({
                message: "0:Data Not Found"
            });
        }
    } catch (ex) {
        res.json({
            message: "0:" + ex.message
        });
    }
});

router.post(
    "/update",
    [
        body(
            "name",
            "Name Cannot be Blank or Cannot be Less than 3 character"
        ).isLength({
            min: 3
        }),
        body("email", "Email Cannot Be Blank and Provide Correct Email").isEmail(),

    ], authenticateToken,
    async (req, res) => {
        const {
            name,
            Gender,
            UserBio,
        } = req.body;
        try {
            const _error = validationResult(req);
            if (!_error.isEmpty()) {
                console.log(_error.array());
                res
                    .status(200)
                    .json({
                        message: _error.array().map((x) => x.path + " " + x.msg)
                    });
            } else {



                let NoteResult = await Users.updateOne(
                    {
                        _id: req.body.UserId.toString()
                    },
                    {
                        $set: {
                            name: name,
                            gender: Gender,
                            UserBio: UserBio,
                        }
                    }
                );
                console.log('fianl', NoteResult)
                if (NoteResult) {
                    res.status(200).json({
                        message: "1:Update Successfully",
                        Data: {
                            id: NoteResult?._id
                        }
                    })

                }
                else {
                    res.status(200).json({
                        message: "0:U",
                        Data: null
                    });
                }


                /*  Users
                      .findOneUpdate({
                          email: _userexist[0]["email"]
                      }, {
                          $set: {
                              name: req.body.name,
                              UserBio: req.body.UserBio,
                          },
                      })
                      .then((result) => {
                          res.status(201).json(result);
                      })
                      .catch((err) => {
                          res.status(200).json({
                              message: err.message
                          });
                      });*/
            }
            /*else{

      
    newUser.save().then(
      (result) => {
        res.status(201).json(result);
      },
      (err) => {
        if (err.code === 11000) {
          // Duplicate key error
          console.log(Object.keys(err.keyPattern));
          const field = Object.keys(err.keyPattern)[0]; // Get the field that caused the error
          res
            .status(200)
            .json({ message: `The ${field} is already in use.` });
        } else {
          res.status(200).json({ message: err.message });
        }
      }
    );
  }
}*/

        } catch (err) {
            res.status(200).json({
                message: err.message
            });
        }
    }
);



module.exports = router;