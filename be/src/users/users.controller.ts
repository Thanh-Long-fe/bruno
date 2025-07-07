import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dto/loginDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: any) {
    return this.usersService.login(req.user._id, req.user.userName);
  }

  @Get('profile')
  getProfile(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }
}
