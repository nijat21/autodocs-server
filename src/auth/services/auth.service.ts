import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema.js';
import { SignupDto } from '../dtos/signup.dto.js';
import { LoginDto } from '../dtos/login.dto.js';
import { UserType } from '../types/user.type.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(signupDto: SignupDto): Promise<UserType> {
    const { name, email, password, imgUrl } = signupDto;
    const userFound = await this.userModel.findOne({ email });
    if (userFound) {
      throw new ConflictException(
        'Email is already associated with an account',
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPass,
      imgUrl,
    });
    const token = this.jwtService.sign({ id: user._id });
    const payload = {
      token: token,
      name: user.name,
      email: user.email,
      imgUrl: user.imgUrl,
    };
    return payload;
  }

  async enter(loginDto: LoginDto): Promise<UserType> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Email is not registered');
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) throw new UnauthorizedException('Invalid password');
    // If authenticated, return token
    const token = this.jwtService.sign({
      id: user._id,
    });
    const payload = {
      token: token,
      name: user.name,
      email: user.email,
      imgUrl: user.imgUrl,
    };
    return payload;
  }
}
