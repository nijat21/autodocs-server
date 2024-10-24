import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from '../dtos/signup.dto.js';
import { AuthService } from '../services/auth.service.js';
import { LoginDto } from '../dtos/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signupDto: SignupDto): Promise<{ token: string }> {
    return this.authService.register(signupDto);
  }

  @Post('/login')
  login(@Body() LoginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.enter(LoginDto);
  }
}
