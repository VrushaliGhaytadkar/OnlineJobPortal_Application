import express from "express";

import userAuth from "../middleware/authMiddleware.js";
import { updateUserController, getUserController } from "../controllers/userController.js";

//router object

const router = express.Router()

//routes
//get Users || Get
router.post('/getUser', userAuth, getUserController)

//update user

router.put('/updateUser', userAuth, updateUserController)



export default router