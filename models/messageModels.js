import mongoose, { mongo }  from "mongoose";
const messageSchema = new mongoose.Schema({
    message :{
        text : {
            type: String,
            required: true,

        }
    },
    users :[],
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    
},{timestamps:true})
const messageModel = mongoose.model('message' , messageSchema);
export default messageModel
