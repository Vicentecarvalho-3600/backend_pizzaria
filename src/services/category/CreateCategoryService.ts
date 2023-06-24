import prismaClient from "../../prisma";

interface CategoryResquast{
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CategoryResquast) {

        if(name === ''){
            throw new Error('Name invalid')
        }

        const category = await prismaClient.category.create({
            data:{
                name: name,
            },
            select: {
                id: true,
                name: true
            }
        })

        return category;

        
    }
}

export { CreateCategoryService };