import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; 
import { User, UserDocument } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findByUserName(userName: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ userName }).exec();
  }
}
