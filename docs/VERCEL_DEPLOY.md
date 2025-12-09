# 🚀 Guia de Deploy no Vercel - Infostore Frontend v2.0

Este guia detalha como fazer deploy da aplicação React no Vercel.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Deploy pela CLI](#deploy-pela-cli)
- [Deploy pelo GitHub (Recomendado)](#deploy-pelo-github-recomendado)
- [Configurações Importantes](#configurações-importantes)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Troubleshooting](#troubleshooting)
- [Domínio Customizado](#domínio-customizado)

---

## 🔑 Pré-requisitos

### 1. Conta Vercel

- Criar conta em [vercel.com](https://vercel.com)
- Conectar com GitHub (recomendado)

### 2. Backend Deployed

- Backend Django deve estar online
- CORS configurado para aceitar domínio Vercel
- HTTPS habilitado (recomendado)

### 3. Repositório Git

- Código no GitHub/GitLab/Bitbucket
- Branch main ou production atualizada

---

## 🖥️ Deploy pela CLI

### Instalação da Vercel CLI

```bash
# Instalar globalmente
npm install -g vercel

# Ou usar npx (sem instalação)
npx vercel
```

### Deploy Inicial

```bash
# Na pasta do frontend
cd frontend

# Login na Vercel
vercel login

# Deploy (primeira vez)
vercel

# Seguir o wizard interativo:
# ? Set up and deploy "~/frontend"? Y
# ? Which scope? [seu-usuario]
# ? Link to existing project? N
# ? What's your project's name? infostore-frontend
# ? In which directory is your code located? ./
```

### Configurar Build Settings

O Vercel detectará automaticamente Create React App. Confirme:

```
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### Deploy em Produção

```bash
# Deploy em produção
vercel --prod

# Ou especificar ambiente
vercel --prod --env REACT_APP_API_URL=https://api.infostore.ao/api/v2
```

---

## 🔗 Deploy pelo GitHub (Recomendado)

Este método habilita **deploy automático** em cada push.

### Passo 1: Conectar Repositório

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em **"Import Git Repository"**
3. Selecione seu repositório
4. Autorize acesso se necessário

### Passo 2: Configurar Projeto

```yaml
Project Name: infostore-frontend
Framework Preset: Create React App
Root Directory: frontend/ # Se frontend está em subpasta
```

### Passo 3: Build Settings

```yaml
Build Command: npm run build
Output Directory: build
Install Command: npm install
Node Version: 18.x
```

### Passo 4: Environment Variables

Adicione as variáveis:

```env
REACT_APP_API_URL=https://api.infostore.ao/api/v2
```

### Passo 5: Deploy

Clique em **"Deploy"**

---

## ⚙️ Configurações Importantes

### vercel.json

Crie arquivo `vercel.json` na raiz do frontend:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      },
      "dest": "/static/$1"
    },
    {
      "src": "/favicon.ico",
      "dest": "/favicon.ico"
    },
    {
      "src": "/logo(.*)",
      "dest": "/logo$1"
    },
    {
      "src": "/manifest.json",
      "dest": "/manifest.json"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "REACT_APP_API_URL": "@react_app_api_url"
  }
}
```

### Rewrites para SPA

Importante para React Router funcionar:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 🔐 Variáveis de Ambiente

### Adicionar via Dashboard

1. Acesse projeto no Vercel
2. Va em **Settings** → **Environment Variables**
3. Adicione:

| Name                | Value                                     | Environments |
| ------------------- | ----------------------------------------- | ------------ |
| `REACT_APP_API_URL` | `https://api.infostore.ao/api/v2`         | Production   |
| `REACT_APP_API_URL` | `https://api-staging.infostore.ao/api/v2` | Preview      |
| `REACT_APP_API_URL` | `http://localhost:8000/api/v2`            | Development  |

### Adicionar via CLI

```bash
# Production
vercel env add REACT_APP_API_URL production

# Preview
vercel env add REACT_APP_API_URL preview

# Development
vercel env add REACT_APP_API_URL development
```

### Verificar Variáveis

```bash
vercel env ls
```

---

## 🌐 Backend CORS Setup

**CRÍTICO**: Configure CORS no backend para aceitar domínio Vercel:

```python
# Backend/infostore/settings.py

CORS_ALLOWED_ORIGINS = [
    "https://infostore-frontend.vercel.app",  # Seu domínio Vercel
    "https://infostore.ao",                   # Domínio customizado (se houver)
    "http://localhost:3000",                   # Desenvolvimento
]

CORS_ALLOW_CREDENTIALS = True
```

---

## 🛠️ Troubleshooting

### 1. Build Failed

**Erro**: `npm ERR! code ELIFECYCLE`

**Solução**:

```bash
# Limpar e reinstalar dependências
rm -rf node_modules package-lock.json
npm install
npm run build  # Testar localmente

# Push changes
git add .
git commit -m "fix: rebuild dependencies"
git push
```

### 2. 404 em Rotas

**Problema**: Rotas React retornam 404

**Solução**: Adicionar rewrites no `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 3. Imagens Não Carregam

**Problema**: CORS blocking images

**Solução**:

1. Verifique CORS no backend
2. Confirme `REACT_APP_API_URL` está correto
3. Verifique que backend aceita requests de `*.vercel.app`

### 4. API Calls Falham

**Problema**: `ERR_CONNECTION_REFUSED`

**Solução**:

```bash
# Verificar variável de ambiente
vercel env ls

# Re-adicionar se necessário
vercel env rm REACT_APP_API_URL production
vercel env add REACT_APP_API_URL production
# Cole: https://api.infostore.ao/api/v2

# Redeploy
vercel --prod --force
```

### 5. Variáveis Antigas

**Problema**: Mudanças em .env não aplicam

**Motivo**: Vercel cacheia build

**Solução**:

```bash
# Force rebuild
vercel --prod --force
```

### 6. Slow Build

**Problema**: Build demora muito

**Soluções**:

1. Verificar tamanho de dependências
2. Remover packages não usadas
3. Ativar cache:

```json
{
  "github": {
    "silent": true
  },
  "build": {
    "env": {
      "GENERATE_SOURCEMAP": "false"
    }
  }
}
```

---

## 🎨 Domínio Customizado

### Adicionar Domínio

1. Acesse projeto → **Settings** → **Domains**
2. Clique em **Add Domain**
3. Digite: `infostore.ao` ou `www.infostore.ao`
4. Vercel fornecerá registros DNS

### Configurar DNS

No seu provedor de domínio (ex: GoDaddy, Namecheap):

#### Opção 1: CNAME (Recomendado)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Opção 2: A Record (Apex)

```
Type: A
Name: @
Value: 76.76.21.21  # IP da Vercel
```

### Forçar HTTPS

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

---

## 📊 Monitoramento

### Analytics

Habilite Vercel Analytics:

1. **Settings** → **Analytics**
2. Enable Analytics
3. Visualize métricas em **Analytics** tab

### Logs

```bash
# Ver logs em tempo real
vercel logs [deployment-url]

# Logs de build
vercel logs [deployment-url] --follow
```

---

## 🚀 Deploy Strategies

### Preview Deployments

Cada branch/PR gera preview automático:

```
main → https://infostore-frontend.vercel.app (production)
dev → https://infostore-frontend-git-dev.vercel.app (preview)
feature-x → https://infostore-frontend-git-feature-x.vercel.app (preview)
```

### Production Deployment

Apenas main/production vai para domínio principal:

```bash
# Configurar branch de produção
vercel --prod  # Deploy current branch to production

# Ou via dashboard:
# Settings → Git → Production Branch: main
```

---

## 🔒 Security Headers

Adicione em `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

## ✅ Checklist Final

Antes de deploy em produção:

- [ ] Build funciona localmente (`npm run build`)
- [ ] Backend está online e acessível
- [ ] CORS configurado no backend
- [ ] Variável `REACT_APP_API_URL` configurada
- [ ] `vercel.json` criado com rewrites
- [ ] Teste em preview deployment
- [ ] DNS configurado (se domínio customizado)
- [ ] HTTPS funcionando
- [ ] Analytics habilitado
- [ ] Monitoring configurado

---

## 📚 Recursos Úteis

- [Vercel Docs](https://vercel.com/docs)
- [Create React App Deploy](https://create-react-app.dev/docs/deployment/#vercel)
- [Vercel CLI Docs](https://vercel.com/docs/cli)
- [Environment Variables](https://vercel.com/docs/environment-variables)

---

## 🆘 Suporte

Se encontrar problemas:

1. Consulte [Vercel Discussions](https://github.com/vercel/vercel/discussions)
2. Check [Status Page](https://www.vercel-status.com/)
3. Contate: andersonpaulo931@gmail.com

---

**Deploy bem-sucedido? Não esqueça de atualizar o README com a URL do seu site! 🎉**
