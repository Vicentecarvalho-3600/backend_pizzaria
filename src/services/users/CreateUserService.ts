import prismaClient from '../../prisma';

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

        const user = await prismaClient.user.create({
            data:{
              name: name,
              email: email,
              password: password  
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return user;
    }
}

export { CreateUserService };