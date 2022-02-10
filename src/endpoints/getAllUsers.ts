import { Request, Response } from "express"
import { connection } from "../connection"
import { Purchase, User } from "../types/types"

const getAllUsers = async(req:Request, res:Response):Promise<void> => {
    try {

        const search =  req.query.search

        // const allUsers: User[] = await connection("ecommerce_users")
        //     .select("*")

        // if(!allUsers){
        //     throw new Error("Nenhum usuário cadastrado!")
        // }


        if(search){

            const [purchasesByUser]:Purchase[] = await connection.raw(`
                SELECT U.name, P.name, Pu.quantity, Pu.total_price FROM ecommerce_products as P
                JOIN ecommerce_purchases as Pu ON P.id = Pu.product_id
                JOIN ecommerce_users as U ON U.id = Pu.user_id
                WHERE U.name = "${search}";
                `)

                if(!purchasesByUser){
                    throw new Error("Nenhum usuário cadastrado!")
                }
        
                res.status(200).send(purchasesByUser)
        
        }else{
            const [allUsers]: User[] = await connection.raw(`
            SELECT U.name as pessoa,P.name, Pu.quantity, Pu.total_price FROM ecommerce_products as P
            JOIN ecommerce_purchases as Pu ON P.id = Pu.product_id
            JOIN ecommerce_users as U ON U.id = Pu.user_id;
            `)
            
            if(!allUsers){
            throw new Error("Nenhum usuário cadastrado!")
            }

            res.status(200).send(allUsers)
        }

        // res.status(200).send(allUsers)
        
    } catch (error:any) {
        
        res.status(400).send({message: error.sqlMessage || error.message})
    }
}

export default getAllUsers

