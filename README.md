# FalcoPoints Frontend

Interface web do programa de fidelidade **FalcoPoints**, focada em acompanhar pontos, missões, prêmios e o relacionamento das pessoas doadoras com campanhas sociais. O projeto é construído com **Next.js 14 (App Router)**, **TypeScript** e **Tailwind CSS**, organizando os componentes em uma estrutura _atomic design_.

## Visão geral do app

- **Design system consistente** com paleta azul/laranja da marca, tipografia customizada e componentes reutilizáveis.
- **Dashboard inicial** com estatísticas, carrossel de campanhas (React Slick) e histórico emergente.
- **Missões e badges** integradas, com modal detalhando requisitos, missões relacionadas e botões de compartilhamento social.
- **Formulário de contribuição** com geração de link de indicação e cópia rápida para o clipboard.
- **Catálogo de prêmios** com verificação de saldo, cálculo automático pós-resgate e confirmação em modal.
- **Perfil do doador** com glow dinâmico no avatar, formulário de dados, histórico de badges e modal de compartilhamento.
- **Botão flutuante do Copilot** presente em todas as páginas via `PageShell`, abrindo um webchat incorporado em modal.

## Estrutura de pastas relevante

- `src/frontend/app/` – rotas do App Router (Home, Contribua Agora, Missões, Catálogo, Perfil).
- `src/frontend/components/` – componentes organizados em _atoms_, _molecules_, _organisms_ e _templates_.
- `src/frontend/utilities/` – dados mockados, helpers de formatação, links de compartilhamento e geração de convites.
- `src/frontend/types/` – contratos TypeScript para campanhas, missões, badges, recompensas e usuários.
- `src/backend/` – pasta reservada para evolução futura do backend (a implementação atual é focada no frontend).

## Páginas e fluxos

| Rota | Conteúdo principal | Destaques de UX |
| --- | --- | --- |
| `/` | Painel com cards de estatísticas e `CampaignSlider` | Modal de histórico com `HistoryList`, CTA “Contribua agora”, carrossel com ícones e gradientes |
| `/contribua-agora` | Formulário de doação recorrente/pontual | Geração de link de indicação, cópia com feedback, mensagens contextuais |
| `/missoes` | Vitrine de badges e missões agrupadas | Cartões compactos, modal com ícone/color badge, lista de missões, botões de share (Facebook/LinkedIn) |
| `/catalogo-de-premios` | Grid de recompensas resgatáveis | Modal confirmações com cálculo de saldo, cards destacando foto e custo em pontos |
| `/perfil` | Perfil completo do doador | Avatar com glow por nível, formulário `ProfileForm`, vitrine de badges recentes e modal de compartilhamento |

## Estratégias de implementação

- **Atomic design**: `atoms` (botões, campos, avatar), `molecules` (cards, listas), `organisms` (forms, sliders, sidebar) e `templates` (PageShell) garantem reuso e consistência.
- **Dados mockados** em `utilities/mockData.ts` centralizam campanhas, missões, badges, níveis e recompensas; facilitam troca futura por chamadas de API.
- **Estado local**: fluxos simples usam `useState` nos próprios componentes das páginas; dados derivados (ex.: missões por badge) são calculados dinamicamente.
- **Estilização**: Tailwind com extensões de tema (cores, fontes, sombras) em `tailwind.config.ts`. Classes utilitárias garantem responsividade.
- **Acessibilidade**: botões possuem `aria-label`, textos alternativos e `sr-only` para ícones; controles são tecláveis.
- **Interação social**: utilitários `getFacebookShareLink` e `getLinkedInShareLink` constroem URLs parametrizadas de forma segura.
- **Integração Copilot**: `PageShell` adiciona botão flutuante com ícone `public/images/copilot.png` e modal contendo iframe do Copilot Studio.

## Executando localmente

1. Instale o **Node.js 20+** e **Yarn 1.22+**.
2. Instale as dependências do frontend:

    ```powershell
    cd src/frontend
    yarn install
    ```

3. Rode em modo desenvolvimento:

    ```powershell
    yarn dev
    ```

4. Build de produção e lint opcionais:

    ```powershell
    yarn build
    yarn lint
    ```

> **Env vars**: crie `src/frontend/.env.local` se precisar configurar chaves como `NEXT_PUBLIC_API_BASE_URL`. O app atual opera com dados mockados.

## Deploy e CI/CD

