# 🚀 Projeto Challenge - Central do Bem

Bem-vindo ao repositório do **Central do Bem**!  
Este projeto foi desenvolvido para a parte de Front-End do projeto Central do Bem.

---

## 🔗 Link do Projeto
Acesse o projeto no GitHub:  
[ Acessar Projeto](https://github.com/guilhermeeustaquio/Challenge)

[Video no Youtube demonstrando o projeto](https://youtu.be/nRJ7Bidjgvg)


---

## 🚀 Como rodar o projeto

Siga os passos abaixo para executar o projeto localmente:

Link do tutorial de instalação do projeto: https://youtu.be/uJeUh0mtqgk

### Clone o repositório
```bash
git clone https://github.com/guilhermeeustaquio/Challenge.git

```

### Acesse a pasta do projeto

```bash

cd Challenge

```

###  Instale as dependências

```bash

npm install

```

### Execute o projeto 
```bash
npm run dev

```

### Abra o projeto no navegador
Aparecerá um link semelhante ao link a seguir

Basta copiar e colar no navegador para visualizar o projeto
```bash
http://localhost:5173/

```



---

## 👥 Equipe

| Nome | RM | GitHub | LinkedIn |
|------|----|--------|----------|
| **Guilherme Eustaquio** | 566784 | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/guilhermeeustaquio) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/guilhermeeustaquio) |
| **Caio Couto** | 563452 | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/caioccouto) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/caio-couto-44b849326) |
| **Matheus Tavares** | 566844 | [![GitHb](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/manovares) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manovares/) |


---

## 📝 Descrição
Segue uma breve apresentação sobre o projeto:

### ❓ Problema apresentado pela empresa Turma do Bem
O problema principal foi a **dificuldade de centralização dos canais de comunicação**, o que causou perda de informações essenciais, dificultando o cadastro e atendimento dos pacientes.

### 💡 Nossa Solução
Desenvolvemos uma **plataforma centralizada** que organiza os canais de comunicação e garante que todas as informações importantes dos pacientes fiquem registradas de forma segura e acessível, evitando perdas e retrabalho.

### 🎯 Objetivo principal
O objetivo do projeto é **facilitar a gestão de informações e comunicação entre equipe e pacientes**, melhorando a eficiência do atendimento e o fluxo de trabalho da empresa.

---

## 📁 Estrutura de Pastas

```
Challenge/
├── imagem/                     # Imagens estáticas do projeto
│   ├── icon/                   # Ícones de navegação
│   └── *.png / *.jpg           # Demais imagens
├── public/                     # Arquivos públicos (favicon, ícones SVG)
├── src/
│   ├── assets/
│   │   └── data.ts             # Dados estáticos da aplicação
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Accordion/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Layout/
│   │   ├── MetricCard/
│   │   └── SectionHeader/
│   ├── pages/                  # Páginas da aplicação
│   │   ├── Contato/
│   │   ├── FAQ/
│   │   ├── Home/
│   │   ├── Integrantes/
│   │   ├── Sobre/
│   │   └── Solucao/
│   ├── routes/
│   │   └── AppRoutes.tsx       # Definição das rotas
│   ├── types/
│   │   └── index.ts            # Tipos TypeScript globais
│   ├── App.tsx                 # Componente raiz
│   ├── main.tsx                # Ponto de entrada
│   └── index.css               # Estilos globais
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

---

## ⚡ Tecnologias Utilizadas na parte de Front-End
- Vite
- React
- Git e GitHub
- Typescript

---

## 📌 Observações
- Este repositório é destinado à avaliação do projeto.  



## ⚡ Tecnologias Utilizadas
- React
- Vite
- TypeScript
- TailwindCSS
- React Router DOM
- React Hook Form
- Fetch API
- Java/Quarkus (backend previsto)
- Oracle (banco previsto)

## Preparação para Sprint 4
O front-end agora está preparado para consumir a API Java/Quarkus via REST sem depender dela neste momento.

### Configuração da API
1. Copie `.env.example` para `.env`.
2. Defina `VITE_API_URL` com a URL do backend (ex: `http://localhost:8080`).
3. Se `VITE_API_URL` não estiver definido, o projeto usa automaticamente dados mockados de `src/mocks/mockData.ts`.

### Módulos funcionais já prontos
- Beneficiários
- Dentistas
- Doadores
- Doações
- Voluntários
- Triagens
- Dashboard de resumo em `/solucao`

### Endpoints esperados
- `/beneficiarios` (GET, GET por id, POST, PUT, DELETE)
- `/dentistas` (GET, GET por id, POST, PUT, DELETE)
- `/doadores` (GET, GET por id, POST, PUT, DELETE)
- `/doacoes` (GET, GET por id, POST, PUT, DELETE)
- `/voluntarios` (GET, GET por id, POST, PUT, DELETE)
- `/triagens` (GET, GET por id, POST, PUT, DELETE)
- `/dashboard/resumo` (GET)

### Como rodar localmente
```bash
npm install
npm run dev
npm run build
```

### Deploys
- URL da Vercel: _preencher_
- URL da API publicada: _preencher_

## Sprint 4 - Área de Gestão da Solução
- A página `/solucao` funciona como área de gestão principal.
- Há abas para Beneficiários, Dentistas, Doadores, Doações, Voluntários e Triagens.
- Cada aba permite listar, adicionar, atualizar e deletar registros.
- Sem `VITE_API_URL`, o sistema usa mocks internos.
- Com `VITE_API_URL`, o front fica preparado para consumir a API Java/Quarkus.
- Não há login nesta versão.
- Não há filtro por usuário.
- Os dados representam tabelas específicas do backend Java.
