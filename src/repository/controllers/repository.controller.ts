import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RepoLinkDto } from '../dtos/RepoLink.dto.js';
import { RepoService } from '../services/repository.service.js';

@Controller('document')
export class RepoController {
  constructor(private repoService: RepoService) {}

  // Post request with github link
  @Post('is-private')
  @UsePipes(new ValidationPipe())
  retrieveVisibility(@Body() repoDetails: RepoLinkDto) {
    return this.repoService.extractContents(repoDetails);
  }
}
