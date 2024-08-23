# Analisador de Hierarquia de Palavras

## Introdução

Esta é uma aplicação de linha de comando (CLI) em TypeScript que carrega uma
árvore hierárquica de palavras no formato de JSON, onde cada nível da árvore representa uma profundidade
específica. A aplicação analisa uma frase fornecida pelo usuário, identifica a
profundidade associada a uma palavra mencionada na frase, e então exibe os itens mais
próximos dessa profundidade.

## Requisitos

1. **[Bun](https://bun.sh/)**

A aplicação CLI utiliza o bun para rodar, você pode baixá-lo na sua máquina local no prórpio ([site oficial](https://bun.sh/)) de acordo com o seu sistema operacional:

2. **Node**

Você também precisará do Node instalado na sua máquina local. Você pode baixar o Node.js a partir de ([https://nodejs.org/](https://nodejs.org/en/download/package-manager/current))

## Instalação e Uso

Para executar a aplicação, siga os passos abaixo:

1. **Clone o repositório:**

```bash
  git clone https://github.com/seu-usuario/analisador-de-palavras-cli.git
```

2. **Instale as dependências:**

```bash
  npm install
```

3. **Execute a aplicação:**
   Para rodar a aplicação e usar a CLI, você pode utilizar o seguinte comando:

```bash
  bun run cli.ts analyze –depth <n> –verbose (optional) “{phrase}”
```

- `<phrase>`: A frase que você deseja analisar.
- `--depth <n>`: O nível da hierarquia a ser analisado.
- `--verbose`: (Opcional) Exibe métricas detalhadas sobre o tempo de carregamento e análise.

Exemplo:

```bash
  bun run cli.ts analyze –depth 2 –verbose "Eu amo papagaios"
```

Output:

```bash
  Aves = 1 (Uma ave foi mencionada)
```

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

- **dicts/**: Pasta contendo arquivos JSON que representam as árvores de palavras. Cada arquivo JSON descreve uma estrutura hierárquica onde palavras e suas relações são organizadas.
- **src/**
  - **cli/**: Contém a implementação da interface de linha de comando (CLI) para interagir com a aplicação.
    - `CLIApplication.ts`: Classe responsável pela configuração e execução dos comandos da CLI.
  - **core/**: Contém a lógica central para carregar hierarquias e analisar frases.
    - `HierarchyLoader.ts`: Classe responsável por carregar hierarquias a partir de arquivos JSON.
    - `PhraseAnalyzer.ts`: Classe responsável por analisar frases e contar palavras em níveis específicos da hierarquia.
    - `TreeNode.ts`: Definição do tipo para os nós da árvore de palavras.

## Testes

Os testes foram implementados usando a biblioteca Jest para garantir a funcionalidade correta dos métodos da classe `PhraseAnalyzer` e da classe `HierarchyLoader`.

### PhraseAnalyzer

1. **Testa correspondência no nível de especificidade:** Verifica se a análise da frase retorna o número correto de correspondências no nível de especificidade especificado.
2. **Testa múltiplas correspondências no nível de especificidade:** Avalia se o método `analyze` identifica corretamente múltiplas correspondências na frase fornecida.
3. **Testa ausência de correspondência:** Confirma que o método retorna a mensagem correta quando não há correspondências para a profundidade especificada.
4. **Analisa um texto longo:** Garante que o método `analyze` pode processar eficientemente um texto com mais de 5000 caracteres e retorna o resultado esperado.

### HierarchyLoader

1. **Teste de leitura de arquivo JSON:** Valida que a classe `HierarchyLoader` lê corretamente um arquivo JSON de hierarquia e retorna a estrutura de dados esperada.

Para rodar os testes, utilize o comando:

```bash
npm test
```

## Fluxo de Branches

Este projeto utiliza duas branches principais: `develop` e `main`.

### `main`

- A branch `main` é a branch principal do projeto.
- Ela sempre contém a principal do código que pode ir à produção.
- Nenhuma mudança deve ser feita diretamente na `main`.

### `develop`

- A branch `develop` é usada para o desenvolvimento ativo.
- Todas as novas funcionalidades, correções de bugs ou melhorias devem ser desenvolvidas em branches individuais baseadas na `develop`.
- Após o desenvolvimento e testes completos, essas branches devem ser mescladas de volta na `develop`.
- Depois que várias features e correções de bugs foram integradas e testadas na `develop`, uma nova versão principal pode ser mesclada para a `main`.
