import mongoose from "mongoose"
import Logs from "../../models/Logs.Models.js"
import Invoices from "../../models/Purchasing.Models.js"
import { responseReturn, errorCaught } from "../../helpers/response.helpers.js"

class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

const activateInvoice = async (req, res) => {

  const {id,Purchase} = req.auth
  if(!id || !Purchase) return responseReturn(res,false,400,`لا يمكنك تعديل فاتورة الشراء`,null)
  const { invoiceId } = req.params

  if (!mongoose.isValidObjectId(invoiceId)) {
    return responseReturn(res, false, 400, `رقم الفاتورة غير صالح`, null)
  }

  const session = await mongoose.startSession()
  const logs = []

  try {
    let activated

    await session.withTransaction(async () => {
      const invoice = await Invoices.findById(invoiceId).session(session)

      if (!invoice) throw new HttpError(400, `هذة الفاتورة غير موجوده`)
      if(!(String(invoice.user) === String(id)))throw new HttpError(400, `هذة الفاتورة لا يمكنك التعديل عليها`)
      if (invoice.Activated) throw new HttpError(400, `هذة الفاتورة مفعله بالفعل`)
      if (!invoice.InvoiceItems || invoice.InvoiceItems.length < 1) {
        throw new HttpError(400, `هذة الفاتورة لا يوجد بها منتجات`)
      }

      // Resolve the target model (works with both ref and refPath)
      const pathOpts = Invoices.schema.path("purchasedTo").options
      const modelName =
        (pathOpts.refPath && invoice.get(pathOpts.refPath)) ||
        (typeof pathOpts.ref === "string" ? pathOpts.ref : null)

      if (!modelName) {
        throw new HttpError(400, `لا يمكن تحديد مكان الفاتورة`)
      }

      const TargetModel = mongoose.model(modelName)
      const targetId = invoice.purchasedTo

      for (const item of invoice.InvoiceItems) {
        const { ProductId, Quantity } = item

        if (!Quantity || Quantity <= 0) {
          throw new HttpError(400, `كمية غير صالحة`)
        }

        // Product already exists on the site: increase its stock
        const result = await TargetModel.updateOne(
          { _id: targetId, "inSiteProducts.productId": ProductId },
          { $inc: { "inSiteProducts.$.stock": Quantity ,
            "inSiteProducts.$.TotalQuantity": Quantity 
          } },
          { session }
        )

        // Product not on the site yet: add it
        if (result.matchedCount === 0) {
          const pushResult = await TargetModel.updateOne(
            { _id: targetId },
            { $push: { inSiteProducts: { productId: ProductId, stock: Quantity } } },
            { session }
          )

          if (pushResult.matchedCount === 0) {
            throw new HttpError(400, `الموقع غير موجود`)
          }
        }
  logs.push({
            typeOfInvoice:"Invoices",
            invoice:invoiceId,
            IncomingStock: true,
            ProductId:ProductId,
            Quantity: Quantity,
            PlaceType:invoice.purchaseToType,
            Place:targetId,
            user:id,
        },)
      }

      invoice.Activated = true
      await invoice.save({ session })
      await Logs.insertMany(logs, { session })
      activated = invoice
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

export default activateInvoice