# Task Manager CRUD App

A full-stack CRUD application built with Next.js. Includes JWT-based authentication and a dashboard for managing tasks.

---

## Features
- Register / Login / Logout (JWT Auth)
- Dashboard with CRUD operations
- API routes via Next.js
- Postman collection included

---

## How to Run Locally
1. Clone the repo  
   `git clone https://github.com/Siddarth474/next-crud-app.git`
2. Install dependencies  
   `npm install`
3. Run the app  
   `npm run dev`
4. App will be available at `http://localhost:3000`

---

## API Testing
All backend endpoints can be tested using the included Postman collection:  
`/postman_collection.json`

---

## Scaling for Production
1. **Deployment:** Host on Vercel (Next.js handles both frontend + backend API routes).  
2. **Environment Management:** Use `.env` for secrets and environment-specific API URLs.  
3. **Database:** Use a managed service like MongoDB Atlas.  
4. **Security:** Enable HTTPS, use httpOnly cookies for JWT, and implement rate limiting.  
5. **Performance:** Enable image optimization and static caching.  
