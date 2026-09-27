import express from "express"
//import {admin , superAdmin} from "../middlewares/roleAuth.js"
import createProduct from "../controllers/Product/createProduct.js"
import {getProduct,getOneProduct} from "../controllers/Product/getProduct.js"
import UpdateProduct from "../controllers/Product/updateProduct.js" 
const router = express.Router()


router.post("/",createProduct)
router.get("/",getProduct)
router.get("/:ProductID",getOneProduct)
router.put("/:ProductID",UpdateProduct)



export default router