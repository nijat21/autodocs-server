import { Module } from '@nestjs/common';
import { RepoService } from './services/repository.service.js';
import { RepoController } from './controllers/repository.controller.js';

@Module({
  controllers: [RepoController],
  providers: [RepoService],
})
export class RepoModule {}
