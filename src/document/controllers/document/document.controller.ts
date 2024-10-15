import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RepoLinkDto } from '../../dtos/RepoLink.dto.js';
import { DocumentService } from '../../services/document/document.service.js';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  // Post request with github link
  @Post('is-private')
  @UsePipes(new ValidationPipe())
  retrieveVisibility(@Body() repoDetails: RepoLinkDto) {
    return this.documentService.check_repo_visibility(repoDetails);
  }
}
