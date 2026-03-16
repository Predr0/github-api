import { getGitHubUser, getGitHubRepos, getLanguagesData } from "@/lib/github";
import { SearchInput } from "@/components/SearchInput";
import { TechStackChart } from "@/components/TechStackChart"; 
import { Github, Folder, Star, User, SearchCode, ExternalLink, AlertCircle } from "lucide-react";

interface HomeProps {
  searchParams: Promise<{ username?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { username } = await searchParams;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">

        <section className="text-center space-y-4 pt-8">
          <div className="flex justify-center mb-2">
            <div className="bg-blue-600/20 p-3 rounded-2xl border border-blue-500/30">
              <Github className="text-blue-500" size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">DevRadar</h1>
          <p className="text-slate-400 text-lg">Analise perfis e tecnologias do GitHub com precisão.</p>
          <div className="pt-4">
            <SearchInput />
          </div>
        </section>

        {username ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ProfileData username={username} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-900 rounded-3xl bg-slate-900/20">
            <SearchCode size={48} className="text-slate-800 mb-4" />
            <p className="text-slate-500 font-medium">Aguardando sua busca...</p>
            <p className="text-slate-600 text-sm">Digite um @username para gerar o dashboard.</p>
          </div>
        )}

        <footer className="text-center text-slate-600 text-xs pt-12 pb-8">
          <p>DevRadar &copy; 2026 | Powered by Next.js 15 & GitHub API</p>
        </footer>
      </div>
    </main>
  );
}

async function ProfileData({ username }: { username: string }) {
  try {
    const [user, repos, languages] = await Promise.all([
      getGitHubUser(username),
      getGitHubRepos(username),
      getLanguagesData(username)
    ]);

    return (
      <div className="space-y-8">
        <section className="flex flex-col md:flex-row items-center gap-8 p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
          <img 
            src={user.avatar_url} 
            alt={user.name} 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-600/50 shadow-2xl"
          />
          <div className="text-center md:text-left flex-1 space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-white">{user.name || user.login}</h2>
              <p className="text-blue-400 font-mono italic">@{user.login}</p>
            </div>
            
            <p className="text-slate-300 leading-relaxed max-w-xl">
              {user.bio || "Este desenvolvedor ainda não escreveu uma bio no GitHub :("}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                <User size={16} className="text-blue-400"/>
                <span className="text-sm font-medium">{user.followers} <span className="text-slate-500 text-xs uppercase tracking-wider">seguidores</span></span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                <Folder size={16} className="text-purple-400"/>
                <span className="text-sm font-medium">{user.public_repos} <span className="text-slate-500 text-xs uppercase tracking-wider">repos</span></span>
              </div>
            </div>
          </div>
        </section>

        <section className="animate-in fade-in zoom-in duration-1000 delay-200">
          <TechStackChart data={languages} />
        </section>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold flex items-center gap-2 px-2 text-slate-300">
            <Github className="text-slate-500" size={20} />
            Projetos em Destaque
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <a 
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/40 transition-all duration-300 shadow-sm hover:shadow-blue-900/10"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg text-slate-100 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                    {repo.name}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded text-amber-400 border border-slate-700">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-bold">{repo.stargazers_count}</span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-400 mt-3 line-clamp-2 min-h-[40px]">
                  {repo.description || "Nenhuma descrição fornecida."}
                </p>
                
                <div className="mt-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-mono text-slate-300">{repo.language || "Other"}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center gap-4 p-12 bg-red-950/10 border border-red-900/30 rounded-2xl text-center">
        <AlertCircle size={40} className="text-red-500" />
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-red-500">Perfil não localizado</h3>
          <p className="text-slate-400 text-sm">O usuário "{username}" pode não existir ou a API atingiu o limite de taxa.</p>
        </div>
      </div>
    );
  }
}