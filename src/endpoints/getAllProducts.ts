import { Request, Response } from "express"
import { connection } from "../connection"
import { Product} from "../types/types"

const getAllProducts = async(req:Request, res:Response):Promise<void> => {
    try {
        const search = req.query.search || "%"

        const sort = req.query.sort === "id"?"id":"name"
        const order = req.query.order === "DESC" ? "DESC" :"ASC"

        
        const allProducts: Product[] = await connection("ecommerce_products")
            .select("*")
            .where("name", "LIKE", `${search}`)
            .orderBy(sort,order)

        if(!allProducts){
            throw new Error("Nenhum produto cadastrado!")
        }

        res.status(200).send(allProducts)
        
    } catch (error:any) {
        
        res.status(400).send({message: error.sqlMessage || error.message})
    }
}

export default getAllProducts