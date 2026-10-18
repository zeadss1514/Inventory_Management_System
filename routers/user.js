import express from "express"
import CreateUser from "../controllers/User/createUser.js"
import {LoginFunc} from "../controllers/User/login.js"
import {admin,superAdmin} from "../middlewares/roleAuth.js"

const router = express.Router()

router.post("/",admin,CreateUser)
router.post("/login",LoginFunc)

export default router