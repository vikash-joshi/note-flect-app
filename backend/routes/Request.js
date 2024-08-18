var express = require("express");
var router = express.Router();
const authenticateToken = require("../middleware/fetchuser");
const { GetRequestByUser } = require("../common/Request_Methods");

router.get('/GetRequestByUser',authenticateToken, async (req,res,next)=>{
    try {
        const _RequestList = GetRequestByUser(req.body.UserId);
        if (_RequestList && _RequestList?.length>0) {
          res.status(200).json(_RequestList);
        } else {
          res.status(200).json({message: "0:Data Not Found" });
        }
      } catch (ex) {
        res.status(200).json({message: "0:" + ex.message});
      }
});


module.exports = router;


