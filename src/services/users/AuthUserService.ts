import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthResquest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthResquest) {

        //verificar se o email existe.
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("User/Password incorrect")
        }

        // verificar se senha que senha que ele mandou esta correta.

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("User/password incorrect")
        }

        // se deu tudo certo vamos gerar o token para usuario

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "30d"
            }
        );

        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService };