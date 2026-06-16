# 🚀 DevRadar - Dashboard Analítico do GitHub

O **DevRadar** é uma aplicação Fullstack moderna que transforma dados brutos da API do GitHub em insights visuais sobre o perfil técnico de um desenvolvedor. Diferente de buscadores comuns, o projeto foca em **Data Visualization (BI Style)**, analisando o peso em bytes dos repositórios para calcular e exibir a real distribuição de tecnologias de cada usuário.

---

## 🛠️ Tecnologias e Ferramentas

O projeto foi construído utilizando as tecnologias mais quentes e modernas do ecossistema React/Next.js adotadas por startups:

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Tipagem estática estrita)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) (Design responsivo e utilitário)
* **Gráficos (DataViz):** [Recharts](https://recharts.org/) (Visualização de dados interativa)
* **Ícones:** [Lucide React](https://lucide.dev/)

---

## 💡 Diferenciais Técnicos & Arquitetura 

Este projeto foi desenhado seguindo as melhores práticas de engenharia de software, focado em performance, resiliência e experiência do usuário (UX):

### 1. Arquitetura Híbrida (Server & Client Components)
* **Server-Side Rendering (SSR):** A busca e o processamento pesado de dados da API do GitHub são feitos diretamente no servidor (`src/app/page.tsx`). Isso reduz o tamanho do bundle enviado ao cliente e otimiza o SEO.
* **Client Components Interativos:** Componentes como a barra de busca (`SearchInput.tsx`) e o gráfico de pizza (`TechStackChart.tsx`) utilizam as diretivas `"use client"` apenas onde a interatividade ou o ciclo de vida do React são necessários.

### 2. Algoritmo de Agrupamento de Dados (Métrica BI)
* Em vez de apenas listar as linguagens retornadas, o serviço `getLanguagesData` faz requisições paralelas para mapear o peso em **bytes** de cada tecnologia nos repositórios, realiza a soma agregada e calcula o **percentual exato** de uso do desenvolvedor, exibindo o Top 5 de forma ordenada e fluida no gráfico.

### 3. Concorrência e Performance com `Promise.all`
* Para evitar *Waterfall* (gargalos de carregamento onde uma requisição espera a outra), os dados de perfil, repositórios e linguagens são disparados de forma concorrente usando `Promise.all`, cortando o tempo de resposta do servidor pela metade.

### 4. Estratégia de Cache Inteligente (ISR)
* Implementação de cache com `{ next: { revalidate: 3600 } }`. O Next.js guarda as respostas da API por 1 hora, protegendo a aplicação contra o *Rate Limit* do GitHub e entregando páginas instantâneas para os usuários através de revalidação em segundo plano.

### 5. UI/UX Resiliente (Streaming & Erros)
* **Loading States:** Uso do arquivo nativo `loading.tsx` com componentes *Skeleton* animados por Tailwind para evitar telas brancas durante o *fetch*.
* **Tratamento de Exceções:** Captura de erros com blocos `try/catch` robustos, garantindo que o usuário receba feedbacks visuais amigáveis caso um perfil não seja localizado, sem quebrar a aplicação.

---

## 📂 Estrutura do Projeto

```text
src/
├── app/
│   ├── layout.tsx       # Estrutura global e tema
│   ├── page.tsx         # Página principal (Server Component / Data Fetching)
│   └── loading.tsx      # Interface de carregamento (Skeleton Screen)
├── components/
│   ├── SearchInput.tsx  # Input de busca controlado por URL state
│   └── TechStackChart.tsx # Gráfico de pizza de tecnologias (Recharts)
└── lib/
    └── github.ts        # Camada de Serviço (Service Layer) isolada da API
