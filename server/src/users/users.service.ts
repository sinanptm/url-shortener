import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(user: User): Promise<User> {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async findOne(userName: string): Promise<User> {
        return await this.userModel.findOne({ userName }).exec();
    }

}
