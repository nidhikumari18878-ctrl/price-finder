# PriceFinder — Full Stack Starter

## 1. Frontend
From the project root:
```bash
npm install
npm run dev
```

## 2. Backend
Open another terminal:
```bash
cd backend
npm install
```

Copy:
```text
backend/.env.example -> backend/.env
```

Make sure MongoDB Server is running, then:
```bash
npm run seed
npm run dev
```

Backend:
- http://localhost:5000
- http://localhost:5000/api/health
- http://localhost:5000/api/products

## Current architecture
React/Vite → Express API → MongoDB

Included:
- Product API
- Product detail API
- MongoDB seed data
- Price history model/API
- Price alert model/API
- Affiliate URL fields
- CORS and environment configuration
- Existing professional responsive UI

## Still to connect later
- Real Amazon/Flipkart affiliate product URLs
- Real shopping/affiliate APIs
- Automated price scraping/provider jobs
- Email/WhatsApp alert delivery
- Authentication/user accounts
- Production deployment and secrets

Never commit `.env` files or real API keys.
