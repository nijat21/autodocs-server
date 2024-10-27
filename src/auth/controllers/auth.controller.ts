import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SignupDto } from '../dtos/signup.dto.js';
import { AuthService } from '../services/auth.service.js';
import { LoginDto } from '../dtos/login.dto.js';
import { JwtAuthGuard } from '../services/auth.guard.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto): Promise<{ token: string }> {
    return this.authService.register(signupDto);
  }

  @Post('login')
  login(@Body() LoginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.enter(LoginDto);
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  verifyToken(@Request() req): { valid: boolean } {
    return { valid: true };
  }
}
