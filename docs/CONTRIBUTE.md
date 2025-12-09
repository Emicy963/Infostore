# 🤝 Guia de Contribuição - Infostore Frontend v2.0

Obrigado pelo interesse em contribuir com o projeto Infostore! Este guia vai te ajudar a começar com React development.

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Setup do Ambiente](#setup-do-ambiente)
- [Tipos de Contribuição](#tipos-de-contribuição)
- [Padrões de Código](#padrões-de-código)
- [Processo de Development](#processo-de-development)
- [Testing](#testing)
- [Pull Requests](#pull-requests)
- [Documentação](#documentação)

---

## 🚀 Como Contribuir

### 1. Fork do Repositório

```bash
# Clone seu fork
git clone https://github.com/SEU-USUARIO/Infostore.git
cd Infostore/frontend

# Adicionar upstream
git remote add upstream https://github.com/Emicy963/Infostore.git
```

### 2. Criar Branch

```bash
# Atualizar main
git checkout main
git pull upstream main

# Criar feature branch
git checkout -b feature/nome-da-feature

# Convenções de nome:
# feature/add-product-filters
# fix/cart-total-calculation
# docs/update-readme
# refactor/optimize-images
```

---

## ⚙️ Setup do Ambiente

### Pré-requisitos

- Node.js 16.x ou superior
- npm ou yarn
- Git
- Editor: VS Code (recomendado)

### Instalação

```bash
# Clone e entre no diretório
cd frontend

# Instalar dependências
npm install

# Configurar environment
cp .env.example .env
# Editar .env com suas configs

# Iniciar dev server
npm start
```

### VS Code Extensions (Recomendadas)

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.emmetCompletions": true
}
```

---

## 🎯 Tipos de Contribuição

### 🐛 Bug Fixes

- Correção de erros de lógica
- Fixes de UI/UX
- Correção de performance
- Segurança

### ✨ Features

- Novos componentes
- Novas páginas
- Integrações
- Funcionalidades de UX

### 📚 Documentação

- README, CHANGELOG
- Comentários inline
- Guias e tutoriais
- JSDoc

### 🎨 UI/UX

- Design improvements
- Responsiveness
- Accessibility
- Animações

### ⚡ Performance

- Otimizações de bundle
- Lazy loading
- Caching
- Memoization

---

## 📏 Padrões de Código

### React Components

#### Functional Components (Preferido)

```jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    // Effect logic
  }, [product.id]);

  return (
    <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg`}>
      {/* Component content */}
    </div>
  );
};

export default ProductCard;
```

#### Props e PropTypes

```jsx
import PropTypes from "prop-types";

const ProductCard = ({ product, onAddToCart }) => {
  // Component logic
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

ProductCard.defaultProps = {
  onAddToCart: () => {},
};
```

### Hooks Best Practices

```jsx
// ✅ Bom - Custom hooks
const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct(productId).then(setProduct);
  }, [productId]);

  return { product, loading };
};

// ✅ Bom - Memoization
const ExpensiveComponent = memo(({ data }) => {
  return <div>{data}</div>;
});

// ✅ Bom - useCallback
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### Tailwind CSS

```jsx
// ✅ Bom - Classes utilitárias
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// ✅ Bom - Responsive
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">

// ✅ Bom - Conditional
<div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

// ❌ Evitar - Inline styles
<div style={{ padding: '16px' }}>
```

### File Naming

```
components/
├── common/
│   ├── Navbar.js          // PascalCase para componentes
│   └── ProductCard.js
├── pages/
│   └── ProductDetail.js
contexts/
└── AuthContext.js         // PascalCase para contexts
utils/
└── imageHelper.js         // camelCase para utilities
services/
└── api.js                 // camelCase para services
```

### Import Order

```jsx
// 1. React imports
import React, { useState, useEffect } from "react";

// 2. Third-party imports
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

// 3. Local imports - Contexts
import { useCart } from "../../contexts/CartContext";

// 4. Local imports - Components
import ProductCard from "../common/ProductCard";

// 5. Local imports - Utils/Services
import api from "../../services/api";
import { formatPrice } from "../../utils/imageHelper";

// 6. CSS imports
import "./ProductList.css";
```

---

## 🔧 Processo de Development

### 1. Planejamento

- Abrir/comentar em issue existente
- Definir scope claro
- Verificar se não duplica feature

### 2. Development

```bash
# Criar branch
git checkout -b feature/minha-feature

# Desenvolver com commits frequentes
git add .
git commit -m "feat: adicionar filtro de preço"

# Manter atualizado
git pull upstream main
git rebase main
```

### 3. Commit Messages

Seguir [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adicionar busca de produtos
fix: corrigir cálculo do carrinho
docs: atualizar README
style: formatar código
refactor: otimizar ProductCard
perf: implementar lazy loading
test: adicionar testes do Cart
chore: atualizar dependências
```

Exemplos:

```bash
git commit -m "feat(cart): implementar cupons de desconto"
git commit -m "fix(auth): corrigir erro de token expirado"
git commit -m "perf(images): adicionar lazy loading"
```

### 4. Testing

```bash
# Testar localmente
npm start

# Build de produção
npm run build

# Verificar bundle size
npm run build --stats

# Testar em diferentes dispositivos
# - Mobile (375px, 414px)
# - Tablet (768px, 1024px)
# - Desktop (1280px, 1920px)

# Testar em diferentes navegadores
# - Chrome
# - Firefox
# - Safari
# - Edge
```

###5. Code Review Self-Checklist

- [ ] Código funciona sem errors
- [ ] Código segue padrões do projeto
- [ ] Responsivo em todos breakpoints
- [ ] Dark mode funciona
- [ ] Sem console.logs
- [ ] PropTypes definidos
- [ ] Performance otimizada
- [ ] Documentação atualizada

---

## 🧪 Testing

### Manual Testing

```bash
# Cenários críticos
1. Login/Logout
2. Adicionar produto ao carrinho
3. Remover produto do carrinho
4. Finalizar pedido
5. Busca de produtos
6. Filtros
7. Dark mode toggle
8. Navegação entre páginas
```

### User Flows

```
Fluxo de Compra:
1. Home → Ver produto
2. Product Detail → Adicionar ao carrinho
3. Cart → Atualizar quantidade
4. Checkout → Preencher dados
5. Order Confirmation → Ver pedido

Fluxo de Autenticação:
1. Login → Entrar credenciais
2. JWT token → Salvar localStorage
3. Protected routes → Acessar conta
4. Logout → Limpar token
```

---

## 🔄 Pull Requests

### Preparando PR

```bash
# Atualizar com upstream
git fetch upstream
git rebase upstream/main

# Push para seu fork
git push origin feature/minha-feature

# Se já fez push antes e deu rebase
git push origin feature/minha-feature --force-with-lease
```

### Template de PR

```markdown
## Descrição

Breve descrição do que foi implementado/corrigido.

## Tipo de Mudança

- [ ] Bug fix (non-breaking)
- [ ] Nova feature (non-breaking)
- [ ] Breaking change
- [ ] Documentação

## Como Testar

1. Clone PR: `git checkout feature/minha-feature`
2. Instale: `npm install`
3. Rode: `npm start`
4. Teste: [descrever cenários]

## Screenshots

[Adicionar screenshots se UI mudou]

## Checklist

- [ ] Código segue style guides
- [ ] Testado em Chrome, Firefox, Safari
- [ ] Testado em mobile e desktop
- [ ] Dark mode funciona
- [ ] Sem console.logs
- [ ] Documentação atualizada
- [ ] CHANGELOG atualizado (se necessário)
```

### Code Review

Após abrir PR:

- Aguardar review de mantenedores
- Responder comentários
- Fazer ajustes solicitados
- Re-request review após changes

---

## 📚 Documentação

### JSDoc para Utilities

```jsx
/**
 * Formata preço para moeda angolana
 * @param {number|string} price - Preço a formatar
 * @returns {string} Preço formatado (ex: "250.000,00")
 * @example
 * formatPrice(250000) // "250.000,00"
 */
export const formatPrice = (price) => {
  // Implementation
};
```

### README Components

Ao criar componente complexo, adicionar no README:

```markdown
### ProductCard

Componente de card de produto reutilizável.

**Props:**

- `product` (object, required): Dados do produto
- `onAddToCart` (function): Callback ao adicionar no carrinho
- `showWishlist` (boolean): Mostrar botão wishlist

**Example:**
\`\`\`jsx
<ProductCard 
  product={product}
  onAddToCart={handleAddToCart}
  showWishlist={true}
/>
\`\`\`
```

---

## 🎨 UI/UX Guidelines

### Design Tokens (Tailwind)

```jsx
// Cores primárias
text - primary; // Azul principal
bg - primary; // Background azul
border - primary; // Borda azul

// Dark mode
dark: bg - gray - 800;
dark: text - white;

// Spacing
p - 4, p - 6, p - 8; // Padding padrão
gap - 4, gap - 6; // Gap em flex/grid

// Rounded
rounded - lg; // Cards
rounded - full; // Buttons/badges

// Shadows
shadow - md; // Cards
shadow - lg; // Modals
hover: shadow - xl; // Hover effects
```

### Accessibility

```jsx
// ✅ Alt text em imagens
<img src={product.image} alt={product.name} />

// ✅ Aria labels
<button aria-label="Adicionar ao carrinho">
  <FaShoppingCart />
</button>

// ✅ Keyboard navigation
<Link to="/product" tabIndex={0}>

// ✅ Semantic HTML
<nav>, <main>, <article>, <section>
```

---

## 📱 Prioridades Atuais

### Alta Prioridade

- ⚡ Performance optimization
- 🐛 Critical bug fixes
- ♿ Accessibility improvements
- 📱 Mobile UX enhancements

### Média Prioridade

- ✨ New features (roadmap v2.1)
- 🎨 UI polish
- 📊 Analytics integration
- 🔍 SEO improvements

### Baixa Prioridade

- 🌍 Internationalization
- 🎮 Easter eggs
- 📈 Advanced dashboards

---

## 🏆 Reconhecimento

Contribuidores ativos receberão:

- 📜 Crédito no README
- 🎖️ Badges no perfil GitHub
- 📢 Menção em release notes
- 🎁 Brindes Infostore (contribuições significativas)

---

## 🤔 Precisa de Ajuda?

### Recursos

- [React Docs](https://react.dev/)
- [Tailwind Docs](https://tailwindcss.com/)
- [React Router Docs](https://reactrouter.com/)
- [Axios Docs](https://axios-http.com/)

### Contato

- 📧 Email: andersonpaulo931@gmail.com
- 💼 LinkedIn: [Anderson Cafurica](https://linkedin.com/in/anderson-cafurica-)
- 📱 WhatsApp: +244 928 301 450

---

## 📈 Metas 2025

### Q1

- [ ] 15+ contribuidores ativos
- [ ] 100+ estrelas GitHub
- [ ] Score 95+ Lighthouse
- [ ] 100% responsive

### Q2

- [ ] v2.1.0 lançado
- [ ] 500+ users ativos
- [ ] App mobile MVP
- [ ] Pagamentos integrados

---

**Juntos construímos o melhor e-commerce de Angola! 🇦🇴✨**

Obrigado por contribuir! 🙏

---

<div align="center">

[⬆ Voltar ao topo](#-guia-de-contribuição---infostore-frontend-v20)

</div>
