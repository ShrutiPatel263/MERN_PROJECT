# Deployment Guide

This guide will help you deploy CampusBridge to production.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB database (local or cloud like MongoDB Atlas)
- A hosting service for frontend (Vercel, Netlify, etc.)
- A hosting service for backend (Heroku, Railway, Render, etc.)

## Frontend Deployment

### 1. Environment Setup

1. Copy the environment example file:
   ```bash
   cd FRONTEND
   cp env.example .env
   ```

2. Update `.env` with your production backend URL:
   ```
   VITE_API_BASE_URL=https://your-backend-api.com
   ```

### 2. Build for Production

```bash
cd FRONTEND
npm install
npm run build
```

This will create an optimized production build in the `dist` folder.

### 3. Deploy Frontend

#### Option A: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the FRONTEND directory
3. Follow the prompts
4. Add environment variable `VITE_API_BASE_URL` in Vercel dashboard

#### Option B: Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run `netlify deploy --prod` in the FRONTEND directory
3. Add environment variable `VITE_API_BASE_URL` in Netlify dashboard

#### Option C: Static Hosting
- Upload the `dist` folder contents to your static hosting service
- Ensure your server is configured to serve `index.html` for all routes (SPA routing)

## Backend Deployment

### 1. Environment Setup

1. Copy the environment example file:
   ```bash
   cd BACKEND
   cp env.example .env
   ```

2. Update `.env` with your production values:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   ALLOWED_ORIGINS=https://your-frontend-domain.com
   ACCESS_TOKEN_SECRET=generate-a-strong-random-string
   REFRESH_TOKEN_SECRET=generate-a-strong-random-string
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_EXPIRY=7d
   ```

3. Generate secure secrets:
   ```bash
   # On Linux/Mac
   openssl rand -base64 32
   
   # On Windows (PowerShell)
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
   ```

### 2. Deploy Backend

#### Option A: Railway
1. Connect your GitHub repository
2. Select the BACKEND folder
3. Add environment variables in Railway dashboard
4. Deploy

#### Option B: Render
1. Create a new Web Service
2. Connect your repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables in Render dashboard

#### Option C: Heroku
1. Install Heroku CLI
2. Run `heroku create your-app-name`
3. Set environment variables: `heroku config:set KEY=value`
4. Deploy: `git push heroku main`

### 3. MongoDB Setup

#### Option A: MongoDB Atlas (Cloud)
1. Create a free account at mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in your `.env` file

#### Option B: Local MongoDB
- Install MongoDB locally
- Use connection string: `mongodb://localhost:27017`

## Post-Deployment Checklist

- [ ] Frontend is accessible and loads correctly
- [ ] Backend API is responding (check `/health` endpoint)
- [ ] CORS is configured correctly (frontend can call backend)
- [ ] Environment variables are set correctly
- [ ] MongoDB connection is working
- [ ] Authentication flow works (login/register)
- [ ] All API endpoints are functional
- [ ] Error handling is working
- [ ] HTTPS is enabled (for production)

## Troubleshooting

### CORS Errors
- Ensure `ALLOWED_ORIGINS` in backend includes your frontend URL
- Check that URLs don't have trailing slashes

### API Connection Issues
- Verify `VITE_API_BASE_URL` matches your backend URL
- Check backend logs for errors
- Ensure backend is running and accessible

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Review build logs for specific errors

## Security Notes

1. **Never commit `.env` files** - They contain sensitive information
2. **Use strong JWT secrets** - Generate random strings for production
3. **Enable HTTPS** - Always use HTTPS in production
4. **Set NODE_ENV=production** - This enables production optimizations
5. **Review CORS settings** - Only allow trusted origins

## Monitoring

Consider setting up:
- Error tracking (Sentry, LogRocket)
- Performance monitoring
- Uptime monitoring
- Database monitoring

## Support

For issues or questions, check the project documentation or contact the development team.

