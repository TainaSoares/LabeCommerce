import { Request, Response } from "express"
import { connection } from "../connection"
import { Product, Purchase, User } from "../types/types"

const registerPurchase = async(req:Request, res:Response):Promise<void> => {
    try {

        const {user_id, product_id, quantity} = req.body

        if(!user_id || !product_id || !quantity){
            throw new Error("Parâmetros inválidos, verifique se 'user_id', 'product_id' e 'quantity'  estão sendo passados!")
        }

        const [user]:User[] = await connection("ecommerce_users")
            .select()
            .where({id:user_id})


        if(!user){
            throw new Error("Usuário não encontrado!")
        }

        const [product]:Product[] = await connection("ecommerce_products")
            .select()
            .where({id:product_id})



        if(!product){
            throw new Error("Produto não encontrado!")
        }

        const total_price = product.price * quantity

        const purchase:Purchase = {
            id:Date.now().toString(),
            user_id,
            product_id,
            quantity,
            total_price
        }

        await connection("ecommerce_purchases").insert(purchase)

        res.status(200).send({message: "Compra registrada!"})
        
    } catch (error:any) {

        res.status(400).send({message: error.sqlMessage || error.message})
    }

}

export default registerPurchase
