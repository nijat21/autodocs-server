import { BadRequestException, Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';
import { RepoLinkDto } from 'src/document/dtos/RepoLink.dto.js';

@Injectable()
export class DocumentService {
  private octokit: Octokit;
  constuctor() {
    this.octokit = new Octokit();
  }

  // Retrieve owner and repo name from the repo link
  extractOwnerAndRepo(repoDetails: RepoLinkDto): {
    owner: string;
    repo: string;
  } {
    const regex = /github\.com\/([^\/]+)\/([^\/]+)(\.git)?/;
    const match = repoDetails.repoUrl.match(regex);

    if (!match) {
      throw new BadRequestException('Invalid GitHub repository URL');
    }

    const [, owner, repo] = match;
    return { owner, repo };
  }

  // Check the visibility of the GitHub repo
  async check_repo_visibility(repoDetails: RepoLinkDto) {
    const { owner, repo } = this.extractOwnerAndRepo(repoDetails);
    const data = await this.octokit.request(
      'GET /repos/{owner}/{repo}/issues',
      { owner, repo },
    );
    return data;
  }
}
