import express from "express"
import productRouter from "./routes/productRouter.js"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/products", productRouter)

app.listen(5000, () => {
    console.log("Server is running...")
})