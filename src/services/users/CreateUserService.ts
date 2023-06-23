import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

interface UserResquest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserResquest) {

        if(!email){
            throw new Error("Email incorreto");
        }

        const userAlrearyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(userAlrearyExists){
            throw new Error('User already exists');
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data:{
              name: name,
              email: email,
              password: passwordHash  
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        });

        // gerar um token JWT e devolver os dados do usuario como id name e email
        


        return user;
    }
}

export { CreateUserService };