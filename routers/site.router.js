import express from "express"
import {getSite,getOneSite} from "../controllers/Site/getSite.js"
import createSite from "../controllers/Site/createSite.js"
//import updateSite from "../controllers/Site/updateSite.js"
import addSiteProduct from "../controllers/Site/addSiteProduct.js"
import updateSite from "../controllers/Site/updateSite.js"

const router = express.Router()

router.post("/",createSite)
router.get("/",getSite)
router.post("/:siteID",addSiteProduct)
router.get("/:siteID",getOneSite)
router.put("/:siteID",updateSite)


export default router