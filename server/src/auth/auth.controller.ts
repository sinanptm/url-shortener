import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResult } from './auth.types';
import { AuthInputDto } from './auth-input.dto';
import { CreateUserDto } from 'src/users/create-user.dto';
import { SigninData } from './auth.types';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() input: AuthInputDto): Promise<AuthResult> {
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
