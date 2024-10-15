import { Module } from '@nestjs/common';
import { DocumentModule } from './document/document.module.ts';

@Module({
  imports: [DocumentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
