const { Request } = require("../models/Request");
const mongoose = require('mongoose');


const GetRequestByUser = async (UserId, UserType,pageNo) => {
    const limit = 5;  // Number of documents per page
    const skip = (pageNo - 1) * limit;
    console.log(UserType)
    const Condition = UserType == 'Admin' ? {} : { UserReqId: new mongoose.Types.ObjectId(UserId) };
    console.log(Condition)
    let TotalRecords=await Request.countDocuments(Condition);
    let RequestDetail = await Request.find(Condition).skip(skip).limit(limit).populate('UserReqId', 'name email').exec();
    RequestDetail = RequestDetail.map((x) => ({
        Name: x['UserReqId']['name'],
        Email: x['UserReqId']['email'],
        RequestType: x['RequestType'],
        RequestQuery: x['RequestQuery'],
        RequestTitle: x['RequestTitle'],
        UserReqId: x['UserReqId']['_id'],
        RequestStatus: x['RequestStatus'],
        Response: x['Response'],
        CreatedAt: x['createdAt'],
        modifiedAt: x['modifiedAt'],
        _id: x['_id']
    }))


    return { RequestDetail:RequestDetail,TotalRecord:TotalRecords}
}

const SaveRequest = async (_Request, UserId) => {
    let _RequestModel, NoteResult;
    if (_Request?._id && _Request?._id!='') {
        NoteResult = await Request.updateOne(
            {
                _id: _Request?._id.toString()
            },
            {
                $set: {
                    Response: _Request?.Response,
                    RequestStatus: _Request?.RequestStatus,
                    modifiedAt: Date.now()
                }
            }
        );
        if (NoteResult && NoteResult.modifiedCount > 0) {
            return {
                message: "1:Update Successfully",
                Data: {
                    id: _Request?._id
                }
            };
        } else {
            return {
                message: "0:Update Failed",
                Data: null
            };
        }
    }
    else {
        _RequestModel = new Request({
            RequestQuery: _Request.RequestQuery,
            RequestType: _Request.RequestType,
            RequestTitle: _Request.RequestTitle,
            UserReqId: UserId,
            RequestStatus: "In Process",
            createdAt: Date.now()
        });
        NoteResult = await _RequestModel.save();
        console.log(NoteResult)
        if (NoteResult) {
            return {
                message: "1:Save Success"
            };
        } else {
            return {
                message: "0:Save Failed",
                Data: null
            };
        }
    }

};


module.exports = { GetRequestByUser,SaveRequest }


