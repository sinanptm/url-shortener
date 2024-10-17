import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/user.schema";

export type LinkDocument = HydratedDocument<Link>;

@Schema({ versionKey: false, minimize: false, timestamps: true })
export class Link {
    @Prop({ type: String, required: true })
    orgLink: string;

    @Prop({ type: String, required: true, unique:true })
    shortLink: string;

    @Prop({ type: Types.ObjectId, ref: "User" })
    userId: User;

    @Prop({type:Number, default:0})
    click:number;
}

export const LinkSchema = SchemaFactory.createForClass(Link);