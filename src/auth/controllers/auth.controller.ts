import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from '../dtos/signup.dto.js';
import { AuthService } from '../services/auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  singup(@Body() signupDto: SignupDto): Promise<{ token: string }> {
    return this.authService.signup(signupDto);
  }
}
