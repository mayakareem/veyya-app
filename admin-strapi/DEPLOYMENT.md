# Strapi Admin Deployment Guide

## Overview
This Strapi CMS serves as the admin backend for Veyya app, managing:
- Services catalog (Beauty, Pet Care, Healthcare)
- Bookings
- Provider profiles
- User management
- Content management

## Prerequisites
1. PostgreSQL database (Neon, Supabase, or Vercel Postgres)
2. Vercel account
3. GitHub repository

## Local Development

### 1. Install Dependencies
```bash
cd admin-strapi
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and update:

```env
# Generate secure keys
APP_KEYS=your_app_key_1,your_app_key_2,your_app_key_3,your_app_key_4
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret

# Database
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://user:password@localhost:5432/strapi_veyya
```

**Generate secure keys using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

### 3. Run Development Server
```bash
npm run develop
```

Access admin panel at: `http://localhost:1337/admin`

## Production Deployment (Vercel)

### Step 1: Set Up Database

#### Option A: Neon (Recommended - Free)
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string (connection pooling recommended)

#### Option B: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database → Connection String
4. Copy the connection pooling string

#### Option C: Vercel Postgres
1. In Vercel dashboard → Storage → Create Database
2. Select Postgres
3. Note the DATABASE_URL (auto-configured in Vercel env)

### Step 2: Deploy to Vercel

#### Via Vercel CLI
```bash
cd admin-strapi
npm install -g vercel
vercel
```

#### Via Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `admin-strapi` directory
3. Configure project:
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

### Step 3: Configure Environment Variables in Vercel

Go to Project Settings → Environment Variables and add:

```
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Generate these with: node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
APP_KEYS=your_key_1,your_key_2,your_key_3,your_key_4
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_secret
TRANSFER_TOKEN_SALT=your_salt
JWT_SECRET=your_secret

# Database (from Neon/Supabase)
DATABASE_CLIENT=postgres
DATABASE_URL=your_postgres_connection_string
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
```

### Step 4: Deploy
```bash
vercel --prod
```

Your Strapi admin will be available at: `https://admin-strapi-yourproject.vercel.app/admin`

## Initial Setup

### 1. Create Admin User
On first deployment:
1. Visit `/admin`
2. Create your admin account
3. Configure permissions in Settings → Users & Permissions

### 2. Create Content Types

#### Services Collection
- **Name**: Service
- **Fields**:
  - name (Text, required)
  - category (Enumeration: beauty, pet-care, healthcare)
  - subcategory (Text)
  - description (Rich Text)
  - duration (Integer)
  - priceRange (Text)
  - image (Media)
  - active (Boolean, default: true)

#### Bookings Collection
- **Name**: Booking
- **Fields**:
  - serviceId (Relation → Service)
  - userId (Text)
  - providerId (Text)
  - start (DateTime)
  - end (DateTime)
  - status (Enumeration: pending, confirmed, completed, cancelled)
  - price (Integer)
  - notes (Text)

#### Providers Collection
- **Name**: Provider
- **Fields**:
  - displayName (Text, required)
  - email (Email, required)
  - bio (Rich Text)
  - services (Relation → Service, many-to-many)
  - rating (Decimal)
  - active (Boolean, default: true)
  - image (Media)

### 3. Configure API Permissions
Settings → Users & Permissions → Roles → Public:
- Enable `find` and `findOne` for Services
- Keep Bookings and Providers private (authenticated only)

## Integration with Next.js App

### In app-prototype, add environment variable:
```env
NEXT_PUBLIC_STRAPI_URL=https://admin-strapi-yourproject.vercel.app
```

### Example API calls:
```typescript
// Fetch services
const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/services`);
const data = await response.json();

// Create booking (authenticated)
const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(bookingData)
});
```

## Troubleshooting

### Build fails on Vercel
- Ensure `pg` package is installed
- Check DATABASE_URL format
- Verify all environment variables are set

### Cannot connect to database
- Check DATABASE_SSL is set to `true` for production
- Verify DATABASE_SSL_REJECT_UNAUTHORIZED is `false`
- Confirm connection string includes `?ssl=true` if needed

### Admin panel not accessible
- Ensure build completed successfully
- Check Vercel function logs
- Verify PORT and HOST environment variables

## Useful Commands

```bash
# Local development
npm run develop

# Build for production
npm run build

# Start production server
npm run start

# Generate TypeScript types
npm run strapi ts:generate-types

# List all content types
npm run strapi content-types:list
```

## Resources
- [Strapi Documentation](https://docs.strapi.io)
- [Strapi on Vercel](https://vercel.com/guides/deploying-strapi-with-vercel)
- [Neon Documentation](https://neon.tech/docs)
