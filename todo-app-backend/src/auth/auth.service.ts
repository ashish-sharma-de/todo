import {Injectable, Logger} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(private userService: UserService,
                private jwtService: JwtService,
    ) {
    }

    async validateCredentials(email: string, password: string): Promise<any> {
        const user = await this.userService.findUser(email);
        if (!user) {
            this.logger.log(`User not found for email: ${email}`);
            return null;
        }
        if (user && await bcrypt.compare(password, user.password)) {
            const {password, ...result} = user;
            this.logger.log(`Login successful for user: ${email}`);
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user.userId};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
