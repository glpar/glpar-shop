# GLPAR Shop

Loja virtual de camisetas construída com Next.js e integrada ao Stripe. O projeto lista produtos, mostra detalhes, cria uma sessão de checkout e exibe a confirmação da compra.

## Funcionalidades

- catálogo de produtos carregado do Stripe;
- carrossel de produtos;
- página de detalhes de cada item;
- checkout hospedado pelo Stripe;
- página de sucesso após o pagamento;
- renderização estática com Next.js.

## Tecnologias

Next.js, React, TypeScript, Stripe, Stitches, Axios e Keen Slider.

## Como instalar

### Pré-requisitos

- Node.js 18 ou superior;
- npm;
- conta do Stripe em modo de teste, com produtos e preços cadastrados.

```bash
git clone https://github.com/glpar/glpar-shop.git
cd glpar-shop
npm install
cp .env.example .env.local
```

Preencha o arquivo `.env.local`:

```env
STRIPE_SECRET_KEY=sk_test_sua_chave
NEXT_URL=http://localhost:3000
```

Nunca publique a chave secreta do Stripe.

## Como executar e usar

```bash
npm run dev
```

Abra `http://localhost:3000`, escolha um produto, acesse seus detalhes e clique em comprar. Para testes, utilize os cartões de teste fornecidos pelo Stripe.

## Comandos

- `npm run dev`: inicia o ambiente de desenvolvimento;
- `npm run build`: gera a versão de produção;
- `npm start`: executa o build;
- `npm run lint`: verifica o código.

## Observação sobre o build

A geração das páginas consulta produtos do Stripe. Portanto, `npm run build` também precisa receber uma `STRIPE_SECRET_KEY` válida e produtos configurados na conta.
