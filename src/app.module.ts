import { Module } from '@nestjs/common';
import { DocumentModule } from './document/document.module.js';

@Module({
  imports: [DocumentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
