# My Work — React Native (Expo)

Um aplicativo móvel para organizar itens de trabalho pessoais, construído com React Native (Expo) e TypeScript. Este projeto foca em um design coeso, interações responsivas e persistência local confiável.

<p align="center">
  <img alt="Expo" src="https://img.shields.io/badge/Expo-RN-blueviolet?style=flat" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-blue?style=flat" />
  <img alt="State" src="https://img.shields.io/badge/State-Context_API-success?style=flat" />
  <img alt="Storage" src="https://img.shields.io/badge/Storage-AsyncStorage-informational?style=flat" />
</p>

**Tempo gasto:** ~2h40m

---

## Sumário

- [Visão Geral](#visão-geral)
- [Destaques](#destaques)
- [Pilha Tecnológica](#pilha-tecnológica)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Arquitetura e Decisões](#arquitetura-e-decisões)
- [Modelo de Dados](#modelo-de-dados)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Estilização e Sistema de Design](#estilização-e-sistema-de-design)
- [Instalação e Execução](#instalação-e-execução)
- [Dependências Necessárias](#dependências-necessárias)
- [Build e Lançamento (Expo EAS)](#build-e-lançamento-expo-eas)
- [Guia de Uso](#guia-de-uso)
- [Persistência e Comportamento de Desfazer](#persistência-e-comportamento-de-desfazer)
- [Regras de Data e Atraso](#regras-de-data-e-atraso)
- [Acessibilidade e Interação](#acessibilidade-e-interação)
- [Limitações Conhecidas / Próximos Passos](#limitações-conhecidas--próximos-passos)

---

## Visão Geral

Este aplicativo móvel foi desenvolvido para ajudar a organizar tarefas e itens de trabalho pessoais. Utilizando React Native com Expo e TypeScript, o projeto visa oferecer uma experiência de usuário fluida e eficiente, com foco em um design intuitivo, interações responsivas e a capacidade de persistir dados localmente de forma confiável. Ideal para quem busca uma ferramenta simples e eficaz para gerenciar suas atividades diárias.

---

## Destaques

- Fluxo de conclusão animado com UI otimista.
- Toast "Desfazer" com botão em formato de pílula e barra de progresso que preenche da esquerda para a direita.
- Filtros: **Todos**, **Hoje**, **Atrasados**.
- Abas de não-tarefas exibem uma mensagem centralizada de **Em breve**.
- Persistência local com **AsyncStorage**.
- Conjunto de ícones SVG e cabeçalho consistente + abas superiores com indicador animado.

---

## Pilha Tecnológica

O projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

- **React Native (Expo)**: Framework principal para o desenvolvimento de aplicativos móveis multiplataforma, permitindo a criação de interfaces de usuário ricas e performáticas.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática, melhorando a manutenibilidade do código, a detecção de erros em tempo de desenvolvimento e a colaboração em equipes.
- **Context API**: Utilizada para gerenciamento de estado global, facilitando o compartilhamento de dados entre componentes sem a necessidade de prop drilling.
- **AsyncStorage**: Solução de armazenamento local assíncrono, persistente e não criptografado para React Native, ideal para guardar dados do usuário offline.
- **React Native `Animated`**: Biblioteca nativa do React Native para criação de animações fluidas e de alto desempenho, utilizada para micro-animações na interface.
- **SVGR**: Ferramenta que permite importar arquivos SVG diretamente como componentes React, facilitando a integração de gráficos vetoriais escaláveis e personalizáveis.

---

## Funcionalidades Implementadas

O aplicativo oferece as seguintes funcionalidades principais:

- **Cabeçalho**: Exibe uma saudação personalizada, ícones de notificação e um seletor de filtro para as tarefas.
- **Abas Superiores**: Organiza o conteúdo em diferentes categorias: Tarefas, Lembretes, Reuniões e Notas.
- **Lista de Tarefas**: Apresenta as tarefas em cartões individuais, cada um contendo:
  - Um glifo de verificação roxo na parte inicial do corpo do cartão.
  - Uma linha de metadados com ícones de pasta e calendário.
  - Um distintivo de "Atrasado" com um ponto vermelho e um rótulo para tarefas vencidas.
  - Um botão de conclusão no lado direito com uma animação de verificação e um anel expansível.
- **Fluxo de Conclusão**: Uma experiência interativa para marcar tarefas como concluídas:
  - Animação de verificação e anel ao completar.
  - O cartão da tarefa desaparece, desliza para cima e tem sua altura recolhida, fechando o espaço na lista.
  - Um toast aparece com um botão "Desfazer" e uma barra de progresso.
  - A opção "Desfazer" restaura a tarefa; o tempo limite do toast a exclui permanentemente do armazenamento.
- **Filtros**: Permite visualizar as tarefas de diferentes maneiras:
  - **Todos**: Exibe todas as tarefas ativas.
  - **Hoje**: Mostra as tarefas com vencimento para o dia atual.
  - **Atrasados**: Exibe as tarefas ativas que estão vencidas.
- **Abas de Não-Tarefas**: As abas de Lembretes, Reuniões e Notas exibem uma mensagem de "Em breve" como um placeholder.

---

## Arquitetura e Decisões

A arquitetura do projeto foi pensada para modularidade e escalabilidade, com as seguintes decisões chave:

- **Componentes Orientados a Funcionalidades**: A interface é dividida em componentes reutilizáveis e focados em funcionalidades específicas, como `Header`, `TabsBar`, `TaskCard`, `Toast`, `AddTaskSheet` e `BottomBar`. Isso promove a separação de preocupações e facilita a manutenção.
- **Estado Global com `TasksContext`**: O gerenciamento de estado global é centralizado no `TasksContext`, que encapsula as operações de manipulação de tarefas (`addTask`, `markComplete`, `revertComplete`, `deleteTask`, `reorderTasks`). Essa abordagem simplifica o fluxo de dados e garante a consistência do estado em todo o aplicativo.
- **Conclusão Otimista e Função Desfazer**: Para uma experiência de usuário mais fluida, a conclusão de tarefas é otimista, ou seja, a UI é atualizada imediatamente antes da confirmação da persistência. Um ID de exclusão pendente é mantido em uma referência, permitindo que a função "Desfazer" reverta a conclusão. O tempo limite do toast é responsável por finalizar a exclusão do estado e do armazenamento.
- **Encapsulamento de Datas**: A lógica de manipulação de datas, incluindo a determinação de "hoje", "amanhã", "ontem" e regras de atraso, é encapsulada em utilitários dedicados. Isso garante consistência e facilita futuras modificações ou internacionalização.
- **Animações**: As animações são implementadas utilizando o `Animated` do React Native. Para transformações e opacidade, o driver nativo é utilizado para melhor desempenho. No entanto, o recolhimento de altura utiliza um driver não nativo devido a restrições da API, garantindo a funcionalidade mesmo com essa limitação.

---

## Modelo de Dados

O modelo de dados para uma `Task` é definido da seguinte forma:

```typescript
interface Task {
  id: string;
  title: string;
  context?: string;
  dueAt?: string;
  completed: boolean;
  position: number;
}
```

- `id`: Identificador único da tarefa (string).
- `title`: Título da tarefa (string).
- `context?`: Contexto opcional da tarefa (string).
- `dueAt?`: Data de vencimento opcional da tarefa (string, formato ISO 8601).
- `completed`: Booleano indicando se a tarefa foi concluída.
- `position`: Número para ordenação da tarefa na lista.

---

## Estrutura do Projeto

A estrutura de diretórios do projeto é organizada para promover a modularidade e a clareza:

```
src/
  components/         # Componentes reutilizáveis da UI
    Header.tsx
    TabsBar.tsx
    TaskCard.tsx
    Toast.tsx
    FAB.tsx
    AddTaskSheet.tsx
    BottomBar.tsx
  context/            # Contextos React para gerenciamento de estado global
    TasksContext.tsx
  screens/            # Telas principais do aplicativo
    MyWorkScreen.tsx
  theme/              # Definições de tema, como cores
    colors.ts
  utils/              # Funções utilitárias e helpers
    date.ts
assets/               # Ativos estáticos, como ícones SVG
  home.svg
  work.svg
  insights.svg
  profile.svg
  bell.svg
  clock.svg
  folder.svg
  calendar.svg
  check.svg
  chevron-down.svg
```

---

## Estilização e Sistema de Design

O projeto segue um sistema de design para garantir consistência visual e facilidade de manutenção:

- **Paleta de Cores Centralizada**: Todas as cores são definidas em uma paleta centralizada (`theme/colors.ts`), facilitando alterações globais e garantindo a consistência da marca.
- **Ícones SVG**: Os ícones são armazenados como arquivos SVG em `assets/` e dimensionados conforme a necessidade em cada componente, garantindo escalabilidade e nitidez em diferentes resoluções.
- **Abas Superiores**: O indicador das abas superiores é alinhado à largura do rótulo e posicionado acima do divisor, proporcionando uma navegação clara e visualmente agradável.
- **Botão de Conclusão**: O botão de conclusão possui um fundo verde, uma borda fina e um ícone de verificação na cor da marca, oferecendo um feedback visual claro ao usuário.

---

## Instalação e Execução

Para configurar e executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd my-work-app
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Inicie o aplicativo Expo:**
    ```bash
    expo start
    ```
    Isso abrirá o Metro Bundler no seu navegador. Você pode escanear o código QR com o aplicativo Expo Go no seu dispositivo móvel ou usar um emulador.

---

## Dependências Necessárias

Certifique-se de ter as seguintes dependências instaladas:

- `@react-native-async-storage/async-storage`: Para persistência de dados local.

Para instalar, execute:

```bash
expo install @react-native-async-storage/async-storage
```

---

## Build e Lançamento (Expo EAS)

Para construir e lançar o aplicativo usando Expo Application Services (EAS):

1.  **Instale a CLI do EAS globalmente:**
    ```bash
    npm install -g eas-cli
    ```
2.  **Faça login no EAS:**
    ```bash
    eas login
    ```
3.  **Configure o projeto EAS:**

    ```bash
    eas init
    ```

    Siga as instruções no terminal para configurar seu projeto EAS. Isso criará um arquivo `eas.json`.

4.  **Construa o aplicativo:**
    ```bash
    eas build -p android # para Android
    eas build -p ios    # para iOS
    ```
    Ou para ambas as plataformas:
    ```bash
    eas build
    ```

---

## Guia de Uso

Siga este guia para entender como usar o aplicativo:

1.  **Abrir o aplicativo**: Ao iniciar, a aba padrão é "Tarefas".
2.  **Adicionar uma tarefa**: Toque no botão `+` para adicionar uma nova tarefa. Você pode definir um contexto opcional e uma data/hora de vencimento.
3.  **Completar uma tarefa**: Toque no botão verde para marcar uma tarefa como concluída.
    - Uma animação de verificação e anel aparecerá, e o cartão da tarefa desaparecerá e se recolherá.
    - Um "Toast" será exibido com a opção "Desfazer". Toque para restaurar a tarefa ou aguarde o tempo limite para que ela seja excluída permanentemente.
4.  **Filtrar tarefas**: Use o menu de filtro para alternar entre "Todos", "Hoje" e "Atrasados".
5.  **Navegar entre abas**: Alterne entre as abas superiores. As abas de não-tarefas (Lembretes, Reuniões, Notas) exibirão a mensagem "Em breve".

---

## Persistência e Comportamento de Desfazer

- Todas as mutações de dados são persistidas no `AsyncStorage` sob uma única chave, garantindo que o estado do aplicativo seja salvo de forma consistente.
- Ao completar uma tarefa, a propriedade `completed` é definida como `true`.
- A função "Desfazer" (ativada antes do tempo limite do toast) redefine `completed` para `false`, restaurando a tarefa.
- Após o tempo limite do toast, a tarefa é permanentemente excluída e as posições das tarefas restantes são reindexadas para manter a ordem.

---

## Regras de Data e Atraso

- **Hoje**: Uma tarefa é considerada "Hoje" se sua data de vencimento for igual à data local atual.
- **Atrasado**: Uma tarefa é marcada como "Atrasada" se sua data de vencimento for anterior à data e hora atuais e ela ainda não estiver concluída.
- **UI**: A interface do usuário exibe um distintivo "Atrasado" com um ponto vermelho e um rótulo na linha de metadados do cartão da tarefa, alertando visualmente o usuário.

---

## Acessibilidade e Interação

O aplicativo foi projetado com foco na acessibilidade e em interações intuitivas:

- **Área de Toque Mínima**: Ícones de cabeçalho e filtros possuem uma área de toque mínima para facilitar a interação, especialmente em dispositivos móveis.
- **Feedback Visual**: Feedback de pressão com transformações sutis é fornecido para indicar interações do usuário.
- **Remoção Animada**: A remoção animada de tarefas preserva o contexto visual e a posição de rolagem, proporcionando uma experiência de usuário suave e contínua.

---

## Limitações Conhecidas / Próximos Passos

Algumas limitações e possíveis melhorias futuras incluem:

- **Reordenação por Arrastar**: A funcionalidade de reordenação de tarefas por arrastar e soltar pode ser implementada utilizando bibliotecas como `react-native-reanimated` ou `draggable-flatlist`.
- **Seletores de Data/Hora Nativos**: Substituir os inputs ISO atuais por seletores de data e hora nativos do sistema operacional para uma melhor experiência do usuário.
- **Internacionalização e Fusos Horários**: Considerar o uso de bibliotecas como `date-fns` ou `luxon` para melhor suporte à internacionalização (i18n) e manipulação de fusos horários.
- **Testes Abrangentes**: Adicionar testes unitários e de integração para utilitários de data, ações de contexto e a presença de animações, garantindo a robustez e a confiabilidade do aplicativo.

---

### Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

### Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido por Manus AI**
