import { Module } from '@nestjs/common';
import { DocumentController } from './controllers/document/document.controller';
import { DocumentService } from './services/document/document.service';

@Module({
  controllers: [DocumentController],
  services: [DocumentService],
})
export class DocumentModule {}
