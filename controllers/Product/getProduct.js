import Products from "../../models/Products.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"
import Sites from "../../models/Sites.Models.js"
import Inventories from "../../models/Inventories.Models.js"
import mongoose from "mongoose"
const getProduct = async (req,res) => {
    const products = await Products.find()
    if(!products || products.length === 0){
            return responseReturn(res,false,400,"فشل في إيجاد المنتج ",null)
        }
        return responseReturn(res,true,200,"تم إيجاد المنتج ",products)
}
const getOneProduct = async (req,res) => {
    const {ProductID} = req.params
    const productId = new mongoose.Types.ObjectId(ProductID)
    const product = await Products.findById(ProductID)
    if(!product){
            return responseReturn(res,false,400,"فشل في إيجاد المنتج ",null)
        }
    const pipeline = [
        { $match: { "inSiteProducts.productId": productId } },
        {
            $project: {
                name: 1,
                inSiteProducts: {
                    $filter: {
                        input: "$inSiteProducts",
                        as: "item",
                        cond: { $eq: ["$$item.productId", productId] }
                    }
                }
            }
        }
    ]

    const [sites, inventories] = await Promise.all([
        Sites.aggregate(pipeline),
        Inventories.aggregate(pipeline)
    ])

    return responseReturn(res,true,200,"تم إيجاد المنتج ",{"product":product,"sites":sites,"inventories":inventories})
}

const getSiteProduct = async(req,res)=>{
    const {siteID} = req.params
    const site = await Sites.findOne({_id:siteID}).populate("inSiteProducts.productId")
    if(!site){return responseReturn(res,false,400,"فشل في إيجاد المنتج ",null)}
    if(site.inSiteProducts.lenght === 0)
    {return responseReturn(res,false,400,"فشل في ايجاد المنتج ",null)}
    return responseReturn(res,true,200,"تم إيجاد المنتج ",site.inSiteProducts)
}
const getInventoryProduct = async(req,res)=>{
    const {inventoryID} = req.params
    const inventory = await Inventories.findOne({_id:inventoryID}).populate("inSiteProducts.productId")
    if(!inventory){return responseReturn(res,false,400,"فشل في إيجاد المنتج ",null)}
    if(inventory.inSiteProducts.lenght === 0)
    {return responseReturn(res,false,400,"فشل في ايجاد المنتج ",null)}
    return responseReturn(res,true,200,"تم إيجاد المنتج ",inventory.inSiteProducts)
}
export {getProduct,getOneProduct,getSiteProduct,getInventoryProduct}