import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema.js';
import { SignupDto } from '../dtos/signup.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ token: string }> {
    const { name, email, password, imgUrl } = signupDto;

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPass,
      imgUrl,
    });

    const token = this.jwtService.sign({
      id: user._id,
      name: user.name,
      email: user.email,
      imgUrl: user.imgUrl,
    });

    return { token };
  }
}
