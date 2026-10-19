
const PurchasingInvoiceLogs = Logs.create(
    {
        typeOfInvoice:"Invoices",
        invoice:invoiceID,
        IncomingStock: true,
        ProductId:ProductId,
        Quantity: Quantity,
        PlaceType:PlaceType,
        Place:PlaceTypeID,
        user:userID,
    }
)