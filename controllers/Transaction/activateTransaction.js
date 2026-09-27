import Transactions from "../../models/Transactions.Models.js"
import Products from "../../models/Products.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"
import mongoose from "mongoose";
// Small helper so any validation failure inside the transaction aborts it.
class TransactError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

const TransactionActivation = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const { transactID } = req.params;
    //const userId = req.auth.userId;

    // if (!req.auth.transact)
    //   return responseReturn(res, false, 400, `هذا المستخدم لا يمكنه اجراء تنقلات`, null);

    let activated;

    // withTransaction commits on success and aborts on any thrown error.
    await session.withTransaction(async () => {
      const transact = await Transactions.findOne({ _id: transactID })
        .populate("TransactedTo")
        .populate("TransactedFrom")
        .session(session);

      if (!transact) throw new TransactError(`بيان النقل غير موجود`);
      //if (transact.user.toString() !== userId)
        // throw new TransactError(`فشل في ايجاد الفاتورة`);
      if (transact.Activated) throw new TransactError(`الفاتورة مفعلة بالفعل`);

      const from = transact.TransactedFrom;
      const to = transact.TransactedTo;

      if (!from || !to || !from.active || !to.active)
        throw new TransactError(
          `فشل النقل برجاء التأكد من أن جميع المواقع يمكن النقل منها`
        );

      // constructor of a populated doc is its Model
      const FromModel = from.constructor;
      const ToModel = to.constructor;

      // ---- 1) validate everything first, write nothing yet ----
      for (const item of transact.TransactedItems) {
        const fromEntry = from.inSiteProducts?.find(
          (p) => p.productId.toString() === item.ProductId.toString()
        );

        const minStock = fromEntry?.minStock ?? 0;
        if (!fromEntry || fromEntry.stock - item.Quantity < minStock)
          throw new TransactError(
            `هذا المنتج غير موجود بالمخزن او المخزون الموجود غير كافي`
          );

        const toEntry = to.inSiteProducts?.find(
          (p) => p.productId.toString() === item.ProductId.toString()
        );
        if (toEntry && toEntry.stock + item.Quantity > toEntry.maxStock && toEntry.maxStock != 0 )
          throw new TransactError(
            `مساحة التخزين الموجودة غير كافية برجاء زيادة مساحة التخزين أو تقليل الكمية المنقولة`
          );
      }

      // ---- 2) apply the writes ----
      for (const item of transact.TransactedItems) {
        const fromEntry = from.inSiteProducts.find(
          (p) => p.productId.toString() === item.ProductId.toString()
        );
        const minStock = fromEntry?.minStock ?? 0;

        // guard in the filter itself, so a concurrent request can't oversell
        const dec = await FromModel.updateOne(
          {
            _id: from._id,
            inSiteProducts: {
              $elemMatch: {
                productId: item.ProductId,
                stock: { $gte: item.Quantity + minStock },
              },
            },
          },
          { $inc: { "inSiteProducts.$.stock": -item.Quantity } },
          { session }
        );

        if (dec.modifiedCount === 0)
          throw new TransactError(
            `هذا المنتج غير موجود بالمخزن او المخزون الموجود غير كافي`
          );

        const inc = await ToModel.updateOne(
          { _id: to._id, "inSiteProducts.productId": item.ProductId },
          { $inc: { "inSiteProducts.$.stock": item.Quantity } },
          { session }
        );

        if (inc.matchedCount === 0) {
          const pushed = await ToModel.updateOne(
            { _id: to._id, "inSiteProducts.productId": { $ne: item.ProductId } },
            {
              $push: {
                inSiteProducts: {
                  productId: item.ProductId, // note: same key used everywhere
                  stock: item.Quantity,
                },
              },
            },
            { session }
          );
          if (pushed.matchedCount === 0)
            throw new TransactError(`مخزن الاستلام غير موجود`);
        }
      }

      transact.Activated = true;
      await transact.save({ session });
      activated = transact;
    });

    return responseReturn(res, true, 201, `تم تفعيل الفاتورة`, activated);
  } catch (err) {
    if (err instanceof TransactError)
      return responseReturn(res, false, err.status, err.message, null);
    return errorCaught(res, err);
  } finally {
    await session.endSession();
  }
};

export default TransactionActivation
