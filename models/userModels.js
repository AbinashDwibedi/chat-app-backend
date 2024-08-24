import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true ,
        unique: true,
        min : 3
    },
    password: {
        type :String,
        required: true,
        min: 8,
    },
    email: {
        type : String,
        required : true,
        unique: true,
    },
    setAvatarImage :{
        type: String,
        default: "",
    },
    isAvatarImageSet:{
        type: Boolean,
        default: false
    }
})

const mongoSchema = mongoose.model('User' , schema);
export default mongoSchema
