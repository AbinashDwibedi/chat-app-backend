import User from "../models/userModels.js"
import bcrypt from 'bcrypt'


export const register = async (req, res, next)=>{
    try {
        const {userName , password ,email} = req.body
    const userNameCheck = await User.findOne({userName});
    if(userNameCheck){
        return res.json({msg: "username already exists" , status: false})
    }
    const emailCheck= await User.findOne({email});
    if(emailCheck){
        return res.json({msg:"email already exists" , status : false})
    }
    const hashedPassword =await bcrypt.hash(password , 10);
    const user = await User.create({
        userName,
        email ,
        password: hashedPassword
    });
    delete user.password 
    return res.json({user , status: true})
    } catch (error) {
        next(error)
    }
}
export const login = async (req, res, next)=>{
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName});
        if(!user){
            return res.json({status: false , msg: "user name not exist"})
        }
        const hashedPassword = user.password;
        const comparePassword = await bcrypt.compare(password , hashedPassword)
        if(!comparePassword){
            return res.json({status :false , msg: "wrong password try again"})
        }
        delete user.password;
        return res.json({status: true , user}) 
    } catch (error) {
        next(error)
    }
}
export const avatar = async (req,res,next)=>{
    try {
        const userId = req.params.id;
        const userImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId , {
            setAvatarImage : userImage,
            isAvatarImageSet : true
        })
        
        return res.json({isSet: true , image : userData.setAvatarImage});
    } catch (error) {
        next(error)
    }
}
export const allUsers = async (req, res, next) =>{
    try {
        const user = await User.find({_id: {$ne : req.params.id}}).select([
            "userName",
            "email",
            "setAvatarImage",
            "_id"
        ])
        return res.json(user);
    } catch (error) {
        next(error)
    }
}