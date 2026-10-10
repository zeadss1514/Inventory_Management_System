import express from "express"
import createUsage from "../controllers/Usage/createUsage.js"
import activateUsage from "../controllers/Usage/activateUsage.js"
import addUsageItem from "../controllers/Usage/addUsageItem.js"
import {getUsage,getOneUsage} from "../controllers/Usage/getUsage.js"

const router = express.Router()

router.get("/",getUsage)
router.get("/:usageID",getOneUsage)
router.post("/",createUsage)
router.post("/:usageID",addUsageItem)
router.post("/:usageID/activate",activateUsage)

export default router