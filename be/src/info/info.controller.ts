import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { PersonsService } from './info.service';
import { CreatePersonDto } from './dto/create-info.dto';
import { UpdatePersonDto } from './dto/update-info.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreatePersonDto) {
    return this.personsService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.personsService.findAll(+page, +limit);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update-result')
  updateResult(@Body() dto: { result: string }) {
    return this.personsService.updateResult(dto.result);
  }

  @Get('result/find/:code')
  getResult(@Param('code') code: string) {
    return this.personsService.getResult(code);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePersonDto) {
    return this.personsService.update(id, dto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(id);
  }
}
