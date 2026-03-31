# 📚 Indexador de Arquivos com Worker Threads

Este projeto implementa um **indexador de arquivos** utilizando **Node.js + TypeScript**, com processamento paralelo usando **Worker Threads**.  
Ele percorre um diretório, lê os arquivos e cria um índice invertido (`indice.json`) com os termos encontrados.

## 🚀 Como executar

### 1. Instalar dependências
```bash
npm install
2. Compilar o projeto
npx tsc
3. Executar
node dist/index.js
📁 Estrutura
src/
│
├── index.ts          # Arquivo principal (coordena a indexação)
├── worker.ts         # Worker responsável por processar arquivos
└── utils/
    └── scanner.ts    # Função para listar arquivos (DFS)

meus_documentos/      # Diretório com arquivos a serem indexados
indice.json           # Arquivo gerado com o índice
tsconfig.json         # Configuração do TypeScript
