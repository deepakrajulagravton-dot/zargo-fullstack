# Zargo EV Fleet Management Dashboard

Full-stack fleet management system for Zargo EV Rentals.

## Stack
- **Frontend**: React + TypeScript + Vite → Netlify
- **Backend**: Node.js + Express → Render
- **Database**: MongoDB Atlas

## Quick Deploy

### 1. MongoDB Atlas (Database)
1. Go to mongodb.com/atlas → Create free account
2. Create a free cluster (M0)
3. Create a database user with username/password
4. Whitelist IP: 0.0.0.0/0 (allow all)
5. Copy your connection string

### 2. Backend → Render
1. Push the `backend/` folder to a GitHub repo
2. Go to render.com → New Web Service → connect repo
3. Set environment variables:
   - `MONGO_URI` = your MongoDB connection string
   - `JWT_SECRET` = any random long string (e.g. zargo_secret_2026)
   - `PORT` = 5000
4. After deploy, run the seed: in Render shell run `npm run seed`
5. Copy your Render URL (e.g. https://zargo-backend.onrender.com)

### 3. Frontend → Netlify
1. Push the `frontend/` folder to a GitHub repo
2. Go to netlify.com → Add new site → import from GitHub
3. Set environment variable:
   - `VITE_API_URL` = https://your-backend.onrender.com/api
4. Deploy!

## Login Credentials
- Admin: admin@zargo.in / admin123
- Staff: ravi@zargo.in / staff123
- Staff: meera@zargo.in / staff123
- Staff: asha@zargo.in / staff123
