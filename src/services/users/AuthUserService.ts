import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';

interface AuthResquest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthResquest) {
        
        //verificar se o email existe.
        const user = await prismaClient.user.findFirst({
            where: {
                email:email
            }
        })

        if(!user){
            throw new Error("User/Password incorrect")
        }

        // verificar se senha que senha que ele mandou esta correta.

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("User/password incorrect")
        }

        // gerar token JWT e Devolver os Dados do Usuario com id name e email

        return { ok: true }
    }
}

export { AuthUserService };