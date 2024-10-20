import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, minimize: false, timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  userName: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String })
  token:string;
}

export const UserSchema = SchemaFactory.createForClass(User);
