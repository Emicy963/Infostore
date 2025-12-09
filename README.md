# 🛍️ Infostore Frontend v2.0 - E-commerce React Application

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Status](https://img.shields.io/badge/Status-Production-success)

> **E-commerce moderno e completo desenvolvido em React para venda de computadores e eletrônicos em Angola.**

[🌐 Demo ao Vivo](https://infostore-tau.vercel.app/) | [📖 Documentação](docs/) | [🐛 Reportar Bug](https://github.com/Emicy963/Infostore/issues) | [💡 Solicitar Feature](https://github.com/Emicy963/Infostore/issues)

---

## 📋 Sobre o Projeto

**Infostore v2.0** é uma aplicação e-commerce full-stack desenvolvida com as melhores práticas modernas de desenvolvimento web. Esta é a evolução da landing page v1.0, agora transformada em uma plataforma completa de vendas online integrada com backend Django REST.

### 🎯 Principais Funcionalidades

#### 🛒 E-commerce

- **Catálogo Completo**: Navegue por produtos com imagens, descrições e preços
- **Busca Avançada**: Encontre produtos rapidamente com busca em tempo real
- **Filtros por Categoria**: Organize produtos por tipo, marca e especificações
- **Carrinho de Compras**: Adicione, remova e gerencie items no carrinho
- **Lista de Desejos**: Salve produtos favoritos para comprar depois
- **Sistema de Pedidos**: Acompanhe seus pedidos do início ao fim

####👤 Autenticação & Usuário

- **Registro/Login JWT**: Autenticação segura com tokens
- **Perfil de Usuário**: Gerencie seus dados pessoais
- **Histórico de Pedidos**: Visualize todos os pedidos realizados
- **Wishlist Persistente**: Lista de desejos salva na conta

#### 🎨 Interface & UX

- **Dark Mode**: Alterne entre tema claro e escuro
- **100% Responsivo**: Funciona perfeitamente em mobile, tablet e desktop
- **Animações Suaves**: Micro-interações que melhoram a experiência
- **Loading States**: Feedback visual em todas as ações
- **Error Handling**: Mensagens de erro amigáveis e úteis

#### ⚡ Performance

- **Lazy Loading**: Imagens e rotas carregadas sob demanda
- **Code Splitting**: Build otimizado com chunks separados
- **API Caching**: Cache inteligente de requisições
- **Memoization**: Componentes otimizados com React.memo()

---

## 🚀 Tecnologias

### Core

- **[React 18](https://reactjs.org/)** - UI Library
- **[React Router v6](https://reactrouter.com/)** - Client-side routing
- **[Axios](https://axios-http.com/)** - HTTP Client
- **[Context API](https://react.dev/reference/react/useContext)** - State Management

### Styling & UI

- **[Tailwind CSS 3](https://tailwindcss.com/)** - Utility-first CSS
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **[Lucide React](https://lucide.dev/)** - Modern icons

### Development

- **[Create React App](https://create-react-app.dev/)** - Build tooling
- **[ESLint](https://eslint.org/)** - Linting
- **[PostCSS](https://postcss.org/)** - CSS processing

---

## 📦 Instalação e Configuração

### Pré-requisitos

- Node.js 16.x ou superior
- npm ou yarn
- Backend Django rodando (v2.0.1+)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Emicy963/Infostore.git
cd Infostore/frontend

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env

# Edite .env e configure REACT_APP_API_URL
# REACT_APP_API_URL=http://localhost:8000/api/v2

# Inicie o servidor de desenvolvimento
npm start
```

O aplicativo abrirá em `http://localhost:3000`

### Build para Produção

```bash
# Criar build otimizado
npm run build

# A pasta build/ conterá os arquivos estáticos prontos para deploy
```

---

## 📁 Estrutura do Projeto

```md
frontend/
├── public/                     # Arquivos estáticos
│   ├── favicon.ico
│   ├── logo.png
│   ├── logo192.png
│   ├── logo512.png
│   └── manifest.json
│
├── src/
│   ├── components/            # Componentes React
│   │   ├── common/           # Componentes reutilizáveis
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── ProductCard.js
│   │   └── pages/            # Páginas/Views
│   │       ├── Home.js
│   │       ├── ProductList.js
│   │       ├── ProductDetail.js
│   │       ├── Cart.js
│   │       ├── Login.js
│   │       └── Register.js
│   │
│   ├── contexts/             # Context API
│   │   ├── AuthContext.js    # Autenticação
│   │   ├── CartContext.js    # Carrinho
│   │   └── ThemeContext.js   # Tema (dark mode)
│   │
│   ├── services/             # API & Services
│   │   └── api.js           # Axios instance configurado
│   │
│   ├── utils/                # Utilitários
│   │   └── imageHelper.js   # Helpers de imagem e formatação
│   │
│   ├── App.js               # Componente raiz
│   ├── index.js             # Entry point
│   └── index.css            # Estilos globais
│
├── docs/                     # Documentação
│   ├── CONTRIBUTE.md        # Guia de contribuição
│   └── VERCEL_DEPLOY.md     # Guia de deploy Vercel
│
├── .env.example             # Template de variáveis
├── .gitignore
├── CHANGELOG.md             # Histórico de mudanças
├── package.json
├── README.md
├── tailwind.config.js       # Configuração Tailwind
└── vercel.json              # Configuração Vercel
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie arquivo `.env` na raiz do frontend:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:8000/api/v2

# Opcional: URL de media se diferente
# REACT_APP_MEDIA_URL=http://localhost:8000/media/

# Opcional: Debug mode
# REACT_APP_DEBUG=true
```

### Backend Integration

O frontend espera que o backend esteja em:

- **Development**: `http://localhost:8000`
- **Production**: Configure via `REACT_APP_API_URL`

**Importante**: Configure CORS no backend para aceitar requests do frontend.

---

## 🖼️ Imagens & Assets

### Estrutura de Imagens

- **Produtos**: Servidos do backend via `/media/product_img/`
- **Categorias**: Servidos do backend via `/media/category_img/`
- **Logos/Icons**: Em `/public/`

### Guidelines

| Tipo        | Dimensões        | Formato | Localização           |
| ----------- | ---------------- | ------- | --------------------- |
| Produto     | 800x800px        | JPG/PNG | Backend media         |
| Categoria   | 1200x400px       | JPG/PNG | Backend media         |
| Logo Header | 256x256px        | PNG     | `/public/logo.png`    |
| Favicon     | Multi-size       | ICO     | `/public/favicon.ico` |
| PWA Icons   | 192x192, 512x512 | PNG     | `/public/`            |

### Troubleshooting Imagens

**Problema**: Imagens não carregam (404)

**Soluções**:

1. Verifique `REACT_APP_API_URL` em `.env`
2. Confirme backend está rodando
3. Verifique CORS no backend
4. Reinicie dev server após mudar `.env`

---

## 🚀 Deploy

### Vercel (Recomendado)

Deploy automático com GitHub:

```bash
# Via Vercel CLI
npm install -g vercel
vercel

# Ou use botão
```

[![Deploy com Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Emicy963/Infostore/tree/main/frontend)

**Guia completo**: [docs/VERCEL_DEPLOY.md](docs/VERCEL_DEPLOY.md)

### Outros Provedores

- **Netlify**: Suportado
- **GitHub Pages**: Requer configuração adicional
- **AWS S3 + CloudFront**: Suportado

---

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm start          # Inicia dev server (localhost:3000)

# Build
npm run build      # Build de produção

# Testes
npm test           # Roda testes (se configurado)

# Linting
npm run lint       # Verifica código

# Formatação
npm run format     # Formata código (se configurado)
```

---

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! 🎉

1. **Fork** o projeto
2. Crie uma **branch** (`git checkout -b feature/NovaFeature`)
3. **Commit** suas mudanças (`git commit -m 'feat: adicionar NovaFeature'`)
4. **Push** para branch (`git push origin feature/NovaFeature`)
5. Abra um **Pull Request**

Veja [CONTRIBUTE.md](docs/CONTRIBUTE.md) para detalhes.

### Áreas para Contribuição

- 🐛 Correção de bugs
- ✨ Novas funcionalidades
- 📱 Melhorias de UX/UI
- 📖 Documentação
- 🌐 Traduções
- ⚡ Otimizações de performance

---

## 📊 Roadmap

### v2.1.0 (Próximo Release)

- [ ] Filtros avançados de produtos
- [ ] Comparação de produtos
- [ ] Recomendações personalizadas
- [ ] Compartilhamento de wishlist
- [ ] Profile page completo
- [ ] Order tracking em tempo real

### v2.2.0

- [ ] Chat ao vivo
- [ ] Sistema de cupons/descontos
- [ ] Programa de fidelidade
- [ ] Multi-idioma (PT/EN/FR)
- [ ] PWA offline support

### v3.0.0

- [ ] App mobile (React Native)
- [ ] Pagamentos integrados
- [ ] Sistema de notificações
- [ ] Dashboard do vendedor

---

## 🐛 Bug Reports & Feature Requests

Encontrou um bug ou tem uma sugestão?

- 🐛 [Reportar Bug](https://github.com/Emicy963/Infostore/issues/new?labels=bug)
- 💡 [Solicitar Feature](https://github.com/Emicy963/Infostore/issues/new?labels=enhancement)

---

## 📞 Contato & Suporte

**Desenvolvedor**: Anderson Cafurica

- 📧 Email: [andersonpaulo931@gmail.com](mailto:andersonpaulo931@gmail.com)
- 💼 LinkedIn: [Anderson Cafurica](https://linkedin.com/in/anderson-cafurica-)
- 🐙 GitHub: [@Emicy963](https://github.com/Emicy963)
- 📱 WhatsApp: [+244 928 301 450](https://wa.me/244928301450)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.

---

## 🙏 Agradecimentos

- [React Team](https://react.dev/) - Framework incrível
- [Tailwind Labs](https://tailwindcss.com/) - CSS utility framework
- [Vercel](https://vercel.com/) - Hosting e deployment
- [Unsplash](https://unsplash.com/) - Imagens de alta qualidade
- Comunidade Open Source - Pelo suporte contínuo

---

## 📈 Status do Projeto

- ✅ **v1.0.0** - Landing page HTML (Deprecated)
- ✅ **v2.0.0** - React E-commerce (Current)
- 🚧 **v2.1.0** - Em desenvolvimento

---

## 🌟 Mostre seu Apoio

Se este projeto te ajudou, considere:

- ⭐ Dar uma estrela no GitHub
- 🐛 Reportar bugs
- 💡 Sugerir melhorias
- 🤝 Contribuir com código
- 📢 Compartilhar com outros

---

<div align="center">

**Desenvolvido com ❤️ em Angola para o mundo 🇦🇴**

[⬆ Voltar ao topo](#-infostore-frontend-v20---e-commerce-react-application)

</div>
