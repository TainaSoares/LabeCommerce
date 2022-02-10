import { Request, Response } from "express"
import { connection } from "../connection"
import { Product } from "../types/types"

const registerProduct = async(req:Request, res:Response):Promise<void> => {
    try {

        const {name, price, image_url} = req.body

        if(!name || !price){
            throw new Error("Parâmetros inválidos, verifique se 'name'e 'price'  estão sendo passados!")
        }

        const addProduct:Product = {
            id:Date.now().toString(),
            name,
            price,
            image_url
        }

        await connection("ecommerce_products").insert(addProduct)

        res.status(201).send({message: "Produto cadastrado!"})
        
    } catch (error:any) {

        res.status(400).send({message: error.sqlMessage || error.message})
    }

}

export default registerProduct


