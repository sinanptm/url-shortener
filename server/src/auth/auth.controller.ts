import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService, SigninData } from './auth.service';
import { AuthInputDto } from './dto/auth-input.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() input: AuthInputDto): Promise<{accessToken:string}> {
    return this.authService.authenticate(input);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() input: CreateUserDto): Promise<SigninData> {
    return this.authService.register(input);
  }

  @UseGuards(AuthGuard)
  @Get("me")
  getUserProfile(@Request() req){
    return req.user;
  }
}
