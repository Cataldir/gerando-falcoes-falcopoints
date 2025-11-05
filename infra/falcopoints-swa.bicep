targetScope = 'resourceGroup'

/*
  Provisiona um Azure Static Web App integrado ao repositório do FalcoPoints.
  Mantém o fluxo de build no GitHub, habilita identidade gerenciada para RBAC
  e impede alterações de configuração fora do controle de versão.
*/

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
