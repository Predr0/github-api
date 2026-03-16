
export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export async function getGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 3600 } 
  });

  if (!response.ok) {
    throw new Error('Usuário não encontrado ou erro na API');
  }

  return response.json();
}

export async function getGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar repositórios');
  }

  return response.json();
}

export async function getLanguagesData(username: string) {
  const repos = await getGitHubRepos(username);
  
  const languagesMap: Record<string, number> = {};

  await Promise.all(
    repos.map(async (repo) => {
      const res = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`, {
        next: { revalidate: 3600 }
      });
      if (res.ok) {
        const data = await res.json();
        Object.keys(data).forEach((lang) => {
          languagesMap[lang] = (languagesMap[lang] || 0) + data[lang];
        });
      }
    })
  );

 
  const totalBytes = Object.values(languagesMap).reduce((a, b) => a + b, 0);
  
  return Object.keys(languagesMap).map((name) => ({
    name,
    value: languagesMap[name],
    percentage: ((languagesMap[name] / totalBytes) * 100).toFixed(1)
  })).sort((a, b) => b.value - a.value).slice(0, 5); 
}