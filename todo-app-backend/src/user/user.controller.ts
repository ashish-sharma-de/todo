import {Body, Controller, Post, Request} from "@nestjs/common";
import {UserService} from "./user.service";
import * as bcrypt from 'bcryptjs';
import {User} from "./user.entity";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('register')
    async save(@Body() user: User) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        return await this.userService.save(user)
    }


}