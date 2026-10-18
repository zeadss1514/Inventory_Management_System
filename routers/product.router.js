import express from "express"
//import {admin , superAdmin} from "../middlewares/roleAuth.js"
import createProduct from "../controllers/Product/createProduct.js"
import {getProduct,getOneProduct,getSiteProduct,getInventoryProduct} from "../controllers/Product/getProduct.js"
import UpdateProduct from "../controllers/Product/updateProduct.js" 
import {admin,superAdmin} from "../middlewares/roleAuth.js"

const router = express.Router()


router.post("/",admin,createProduct)
router.get("/",getProduct)
router.get("/site/:siteID",getSiteProduct)
router.get("/inventory/:inventoryID",getInventoryProduct)

router.get("/:ProductID",getOneProduct)
router.put("/:ProductID",UpdateProduct)



export default router