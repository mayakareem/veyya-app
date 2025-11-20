# Veyya App - Deployment Guide

## 🚀 How to Deploy to Vercel

This guide will help you deploy the Veyya provider onboarding pages to Vercel so anyone can view them online.

---

## Prerequisites

Before you start, make sure you have:
- A GitHub account (sign up at https://github.com)
- A Vercel account (sign up at https://vercel.com - you can use your GitHub account)
- Git installed on your computer

---

## Step 1: Push Your Code to GitHub

### 1.1 Create a New Repository on GitHub

1. Go to https://github.com
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `veyya-app` (or any name you prefer)
   - **Description**: "Veyya marketplace app with provider onboarding"
   - **Visibility**: Choose **Public** (so anyone can see the code) or **Private**
   - **DO NOT** check "Initialize this repository with a README"
5. Click **"Create repository"**

### 1.2 Connect Your Local Code to GitHub

After creating the repository, GitHub will show you instructions. Follow these commands:

```bash
# Navigate to your project folder (you're already here)
cd /Users/sindhusreenath/Projects/veyya/app-prototype

# Add GitHub as a remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/veyya-app.git

# Verify the remote was added
git remote -v

# Push your code to GitHub
git push -u origin main
```

**Note:** If `git push` asks for authentication:
- You may need to use a Personal Access Token instead of your password
- Go to GitHub Settings → Developer Settings → Personal Access Tokens → Generate new token
- Give it `repo` permissions
- Use the token as your password when prompted

### 1.3 Verify Your Code is on GitHub

1. Go to `https://github.com/YOUR_USERNAME/veyya-app`
2. You should see all your files there!

---

## Step 2: Deploy to Vercel

### 2.1 Sign Up / Log In to Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### 2.2 Import Your Repository

1. Once logged in, click **"Add New Project"**
2. You'll see a list of your GitHub repositories
3. Find **"veyya-app"** (or whatever you named it)
4. Click **"Import"**

### 2.3 Configure Project Settings

Vercel will automatically detect that this is a Next.js project. You'll see:

- **Framework Preset**: Next.js ✅ (auto-detected)
- **Root Directory**: `./` (default is fine)
- **Build Command**: `pnpm build` ✅ (auto-detected)
- **Output Directory**: `.next` ✅ (auto-detected)

**Important Environment Variables:**

Click **"Environment Variables"** and add these:

1. **For Database** (if you want full functionality):
   ```
   DATABASE_URL = your_postgresql_database_url
   ```

2. **For Authentication**:
   ```
   NEXTAUTH_URL = https://your-project.vercel.app (you'll get this after first deploy)
   NEXTAUTH_SECRET = your_random_secret_string
   ```

**For now, you can skip environment variables** if you just want to view the static pages (providers landing, onboarding form, service pact).

### 2.4 Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. You'll see a success screen with confetti! 🎉
4. Click **"Visit"** to see your live site

---

## Step 3: Access Your Deployed Pages

Your site will be live at: `https://your-project-name.vercel.app`

### Public Pages (No Login Required):

✅ **Provider Landing Page**:
```
https://your-project-name.vercel.app/providers
```

✅ **Provider Onboarding Form**:
```
https://your-project-name.vercel.app/provider/onboarding/form
```

✅ **Service Pact**:
```
https://your-project-name.vercel.app/provider/onboarding/service-pact
```

✅ **Verification Page**:
```
https://your-project-name.vercel.app/provider/onboarding/verification
```

✅ **Main Onboarding Landing**:
```
https://your-project-name.vercel.app/provider/onboarding
```

### Share These Links!

You can now share these URLs with anyone - they'll be able to view the provider onboarding flow!

---

## Step 4: Making Updates

Whenever you make changes to your code:

### 4.1 Commit Your Changes Locally

```bash
# Add all changed files
git add .

# Commit with a message
git commit -m "Description of your changes"
```

### 4.2 Push to GitHub

```bash
git push origin main
```

### 4.3 Automatic Deployment

Vercel automatically deploys when you push to GitHub!
- Every push to `main` branch triggers a new deployment
- You'll get an email notification when deployment is complete
- The site automatically updates

---

## Custom Domain (Optional)

Want a custom domain like `veyya.com` instead of `your-project.vercel.app`?

1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Vercel provides free SSL certificates!

---

## Troubleshooting

### Build Fails

**Issue**: Deployment fails during build
**Solution**: Check the build logs in Vercel dashboard. Common issues:
- Missing environment variables
- TypeScript errors
- Missing dependencies

### Pages Return 500 Error

**Issue**: Pages show error 500
**Solution**:
- Check that you've added `DATABASE_URL` if pages need database access
- For static pages (providers landing, forms), this shouldn't happen

### Authentication Errors

**Issue**: Middleware authentication errors
**Solution**: These are expected for protected routes. The public onboarding pages should work fine without authentication.

---

## What's Deployed?

Your deployment includes:

### ✅ Public Pages (Anyone can view):
- Provider marketing landing with Veyya Academy
- 4-step onboarding form
- 8-screen service pact with digital signature
- Document verification page

### 🔒 Protected Pages (Require login):
- Provider dashboard (`/provider/dashboard`)
- Admin pages (`/admin/*`)
- User dashboard (`/user/*`)

---

## Need Help?

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **GitHub Help**: https://docs.github.com

---

## Quick Reference Commands

```bash
# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub (triggers Vercel deployment)
git push origin main

# View git remote
git remote -v

# Check current branch
git branch
```

---

## Summary

1. ✅ Create GitHub repository
2. ✅ Push code: `git push -u origin main`
3. ✅ Sign up at https://vercel.com with GitHub
4. ✅ Import your repository
5. ✅ Click Deploy
6. ✅ Share your live URLs!

**Your live site**: `https://your-project-name.vercel.app`

---

## Project Structure

```
app-prototype/
├── src/
│   ├── app/
│   │   ├── providers/page.tsx              → /providers
│   │   └── provider/
│   │       └── onboarding/
│   │           ├── page.tsx                → /provider/onboarding
│   │           ├── form/page.tsx           → /provider/onboarding/form
│   │           ├── service-pact/page.tsx   → /provider/onboarding/service-pact
│   │           └── verification/page.tsx   → /provider/onboarding/verification
│   ├── components/
│   ├── lib/
│   └── proxy.ts (middleware)
├── package.json
├── next.config.ts
└── DEPLOYMENT_GUIDE.md (this file)
```

---

**🎉 Congratulations! Your Veyya app is now live on the internet!**
