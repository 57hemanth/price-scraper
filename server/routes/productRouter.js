import express from "express"
import { getProductsDetails, getSingleProductDetails } from "../controllers/productCtrl.js"

const productRouter = express.Router()

productRouter.get("/single", getSingleProductDetails)
productRouter.post("/", getProductsDetails)

export default productRouter