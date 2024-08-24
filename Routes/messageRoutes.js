import express from 'express'
import { addMessage } from '../controllers/messageController.js'
import { getMessage } from '../controllers/messageController.js'

const messageRoute =new express.Router();


messageRoute.post("/addmsg", addMessage);
messageRoute.post("/getmsg", getMessage)

export default messageRoute

