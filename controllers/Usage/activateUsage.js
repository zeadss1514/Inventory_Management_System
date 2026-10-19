import Usage from "../../models/Usage.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"
import mongoose from "mongoose"
import Logs from "../../models/Logs.Models.js"

class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

const activateUsage = async (req, res) => {
  const { usageID } = req.params
  const {id} = req.auth
  const doUsage = req.auth.Usage
  if(!id || !doUsage) return responseReturn(res,false,400,`لا يمكنك انشاء الأستهلاك`,null)
  if (!mongoose.isValidObjectId(usageID)) {
    return responseReturn(res, false, 400, `رقم الفاتورة غير صالح`, null)
  }
  const logs = []
  const session = await mongoose.startSession()
  
  try {
    let activated
    
    await session.withTransaction(async () => {
      const usage = await Usage.findById(usageID).session(session)
      
      if (!usage) throw new HttpError(400, `هذة الفاتورة غير موجوده`)
        if(String(usage.user) != String(id)) throw new HttpError(400, `هذة الفاتورة لا يمكنك التعديل عليها`)
        if (usage.Activated) throw new HttpError(400, `هذة الفاتورة مفعله بالفعل`)
          if (!usage.UsageItems || usage.UsageItems.length < 1) {
            throw new HttpError(400, `هذة الفاتورة لا يوجد بها منتجات`)
          }
          
          // Get the model from the stored model name (no populate needed)
          const TargetModel = mongoose.model(usage.useageFromType)
      const targetId = usage.useageFrom
      for (const item of usage.UsageItems) {
        const { ProductId, Quantity } = item

        if (!Quantity || Quantity <= 0) {
          throw new HttpError(400, `كمية غير صالحة`)
        }

        // Deduct only if the product exists on the site AND has enough stock
        const result = await TargetModel.updateOne(
          {
            _id: targetId,
            inSiteProducts: {
              $elemMatch: { productId: ProductId, stock: { $gte: Quantity } },
            },
          },
          { $inc: { "inSiteProducts.$.stock": -Quantity } },
          { session }
        )

        if (result.matchedCount === 0) {
          throw new HttpError(400, `المخزون غير كافي للمنتج ${ProductId}`)
        }
  logs.push({
            typeOfInvoice:"Usage",
            invoice:usageID,
            IncomingStock: false,
            ProductId:ProductId,
            Quantity: Quantity,
            PlaceType:usage.useageFromType,
            Place:targetId,
            user:id,
        },)

      }

      usage.Activated = true
      await usage.save({ session })
      await Logs.insertMany(logs, { session })
      activated = usage
    })

    return responseReturn(res, true, 201, `تم تفعيل الفاتورة`, activated)
  } catch (err) {
    if (err instanceof HttpError) {
      return responseReturn(res, false, err.status, err.message, null)
    }
    return errorCaught(res, err)
  } finally {
    session.endSession()
  }
}

export default activateUsage