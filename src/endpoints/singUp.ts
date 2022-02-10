import { Request, Response } from "express";
import { connection } from "../connection";
import { User } from "../types/types";

const singUp = async(req:Request, res:Response):Promise<void> => {

    try {

        const {name, email, password} = req.body

        if(!name || !email || !password){
            throw new Error("Parâmetros inválidos, verifique se 'name', 'email' e 'password' estão sendo passados!")
        }

        const [alreadyEmail] = await connection("ecommerce_users")
            .where({email})
        
        if(alreadyEmail){
            throw new Error("Já cadastrado!")
        }

        const user: User = {
            id: Date.now().toString(),
            name,
            email,
            password
        }

        await connection("ecommerce_users").insert(user)

        res.status(201).send({message: "Usuário cadastrado!"})
        
    } catch (error:any) {
        
        res.status(400).send({message: error.sqlMessage || error.message})
    }

}

export default singUp