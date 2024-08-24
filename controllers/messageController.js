import messageModel from "../models/messageModels.js";

export const addMessage = async (req,res,next)=>{
    try {
        const {from , to, message} = req.body;
        const createMsg = await messageModel.create({
            message :{
                text : message,
            },
            users :[from, to],
            sender : from
        })
        if(!createMsg){
           return  res.json({message: "adding message is failed"})
        }
        return res.json({
            message: "message added successfully"
        })
    } catch (error) {
        next(error)
    }
}
export const getMessage = async (req,res,next)=>{
    try {
        const {from ,to} = req.body;
        const msgs = await messageModel.find({
            users:{$all : [from ,to]}
            
        }).sort({updatedAt : 1})

        const arrayOfSendReceive = msgs.map(msg => {
            return ({
                fromSelf : msg.sender.toString() === from,
                message : msg.message.text
            })
        })
        return res.json(arrayOfSendReceive)
    } catch (error) {
        next(error)
    }
}
