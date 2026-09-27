import Products from "../../models/Products.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

const getProduct = async (req,res) => {
    const products = await Products.find()
    if(!products || products.length === 0){
            return responseReturn(res,false,400,"فشل في إيجاد المنتج ",null)
        }
        return responseReturn(res,true,200,"تم إيجاد المنتج ",products)

}


const getOneProduct = async (req,res) => {
    const {ProductID} = req.params
    const product = await Products.findById(ProductID)
    if(!product){
            return responseReturn(res,false,400,"فشل في إيجاد المنتج ",null)
        }
    return responseReturn(res,true,200,"تم إيجاد المنتج ",product)
}

export {getProduct,getOneProduct}