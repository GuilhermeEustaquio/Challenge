<div align="center">
  <img src="imagem/logo-turma-do-bem.png" alt="Logo Central do Bem" width="180"/>

  # Central do Bem — Front-End

  **Plataforma centralizada de gestão e comunicação para a Turma do Bem**

  [![GitHub repo](https://img.shields.io/badge/Repositório-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/guilhermeeustaquio/Challenge)
  [![YouTube](https://img.shields.io/badge/Demonstração-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/nRJ7Bidjgvg)
  [![Vercel](https://img.shields.io/badge/Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://challenge-eosin-theta.vercel.app/)
</div>

---

## 📋 Sobre o Projeto

### ❓ Problema

A **Turma do Bem** enfrentava dificuldades com a **dispersão dos canais de comunicação**, o que causava perda de informações essenciais e dificultava o cadastro e atendimento dos pacientes beneficiados pelo projeto.

### 💡 Nossa Solução

Desenvolvemos uma **plataforma web centralizada** que organiza os canais de comunicação e garante que todas as informações importantes dos pacientes fiquem registradas de forma segura e acessível, eliminando retrabalho e perda de dados.

### 🎯 Objetivo

Facilitar a **gestão de informações e a comunicação** entre equipe e pacientes, melhorando a eficiência do atendimento e o fluxo de trabalho da organização.

---

## 🖼️ Imagens do Projeto

<div align="center">
  <img src="imagem/logocdb.png" alt="Logo Turma do Bem" width="220"/>
  &nbsp;&nbsp;&nbsp;
  <img src="imagem/logo-turma-do-bem.png" alt="Logo Central do Bem" width="180"/>
</div>

> As imagens e ícones do projeto estão armazenados na pasta `imagem/` e utilizados como ativos estáticos ao longo da aplicação.

---

## ⚡ Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| **React** | Biblioteca para construção de interfaces |
| **Vite** | Bundler e servidor de desenvolvimento rápido |
| **TypeScript** | Superset tipado do JavaScript |
| **TailwindCSS** | Estilização via classes utilitárias (sem bibliotecas de UI externas) |
| **React Router DOM** | Roteamento entre páginas (rotas estáticas e dinâmicas) |
| **React Hook Form** | Gerenciamento e validação de formulários |
| **Fetch API** | Comunicação com a API REST (nativa, sem Axios) |
| **Java / Quarkus** | Backend previsto para integração via REST |
| **Oracle** | Banco de dados relacional previsto |
| **Git & GitHub** | Versionamento e hospedagem do código |
| **Vercel** | Deploy e hospedagem do front-end |

---

## 📁 Estrutura de Pastas

```
Challenge/
├── imagem/                        # Imagens e ícones estáticos do projeto
│   ├── icon/                      # Ícones de navegação
│   ├── logocdb.png                # Logo Central do Bem
│   ├── logo-turma-do-bem.png      # Logo Turma do Bem
│   └── *.png / *.jpg              # Demais imagens
├── public/                        # Arquivos públicos (favicon, ícones SVG)
├── src/
│   ├── assets/
│   │   └── data.ts                # Dados estáticos da aplicação
│   ├── components/                # Componentes reutilizáveis
│   │   ├── Accordion/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── CrudModal/
│   │   ├── DashboardCard/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Layout/
│   │   ├── MetricCard/
│   │   └── SectionHeader/
│   ├── mocks/
│   │   └── mockData.ts            # Dados mockados para uso sem API
│   ├── pages/                     # Páginas da aplicação
│   │   ├── Contato/
│   │   ├── FAQ/
│   │   ├── Home/
│   │   ├── Integrantes/
│   │   ├── Sobre/
│   │   └── Solucao/               # Área de gestão com CRUD completo
│   ├── routes/
│   │   └── AppRoutes.tsx          # Definição das rotas
│   ├── services/                  # Camada de serviços (integração com API)
│   ├── types/
│   │   └── index.ts               # Tipos TypeScript globais
│   ├── App.tsx                    # Componente raiz
│   ├── main.tsx                   # Ponto de entrada
│   └── index.css                  # Estilos globais
├── .env.example                   # Variáveis de ambiente de exemplo
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

---

## 🚀 Como Usar

### Links Importantes

| Recurso | Link |
|---|---|
| 📁 Repositório GitHub | [github.com/guilhermeeustaquio/Challenge](https://github.com/guilhermeeustaquio/Challenge) |
| 🎬 Vídeo de Demonstração | [youtube.com/watch?v=nRJ7Bidjgvg](https://youtu.be/nRJ7Bidjgvg) |
| 📹 Tutorial de Instalação | [youtube.com/watch?v=uJeUh0mtqgk](https://youtu.be/uJeUh0mtqgk) |
| 🌐 Deploy Vercel | _a preencher_ |

### Rodando Localmente

**1. Clone o repositório**
```bash
git clone https://github.com/guilhermeeustaquio/Challenge.git
```

**2. Acesse a pasta do projeto**
```bash
cd Challenge
```

**3. Instale as dependências**
```bash
npm install
```

**4. Configure as variáveis de ambiente** *(opcional — sem isso, usa dados mockados)*
```bash
cp .env.example .env
# Edite o .env e defina VITE_API_URL com a URL do seu backend
# Exemplo: VITE_API_URL=http://localhost:8080
```

**5. Execute o projeto**
```bash
npm run dev
```

**6. Acesse no navegador**
```
http://localhost:5173/
```

### Outros Comandos

```bash
npm run build   # Gera o build de produção
npm run preview # Visualiza o build localmente
```

---

## 👥 Autores

<table>
  <tr>
    <th>Foto</th>
    <th>Nome</th>
    <th>RM</th>
    <th>Turma</th>
    <th>GitHub</th>
    <th>LinkedIn</th>
  </tr>
  <tr>
    <td align="center">
      <img src="imagem/eustaquio.PNG" alt="Guilherme Eustaquio" width="80" style="border-radius:50%"/>
    </td>
    <td><strong>Guilherme Eustaquio</strong></td>
    <td>566784</td>
    <td>1TDSPS</td>
    <td>
      <a href="https://github.com/guilhermeeustaquio">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
      </a>
    </td>
    <td>
      <a href="https://www.linkedin.com/in/guilhermeeustaquio">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="imagem/caioperfil.jpeg" alt="Caio Couto" width="80" style="border-radius:50%"/>
    </td>
    <td><strong>Caio Couto</strong></td>
    <td>563452</td>
    <td>1TDSPS</td>
    <td>
      <a href="https://github.com/caioccouto">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
      </a>
    </td>
    <td>
      <a href="https://www.linkedin.com/in/caio-couto-44b849326">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/manovares.png" alt="Matheus Tavares" width="80" style="border-radius:50%"/>
    </td>
    <td><strong>Matheus Tavares</strong></td>
    <td>566844</td>
    <td>1TDSPS</td>
    <td>
      <a href="https://github.com/manovares">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
      </a>
    </td>
    <td>
      <a href="https://www.linkedin.com/in/manovares/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td>
  </tr>
</table>

---

## 📬 Contato

Entre em contato com a equipe pelos perfis do LinkedIn acima ou abra uma [issue no repositório](https://github.com/guilhermeeustaquio/Challenge/issues).

---

## 📌 Observações

- Este repositório é destinado à avaliação acadêmica do projeto (FIAP — Sprint 3 e Sprint 4).
- A área de gestão (`/solucao`) funciona com **dados mockados** quando `VITE_API_URL` não está configurado.
- Quando `VITE_API_URL` estiver definido, o front-end se conecta ao backend Java/Quarkus via REST.
- Não há autenticação nesta versão.

<div align="center">
  <sub>Desenvolvido pela equipe Central do Bem — FIAP 1TDS Agosto</sub>
</div>
