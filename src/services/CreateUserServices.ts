import Users from '../models/Users';
import { getRepository } from 'typeorm';
interface Request {
    name: String;

    email: String;

    password: String;
}
class CreateUserServices {
    public async execute({ name, email, password }: Request): Promise<Users> {
        const usersRepository = getRepository(Users);

        const checkUserExist = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExist) {
            throw new Error('Email address already used');
        }

        const user = await usersRepository.create({
            name,
            email,
            password,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserServices;
