import {Injectable} from '@nestjs/common';
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    async save(user: User) {
        return await this.userRepository.save(user);
    }

    async findUser(email: string): Promise<User> {
        return await this.userRepository.findOneBy({email: email});
    }

}
