import { Module } from '@nestjs/common';
import { RepoModule } from './repository/repository.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module.js';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    RepoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
