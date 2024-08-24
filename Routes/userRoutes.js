import express from "express";
import {register} from '../controllers/userController.js'
import {login} from '../controllers/userController.js'
import {avatar} from '../controllers/userController.js'
import { allUsers } from "../controllers/userController.js";
const router = new express.Router();

router.post('/register' , register)
router.post('/login' , login)
router.post('/setAvatar/:id',avatar)
router.get('/allUsers/:id' , allUsers)

export default router

