// 1. Definição do contrato de dados (Interfaces)
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

// 2. Função para buscar o perfil do usuário
export async function getGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    // Revalida os dados a cada 1 hora (Cache do Next.js)
    next: { revalidate: 3600 } 
  });

  if (!response.ok) {
    throw new Error('Usuário não encontrado ou erro na API');
  }

  return response.json();
}

// 3. Função para buscar os repositórios do usuário
export async function getGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar repositórios');
  }

  return response.json();
}