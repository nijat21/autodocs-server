import { BadRequestException, Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';
import { RepoLinkDto } from 'src/repository/dtos/RepoLink.dto.js';
import { RequestError } from 'octokit';

@Injectable()
export class RepoService {
  private octokit: Octokit;
  constructor() {
    this.octokit = new Octokit();
  }

  // Retrieve owner and repo name from the repo link
  extractOwnerAndRepo(repoDetails: RepoLinkDto): {
    owner: string;
    repo: string;
  } {
    const regex = /github\.com\/([^\/]+)\/([^\/]+?)(\.git)?$/;
    const match = repoDetails.repoUrl.match(regex);

    if (!match) {
      throw new BadRequestException('Invalid GitHub repository URL');
    }
    const [, owner, repo] = match;
    return { owner, repo };
  }

  // Check the visibility of the GitHub repo
  async checkVisibility(ownerRepo: { owner: string; repo: string }) {
    try {
      const { owner, repo } = ownerRepo;
      const data = await this.octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
      });
      return data.data.private;
    } catch (error) {
      if (error instanceof RequestError && error.status === 404)
        return "Repository is private or doesn't exist";
    }
  }

  // Get the contents of public repo
  async publicRepoFolders(ownerRepo: { owner: string; repo: string }) {
    const { owner, repo } = ownerRepo;
    const data = await this.octokit.request(
      'GET /repos/{owner}/{repo}/contents',
      {
        owner,
        repo,
      },
    );
    return data;
  }

  /*   // Authenticate user if the repo is private
  async authGitUser() {}

  // Get the contents of private repo
  async privateRepoFolders(
    ownerRepo: { owner: string; repo: string },
    token: string,
  ) {
    const octokitAuth = new Octokit({ auth: token });
    const { owner, repo } = ownerRepo;
    const data = await this.octokit.request(
      'GET /repos/{owner}/{repo}/contents',
      {
        owner,
        repo,
      },
    );
    return data;
  } */

  async extractContents(repoDetails: RepoLinkDto) {
    //, token: string) {
    const ownerRepo = this.extractOwnerAndRepo(repoDetails);
    const isPrivate = await this.checkVisibility(ownerRepo);
    if (isPrivate) {
      // if (!token) {
      //   return 'Authentication required to access private repository';
      // }
      // return this.privateRepoFolders(ownerRepo, token);
    } else {
      return await this.publicRepoFolders(ownerRepo);
    }
  }
}
