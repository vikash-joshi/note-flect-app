const jwt = require("jsonwebtoken");

const authenticateToken=async (req, res, next) => {
    const token = process.env.JWT_Value;
    try {
      jwt.verify(req.cookies.token, token, (err, decoded) => {
        if (decoded) {
          console.log(decoded); // bar
          if(decoded?.IsAccountLocked)
          {
          //throw {message:'Account Locked Kindly Contact Admin'}
            res.status(200).json({ message: 'Account Locked Kindly Contact Admin',logout:true });
          }
          else{
          
          req.body.UserId=decoded?.id;
          req.body._UserType=decoded?.UserType;
          console.log(req.body.UserId)
          next();
          }
        } else {
          throw err;
        }
      });
    } catch (ex) {
      
      res.status(200).json({ message: ex.message,logout:true });
    }
};




module.exports = {authenticateToken}  ;