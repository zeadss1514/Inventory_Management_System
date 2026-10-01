import express from "express"
import createZone from "../controllers/Zone/createZone.js"
import UpdateZone from "../controllers/Zone/updateZone.js"
import {getZone,getOneZone} from "../controllers/Zone/getZone.js"
const router = express.Router()

router.post("/",createZone)
router.put("/:zoneID",UpdateZone)
router.get("/",getZone)
router.get("/:zoneID",getOneZone)


export default router