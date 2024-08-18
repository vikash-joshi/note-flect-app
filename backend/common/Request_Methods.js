const { Request } = require("../models/Request");
const mongoose = require('mongoose');


const GetRequestByUser=async(UserId,UserType)=>{
    const Condition=UserType == 'Admin' ? {}:{UserReqId:new mongoose.Types.ObjectId(UserId)};
    let RequestDetail =  await Request.find(Condition).populate('UserReqId', 'name email').exec();
    return RequestDetail.map((x)=>({
        Name:x['UserReqId']['name'],
        Email:x['UserReqId']['email'],
        RequestType:x['RequestType'],
        RequestQuery:x['RequestQuery'],
        RequestTitle:x['RequestTitle'],
        UserReqId:x['UserReqId'],
        RequestStatus:x['RequestStatus'],
        Response:x['Response'],
        CreatedAt:x['createdAt'],
        modifiedAt:x['modifiedAt'],
        _id:['_id']
    }));
}


module.exports = { GetRequestByUser }


