import { Module } from '@nestjs/common';
import { PersonsService } from './info.service';
import { PersonsController } from './info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './entities/info.entity';
import { JwtStrategy } from 'src/users/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    PassportModule
  ],

  controllers: [PersonsController],
  providers: [PersonsService, JwtStrategy],
})
export class InfoModule { }
