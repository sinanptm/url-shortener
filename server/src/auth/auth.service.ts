import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

export type AuthInput = { userName: string; password: string; };
type SigninData = { userName: string, _id: string; };
type AuthResult = { accessToken: string; _id: string; userName: string; };

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async authenticate(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateUser(input);

        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            accessToken: "fake-one",
            ...user
        };
    }

    async validateUser(input: AuthInput): Promise<SigninData | null> {
        const user = await this.usersService.findOne(input.userName);

        if (user && user.password === input.password) {
            return {
                _id: user._id.toString(),
                userName: user.userName
            };
        }

        return null;
    }
}
