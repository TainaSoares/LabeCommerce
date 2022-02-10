import { Request, Response } from "express"
import app from "./app"
import getAllProducts from "./endpoints/getAllProducts"
import getAllUsers from "./endpoints/getAllUsers"
import registerProduct from "./endpoints/registerProduct"
import registerPurchase from "./endpoints/registerPurchase"
import searchPurchaseByUser from "./endpoints/searchPurchaseByUser"
import singUp from "./endpoints/singUp"

//Endpoint de teste
app.get("/", (req:Request, res:Response) => {
    res.send("Hello world!!")
})

//USUÁRIO
app.get("/users", getAllUsers)
app.post("/users", singUp)

//PRODUTO
app.get("/products", getAllProducts)
app.post("/products", registerProduct)

//Registro da compra
app.get("/users/:user_id/purchases",searchPurchaseByUser )
app.post("/purchases",registerPurchase)
