import { IsNotEmpty, IsString } from 'class-validator';

export class AuthInputDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}