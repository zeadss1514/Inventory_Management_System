import {responseReturn,errorCaught} from "../helpers/response.helpers.js"
import Invoices from "../models/Purchasing.Models.js"
import Transactions from "../models/Transactions.Models.js"
import UsageModels from "../models/Usage.Models.js"


const homeLink = async (req,res)=>{

        const invoices = await Invoices.find({ Activated: true }).sort({ created_at: -1 }).limit(5).populate("purchasedTo");
        const transactions = await Transactions.find({ Activated: true }).sort({ created_at: -1 }).limit(5).populate(["TransactedTo","TransactedFrom"])
        const usages = await UsageModels.find({ Activated: true }).sort({ created_at: -1 }).limit(5).populate("useageFrom")
    return responseReturn(res,true,200,"تم إيجاد",[invoices,transactions,usages])   
}

export default homeLink