# 🚀 Free Tier Deployment Guide

## Render.com (Free Tier Only)

### Step 1: Create Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (free)
3. **Important**: Choose "Free" plan when prompted

### Step 2: Deploy Your App
1. Click "New" → "Web Service"
2. Connect your GitHub repository: `shiwansh026/StackIt-Minimal-Q-A-Platform`
3. Render will auto-detect the `render.yml` file
4. **Settings to use:**
   - **Name**: `stackit-qa-platform`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `cd Backend && npm start`
   - **Plan**: **Free** (make sure this is selected)

### Step 3: Environment Variables (Free)
Add these in Render dashboard:
```
NODE_ENV=production
PORT=10000
JWT_SECRET=your_secret_key_here
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for build to complete
3. Get your free URL (like: `https://stackit-qa-platform.onrender.com`)

---

## Alternative: Railway.com (Free Tier)

### Step 1: Create Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. **Important**: Use free tier only

### Step 2: Deploy
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Railway will auto-detect `railway.json`

### Step 3: Environment Variables
Add these in Railway dashboard:
```
NODE_ENV=production
JWT_SECRET=your_secret_key_here
```

---

## ⚠️ Important Notes

### Free Tier Limitations:
- **Render**: 750 hours/month free
- **Railway**: $5 credit/month (usually enough for small projects)
- **No databases** on free tier (app will work without database)
- **Auto-sleep** after inactivity (wakes up on first request)

### What Works Without Database:
- ✅ Frontend loads
- ✅ Authentication UI
- ✅ Static content
- ⚠️ Questions/Answers (will show empty state)

### To Avoid Payment Prompts:
- **Never** select "Pro" or "Paid" plans
- **Don't** add databases (they require payment)
- **Use** only free tier features
- **Skip** any "upgrade" prompts

---

## 🎯 Quick Deploy Commands

After setting up your repository, just:
1. Go to Render.com
2. Connect your GitHub repo
3. Click "Deploy"
4. Wait for build
5. Get your free URL!

**Your app will be live on a free URL!** 🚀 