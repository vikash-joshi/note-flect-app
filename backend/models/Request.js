


const mongoose=require('mongoose');
const {Schema}=mongoose;

const RequestDetail = new Schema({
    RequestTitle: { type: String, required: true },
    RequestType: { type: String, required: true },
    RequestQuery: { type: String, required: true },
    UserReqId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    RequestStatus:{ type: String },
    Response:{ type: String },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date}

});
    
// Define the Note schema
const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' ,required:true },
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date }
});

const Request = mongoose.model('RequestDetail', RequestDetail);

module.exports = {Request};