- O fluxo de deploy usa **Azure Static Web Apps** via GitHub Actions (`.github/workflows/azure-static-web-apps-agreeable-moss-000d6ac1e.yml`).
- O workflow roda `yarn build` na pasta `src/frontend` e publica a pasta `.next` como artefato.
- Certifique-se de configurar o segredo `AZURE_STATIC_WEB_APPS_API_TOKEN_AGREEABLE_MOSS_000D6AC1E` no repositório.

## Bicep – Static Web Apps para o frontend

O arquivo `infra/falcopoints-swa.bicep` provisiona o Static Web App com identidade gerenciada e reutiliza o workflow de GitHub Actions existente. Os principais parâmetros ficam expostos para personalização (nome, branch, diretórios do build, tags etc.). Certifique-se de trafegar o token do GitHub como secret (Key Vault, variável protegida, ou arquivo local referenciado por `@`).

```bicep
targetScope = 'resourceGroup'

@description('Nome do Azure Static Web App.')
param staticSiteName string

@description('Região do recurso. Por padrão herda a região do resource group.')
param location string = resourceGroup().location

@description('SKU do Static Web App.')
@allowed([
  'Free'
  'Standard'
])
param skuName string = 'Standard'

@description('URL do repositório GitHub monitorado pelo build.')
param repositoryUrl string

@description('Branch do repositório associada ao build automatizado.')
param branch string = 'main'

@secure()
@description('GitHub token com escopo repo. Armazene-o em segredo seguro (ex.: Azure Key Vault).')
param githubToken string

@description('Diretório com o frontend Next.js a ser publicado.')
param appLocation string = 'src/frontend'

@description('Diretório com o artefato gerado pelo build do Next.js.')
param appArtifactLocation string = '.next'

@description('Mapa opcional de tags para governança.')
param tags object = {}

resource staticApp 'Microsoft.Web/staticSites@2023-07-01' = {
  name: staticSiteName
  location: location
  identity: {
    type: 'SystemAssigned' // Garante integração segura com outros serviços Azure via RBAC.
  }
  sku: {
    name: skuName
    tier: skuName == 'Free' ? 'Free' : 'Standard'
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: branch
    repositoryToken: githubToken
    allowConfigFileUpdates: false // Mantém configuração controlada pelo repositório.
    skipGithubActionWorkflowGeneration: true // Já existe workflow dedicado no repositório.
    buildProperties: {
      appLocation: appLocation
      apiLocation: ''
      appArtifactLocation: appArtifactLocation
    }
  }
  tags: tags
}

output staticWebAppHostname string = staticApp.properties.defaultHostname
```

### Como executar a infraestrutura

```powershell
# 1. Criar (ou reutilizar) o resource group
az group create --name rg-falcopoints --location brazilsouth

# 2. Validar alterações com what-if
az deployment group what-if `
  --resource-group rg-falcopoints `
  --template-file infra/falcopoints-swa.bicep `
  --parameters staticSiteName='falco-points-swa' repositoryUrl='https://github.com/Cataldir/gerando-falcoes-falcopoints'

# 3. Aplicar o template
az deployment group create `
  --resource-group rg-falcopoints `
  --template-file infra/falcopoints-swa.bicep `
  --parameters staticSiteName='falco-points-swa' repositoryUrl='https://github.com/Cataldir/gerando-falcoes-falcopoints' githubToken=@token.txt
```

- Substitua `githubToken=@token.txt` por uma referência segura (Key Vault ou `--parameters githubToken='[valor]'` via pipeline protegido).
- Ajuste `appLocation`, `appArtifactLocation` e `tags` conforme sua estrutura caso diverja do padrão.
- Após o provisionamento inicial, valide no portal se o Static Web App associou o repositório corretamente e atualize o token do workflow quando necessário.

## Próximos passos sugeridos

- Integrar o backend definitivo e substituir os mocks por chamadas autenticadas.
- Adicionar testes de unidade para utilitários (formatação, links de compartilhamento, geração de convites).
- Criar testes e2e (Playwright/Cypress) para fluxos críticos: geração de link, resgate de prêmio, navegação entre campanhas.
- Monitorar métricas de uso (Azure Application Insights) e eventos de conversão de missões.

---

Qualquer dúvida ou sugestão, fique à vontade para abrir uma issue ou PR. Bons voos com o FalcoPoints! ✈️
