"use client"; // Indica que este componente tem interatividade

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchInput() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // Atualiza a URL com o nome do usuário digitado
      router.push(`/?username=${username}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Digite o @ do usuário no GitHub..."
        className="w-full p-4 pl-12 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-slate-100"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
      <button 
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-md text-sm font-medium transition-colors"
      >
        Buscar
      </button>
    </form>
  );
}