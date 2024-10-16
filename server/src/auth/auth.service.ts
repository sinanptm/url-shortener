import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthInputDto } from './auth-input.dto';
import { CreateUserDto } from 'src/users/create-user.dto';

type SigninData = { userName: string, _id: string; };
type AuthResult = { accessToken: string; _id: string; userName: string; };

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async authenticate(input: AuthInputDto): Promise<AuthResult> {
        const user = await this.validateUser(input);

        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            accessToken: "fake-one",
            ...user
        };
    }

    async register(input: CreateUserDto): Promise<SigninData> {
        const existingUser = await this.usersService.findOne(input.userName);
        if (existingUser) {
            throw new ConflictException('Username already taken');
        }

        const createdUser = await this.usersService.create(input);
        return {
            _id: createdUser._id.toString(),
            userName: createdUser.userName,
        };
    }

    private async validateUser(input: AuthInputDto): Promise<SigninData | null> {
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
