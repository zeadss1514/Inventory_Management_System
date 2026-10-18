import express from "express"
import createZone from "../controllers/Zone/createZone.js"
import UpdateZone from "../controllers/Zone/updateZone.js"
import {getZone,getOneZone} from "../controllers/Zone/getZone.js"
import {admin,superAdmin} from "../middlewares/roleAuth.js"

const router = express.Router()

router.post("/",admin,createZone)
router.put("/:zoneID",admin,UpdateZone)
router.get("/",getZone)
router.get("/:zoneID",getOneZone)


export default router