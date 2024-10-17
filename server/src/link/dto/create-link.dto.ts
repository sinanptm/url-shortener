import { IsNotEmpty, IsString } from "class-validator";

export class CreateLinkDto {
    @IsString()
    @IsNotEmpty()
    orgLink:string;

    @IsString()
    @IsNotEmpty()
    userId:string;
}