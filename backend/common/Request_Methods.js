const { Request } = require("../models/Request");
const mongoose = require('mongoose');


const GetRequestByUser = async (UserId, UserType) => {
    console.log(UserType)
    const Condition = UserType == 'Admin' ? {} : { UserReqId: new mongoose.Types.ObjectId(UserId) };
    console.log(Condition)
    let RequestDetail = await Request.find(Condition).populate('UserReqId', 'name email').exec();
RequestDetail.forEach((x) => ({
        Name: x['UserReqId']['name'],
        Email: x['UserReqId']['email'],
        RequestType: x['RequestType'],
        RequestQuery: x['RequestQuery'],
        RequestTitle: x['RequestTitle'],
        UserReqId: x['UserReqId'],
        RequestStatus: x['RequestStatus'],
        Response: x['Response'],
        CreatedAt: x['createdAt'],
        modifiedAt: x['modifiedAt'],
        _id: x['_id']
    }))
    return RequestDetail;
}

const SaveRequest = async (_Request, UserId) => {
    let _RequestModel, NoteResult;
    if (!_Request?._id && _Request?._id!='') {
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
        if (UpdateNote && UpdateNote.modifiedCount > 0) {
            return {
                message: "1:Update Successfully",
                Data: {
                    id: _ExistingNote.id
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


