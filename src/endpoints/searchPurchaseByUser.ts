import { Request, Response } from "express"
import { connection } from "../connection"
import { Purchase } from "../types/types"

const searchPurchaseByUser = async(req:Request, res:Response) => {
    try {

        const {user_id} = req.params

        const [purchasesByUser]:Purchase[] = await connection.raw(`
        SELECT U.name, P.name, Pu.quantity, Pu.total_price FROM ecommerce_products as P
        JOIN ecommerce_purchases as Pu ON P.id = Pu.product_id
        JOIN ecommerce_users as U ON U.id = Pu.user_id
        WHERE U.id = "${user_id}";
        `)


        if(!purchasesByUser){
            throw new Error("Nenhum usuário cadastrado!")
        }

        res.status(200).send(purchasesByUser)
        
    } catch (error:any) {
        
        res.status(400).send({message: error.sqlMessage || error.message})
    }
}

export default searchPurchaseByUser