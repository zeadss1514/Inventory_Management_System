import express from "express"
import {getTransact,getOneTransac} from "../controllers/Transaction/getTransactions.js"
import createTransactions from "../controllers/Transaction/createTransaction.js"
import addTransactionItem from "../controllers/Transaction/addTransactionItem.js"
import TransactionActivation from "../controllers/Transaction/activateTransaction.js"
const router = express.Router()

router.get("/",getTransact)
router.get("/:transactionID",getOneTransac)
router.post("/",createTransactions)
router.post("/:transactID",addTransactionItem)
router.post("/:transactID/activate",TransactionActivation)

export default router