# Vercel Deployment - Quick Setup Guide

## Your Generated Secrets (Use These in Vercel)

```env
APP_KEYS=HagakBLnw6hK3sVQoXmxvg==,C3wqrGidKBkm0Ejc5n/t8A==,exGeApoiYoDMpUd0f2Wb7A==,c2tNX2yOSD3ZU1XShsrYdQ==
API_TOKEN_SALT=9hOWpMg8RhrsMTAbMQPTow==
ADMIN_JWT_SECRET=6GppBxeRfLW6ITLhtAcSFA==
TRANSFER_TOKEN_SALT=7cX8gnSxKy7HVmFkOTHHzw==
JWT_SECRET=41QRsCdp7tK0ta+LU23MpA==
```

## Step 1: Set Up Database (Choose One)

### Option A: Neon (Recommended - Free)
1. Go to https://neon.tech
2. Sign up / Log in
3. Click "New Project"
4. Name it "veyya-strapi"
5. Copy the connection string (looks like: postgresql://user:pass@host.neon.tech/dbname)

### Option B: Supabase
1. Go to https://supabase.com
2. Create new project
3. Settings → Database → Connection String → Connection Pooling
4. Copy the connection string

### Option C: Vercel Postgres
1. In Vercel dashboard → Storage → Create Database
2. Select Postgres
3. Connection string will be auto-added as DATABASE_URL

## Step 2: Deploy to Vercel

Run this command:
```bash
cd /Users/sindhusreenath/Projects/veyya/admin-strapi
npx vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? (Select your account)
- Link to existing project? **N**
- Project name? **admin-strapi**
- Directory? **./admin-strapi** (or just press Enter)
- Override settings? **N**

## Step 3: Add Environment Variables

After deployment, add these environment variables in Vercel:

```bash
# Option 1: Via Vercel Dashboard
# Go to: https://vercel.com/your-username/admin-strapi/settings/environment-variables

# Option 2: Via CLI (faster)
cd /Users/sindhusreenath/Projects/veyya/admin-strapi

# Server config
vercel env add HOST
# Enter: 0.0.0.0

vercel env add PORT
# Enter: 1337

vercel env add NODE_ENV
# Enter: production

# Security keys (generated above)
vercel env add APP_KEYS
# Paste: HagakBLnw6hK3sVQoXmxvg==,C3wqrGidKBkm0Ejc5n/t8A==,exGeApoiYoDMpUd0f2Wb7A==,c2tNX2yOSD3ZU1XShsrYdQ==

vercel env add API_TOKEN_SALT
# Paste: 9hOWpMg8RhrsMTAbMQPTow==

vercel env add ADMIN_JWT_SECRET
# Paste: 6GppBxeRfLW6ITLhtAcSFA==

vercel env add TRANSFER_TOKEN_SALT
# Paste: 7cX8gnSxKy7HVmFkOTHHzw==

vercel env add JWT_SECRET
# Paste: 41QRsCdp7tK0ta+LU23MpA==

# Database (use your connection string from Step 1)
vercel env add DATABASE_CLIENT
# Enter: postgres

vercel env add DATABASE_URL
# Paste your connection string from Neon/Supabase/Vercel Postgres

vercel env add DATABASE_SSL
# Enter: true

vercel env add DATABASE_SSL_REJECT_UNAUTHORIZED
# Enter: false
```

## Step 4: Redeploy with Environment Variables

```bash
vercel --prod
```

## Step 5: Access Your Admin

Your Strapi admin will be available at:
```
https://admin-strapi.vercel.app/admin
```

Create your first admin user and start managing content!

## Troubleshooting

### Build fails
- Check DATABASE_URL is set correctly
- Ensure all environment variables are added
- Check Vercel logs: `vercel logs`

### Can't connect to database
- Verify DATABASE_SSL=true for production databases
- Check DATABASE_SSL_REJECT_UNAUTHORIZED=false
- Test connection string locally first

### 500 Error on admin panel
- Check Vercel function logs
- Verify all APP_KEYS are comma-separated (no spaces)
- Ensure DATABASE_CLIENT=postgres is set
