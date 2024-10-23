import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class RepoLinkDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/github\.com\/([^\/]+)\/([^\/]+)(\.git)?/, {
    message: 'Invalid GitHub repository link',
  })
  repoUrl: string;
}
