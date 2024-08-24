var express = require("express");
var router = express.Router();
const authenticateToken = require("../middleware/fetchuser");
const { GetRequestByUser, SaveRequest } = require("../common/Request_Methods");
const {
  body,
  validationResult
} = require("express-validator");
router.get('/GetRequestByUser',authenticateToken, async (req,res)=>{
    try {

        const _RequestList = await GetRequestByUser(req.body.UserId,req.body._UserType,req.query.Page);
        console.log('reuqtes',_RequestList)
        if (_RequestList) {
          res.status(200).json(_RequestList);
        } else {
          res.status(200).json({message: "0:Data Not Found" });
        }
      } catch (ex) {
        res.status(200).json({message: "0:" + ex.message});
      }
});
/*   Name:x['UserReqId']['name'],
        Email:x['UserReqId']['email'],
        RequestType:x['RequestType'],
        RequestQuery:x['RequestQuery'],
        RequestTitle:x['RequestTitle'],
        UserReqId:x['UserReqId'],
        RequestStatus:x['RequestStatus'],
        Response:x['Response'],
        CreatedAt:x['createdAt'],
        modifiedAt:x['modifiedAt'],
        _id:['_id']*/
router.post('/Save',[body("RequestType", "Request Type Cannot Be Blank").exists(),
  body("RequestQuery", "RequestQuery Cannot Be Blank").exists(),
  body("RequestTitle", "RequestTitle Cannot Be Blank").exists() ],authenticateToken, async (req,res,next)=>{
  try {
    const _error = validationResult(req);
    if (!_error.isEmpty()) {
        res.status(200).json({ error: _error.array().map((x) => x.path + " " + x.msg)});
    } else {
      console.log(req.body)
     let Result=await SaveRequest(req.body,req.body?.UserId);
     res.status(200).json(Result) ;
    }
    } catch (ex) {
      res.status(200).json({message: "0:" + ex.message});
    }
});


module.exports = router;


