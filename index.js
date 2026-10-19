import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from "cors"
import ProductRouter from "./routers/product.router.js"
import inventoryRouter from "./routers/inventory.js"
import purchasingRouter from "./routers/purchasing.router.js"
import siteRouter from "./routers/site.router.js"
import transactRouter from "./routers/transaction.js"
import zoneRouter from "./routers/zone.js"
import usageRouter from "./routers/usage.js"
import user from "./routers/user.js"
import logs from "./routers/logs.js"
import homePage from "./controllers/homePage.controller.js"
import {authMiddleWare} from "./middlewares/checkAuthorization.js"
// ====================== The End Of Import Section =============================
const app = express()
const Port = process.env.PORT
const connection_string = process.env.CONNECTION_STRING

// ======================== The End Of Const Variables ==========================
app.use(cors({
    origin: '*',
    methods:["GET" , "POST" , "PUT" , "DELETE"],
    credentials: true,
    allowedHeaders:["Content-Type" , "Authorization" , "Accept-Language"]
}))
app.use(morgan("tiny"))
app.use(express.json())
app.use(authMiddleWare)
app.get("/",homePage)

app.use("/product",ProductRouter)
app.use("/inventory",inventoryRouter)
app.use("/purchase",purchasingRouter)
app.use("/site" , siteRouter)
app.use("/transact" , transactRouter)
app.use("/zone" , zoneRouter)
app.use("/usage" , usageRouter)
app.use("/logs" , logs)
app.use("/user",user)






// ======================== The End Of middlewares =============================
app.listen(Port, ()=>{})
mongoose.connect(connection_string).then(()=>{})
