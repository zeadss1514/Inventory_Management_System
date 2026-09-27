import express from "express"
import createInventory from "../controllers/inventory/createInventory.js"
import addInventoryProduct from "../controllers/inventory/addInventoryProduct.js"
import updateInventory from "../controllers/inventory/updateInventory.js"
import {getAllInventories,getOneInventory} from "../controllers/inventory/getinventory.js"



const router = express.Router()

router.get("/",getAllInventories)
router.get("/:inventoryID",getOneInventory)
router.post("/",createInventory)
// add inventory product make sure to add the admin restriction later 
router.post("/:inventoryID",addInventoryProduct)
router.put("/:id",updateInventory)

export default router