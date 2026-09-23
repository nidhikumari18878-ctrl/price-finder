# PriceFinder

A polished React + Vite price-comparison frontend. The current build uses demo product data and is structured to connect to a real API, database and affiliate network later.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Frontend currently includes

- Responsive landing page
- Product search
- Category filters
- Budget slider and presets
- Sorting by price/rating
- Product cards with discounts, ratings and savings
- Product detail pages
- Multi-store offer comparison UI
- Price-alert UI with browser localStorage
- Mobile navigation
- Empty states and responsive layouts
- Animation and interaction polish
- API-ready service layer in `src/services/productService.js`
- Environment configuration in `.env.example`

## Next backend connection

The UI is intentionally independent from the backend. When ready, connect:

1. Product/catalog API
2. Store/affiliate product URLs
3. Live price refresh jobs
4. PostgreSQL/MySQL/MongoDB database
5. User accounts and saved alerts
6. Email/WhatsApp/push notifications
7. Price history and charts
8. Admin dashboard for products, stores and affiliate links

The demo UI should not be treated as live marketplace pricing until real data providers are connected.
