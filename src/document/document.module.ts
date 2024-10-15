import { Module } from '@nestjs/common';
import { DocumentController } from './controllers/document/document.controller.js';
import { DocumentService } from './services/document/document.service.js';
@Module({
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
