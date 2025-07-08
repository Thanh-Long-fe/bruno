import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || "mongodb+srv://longntph46034:longkk123@cluster0.dqdlrd9.mongodb.net/nestdb?retryWrites=true&w=majority&appName=Cluster0"),
    UsersModule,
    InfoModule,
  ],
})
export class AppModule {}
