import express from "express"
import {getAllLogs,Product,ProducSite} from "../controllers/logs/getLogs.js"

const router = express.Router()

router.get("/",getAllLogs)
router.get("/:ProductId",Product)
router.get("/:ProductId/:SiteId",ProducSite)

export default router