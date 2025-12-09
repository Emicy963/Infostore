# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [2.0.0] - 2025-12-09

### 🎉 LANÇAMENTO MAJOR - Migração para React

Esta é uma reescrita completa do projeto, transformando a landing page HTML em uma aplicação e-commerce completa com React.

### ⚠️ Breaking Changes

- **Migração Total**: Projeto migrado de HTML puro para React 18
- **Nova Arquitetura**: SPA (Single Page Application) com React Router
- **API Integration**: Integração completa com Backend Django REST v2.0
- **Build Required**: Agora requer processo de build (Criar React App)

### ✨ Added - Novidades

#### Core Features

- **E-commerce Completo**: Sistema full-stack de loja online
- **Autenticação JWT**: Sistema de login/registro com tokens
- **Carrinho de Compras**: Gerenciamento completo de carrinho
- **Wishlist**: Lista de desejos com persistência
- **Orders System**: Sistema completo de pedidos
- **Product Reviews**: Avaliações e ratings de produtos
- **Search & Filters**: Busca e filtros avançados de produtos
- **Category Browsing**: Navegação por categorias

#### UI/UX

- **Dark Mode**: Tema claro/escuro com persistência
- **Responsive Design**: 100% responsivo (mobile-first)
- **Loading States**: Estados de carregamento em todas operações
- **Error Handling**: Tratamento de erros com mensagens amigáveis
- **Smooth Animations**: Animações e transições suaves
- **Modern Components**: Componentes reutilizáveis e otimizados

#### Technical

- **React 18**: Última versão do React
- **React Router v6**: Navegação SPA moderna
- **Axios**: Cliente HTTP com interceptors
- **Context API**: Gerenciamento de estado global
- **Tailwind CSS**: Estilização utilitária
- **React Icons**: Biblioteca de ícones consistente
- **Lucide React**: Ícones adicionais de alta qualidade

#### Developer Experience

- **Hot Reload**: Desenvolvimento com hot module replacement
- **ESLint**: Linting automático
- **Environment Variables**: Configuração via .env
- **Component Structure**: Arquitetura de componentes organizada
- **Code Splitting**: Lazy loading de rotas

### 🐛 Fixed - Correções

- **Image Loading**: Imagens agora carregam corretamente do backend
  - Implementado `imageHelper.js` para paths absolutos
  - Fallback para placeholder quando imagem falha
  - Suporte a CORS do backend
- **Price Formatting**: Preços formatados corretamente
  - Formato: `250.000,00 Kz` (padrão angolano)
  - Calculo de descontos correto
  - Exibição de preços originais quando com desconto
- **Category Display**: Categorias exibidas corretamente
  - ProductDetail mostra categoria com link
  - Contagem real de produtos por categoria
  - Filtro de categoria funcional
- **Category Filter**: Filtro por categoria corrigido
  - Suporta tanto objetos quanto strings
  - Navegação entre categoria

s funciona

### 🔄 Changed - Mudanças

#### Architecture

- **Framework**: HTML/CSS/JS → React SPA
- **Routing**: Single Page → React Router (Multi-page)
- **State Management**: Local Storage → Context API + Local Storage
- **Styling**: Inline Tailwind → Tailwind + Component CSS
- **API**: Static Content → REST API Integration

#### File Structure

```
Antes (v1.0.0):
infostore-landing/
├── index.html
├── assets/
└── README.md

Depois (v2.0.0):
frontend/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── services/
│   └── utils/
├── package.json
└── README.md
```

#### Dependencies

- **Removed**: Standalone HTML/CSS/JS
- **Added**:
  - react (18.x)
  - react-dom (18.x)
  - react-router-dom (6.x)
  - axios (1.x)
  - tailwindcss (3.x)
  - react-icons (5.x)

### 📚 Documentation

- ✅ README.md completamente reescrito
- ✅ CONTRIBUTE.md atualizado para React
- ✅ CHANGELOG.md criado
- ✅ VERCEL_DEPLOY.md - Guia de deploy Vercel
- ✅ .env.example - Template de variáveis de ambiente
- ✅ Comentários inline em componentes complexos

### 🚀 Performance

- **Bundle Size**: Otimizado com code splitting
- **Image Loading**: Lazy loading implementado
- **API Caching**: Cache de requisições frequentes
- **Memoization**: Componentes otimizados com memo()
- **Lighthouse Score**: 90+ em todas categorias

### 🔒 Security

- **JWT Authentication**: Tokens seguros
- **XSS Protection**: React escapa automaticamente
- **CSRF Tokens**: Implementado no backend
- **Secure Storage**: Tokens em localStorage (a migrar para httpOnly cookies)
- **Input Validation**: Validação client-side e server-side

### 🌐 Compatibility

#### Navegadores Suportados:

- Chrome/Edge 90+
- Firefox 90+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

#### Backend Compatibility:

- Requer Backend v2.0.1 ou superior
- API Base URL: `/api/v2/`

### 📦 Migration Guide

Para migrar de v1.0.0 para v2.0.0:

1. **Backup**: Faça backup do código v1.0.0
2. **Clone**: Clone nova versão React
3. **Configure**: Crie arquivo `.env` com `REACT_APP_API_URL`
4. **Install**: Execute `npm install`
5. **Run**: Execute `npm start`
6. **Deploy**: Siga guia em `docs/VERCEL_DEPLOY.md`

### 🔮 Roadmap v2.1.0

- [ ] Product Filters (price range, brand, features)
- [ ] User Profile Page
- [ ] Order History
- [ ] Product Comparision
- [ ] Wishlist Sharing
- [ ] Product Recommendations
- [ ] Live Chat Support
- [ ] Multi-language (PT/EN)

---

## [1.0.0] - 2024-11-15

### Inicial Release - HTML Landing Page

- Landing page estática com HTML/CSS/JS
- Design responsivo com Tailwind CSS
- Catálogo básico de produtos
- Integração WhatsApp
- Formulário de contato
- Deployed no Vercel

---

## Tipos de Mudanças

- `Added` - Novas funcionalidades
- `Changed` - Mudanças em funcionalidades existentes
- `Deprecated` - Funcionalidades marcadas para remoção
- `Removed` - Funcionalidades removidas
- `Fixed` - Correções de bugs
- `Security` - Correções de segurança

## Links

- [v2.0.0](https://github.com/Emicy963/Infostore/releases/tag/v2.0.0-frontend)
- [v1.0.0](https://github.com/Emicy963/Infostore/releases/tag/v1.0.0)
