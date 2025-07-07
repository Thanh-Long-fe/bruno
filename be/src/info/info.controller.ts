import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { PersonsService } from './info.service';
import { CreatePersonDto } from './dto/create-info.dto';
import { UpdatePersonDto } from './dto/update-info.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  create(@Body() dto: CreatePersonDto) {
    return this.personsService.create(dto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.personsService.findAll(+page, +limit);
  }

  @Put('update-result')
  updateResult(@Body() dto: { result: string }) {
    return this.personsService.updateResult(dto.result);
  }

  @Get('result/find/:code')
  getResult(@Param('code') code: string) {
    return this.personsService.getResult(code);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePersonDto) {
    return this.personsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(id);
  }
}
