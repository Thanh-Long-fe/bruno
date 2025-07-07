import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  login(username: string, id: string) {
    const accessToken = this.jwtService.sign({ id, username }, { expiresIn: '7d' });
    return { accessToken };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userModel.findOne({ userName: username });
    if (user && user.password === password) {
      return { id: user._id, username: user.userName };
    }
    return null;
  }

  async getProfile(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: user._id, username: user.userName };
  }
}
