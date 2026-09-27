import express from "express"
import createPurchaseInvoice from "../controllers/purchasing/createPurchasing.js"
import addPurchaseItem from "../controllers/purchasing/addPurchaseItems.js"
import activateInvoice from "../controllers/purchasing/activateInvoice.js"
import {getInvoice,getOneInvoice} from "../controllers/purchasing/getinvoice.js"
const router = express.Router()

router.post("/",createPurchaseInvoice)
router.post("/:invoiceId",addPurchaseItem)
router.post("/:invoiceId/activate",activateInvoice)
router.get("/",getInvoice)
router.get("/:invoiceId",getOneInvoice)

export default router