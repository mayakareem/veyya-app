# Quick Guide: Push to GitHub

Follow these steps to get your code on GitHub:

## Step 1: Create GitHub Repository

1. Go to https://github.com
2. Log in to your account
3. Click the **"+"** icon (top right) → **"New repository"**
4. Fill in:
   - **Repository name**: `veyya-app` (or your choice)
   - **Description**: "Veyya marketplace provider onboarding"
   - **Visibility**: Public or Private (your choice)
   - **DO NOT check** "Initialize with README"
5. Click **"Create repository"**

## Step 2: Copy Your Repository URL

After creating the repository, GitHub will show a URL like:
```
https://github.com/YOUR_USERNAME/veyya-app.git
```

**Copy this URL!** You'll need it in the next step.

## Step 3: Run These Commands

Open your terminal in the project folder and run:

```bash
# 1. Add your GitHub repository as remote
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/veyya-app.git

# 2. Verify it was added correctly
git remote -v

# 3. Commit the deployment guide
git add DEPLOYMENT_GUIDE.md PUSH_TO_GITHUB.md
git commit -m "docs: add deployment guides"

# 4. Push everything to GitHub
git push -u origin main
```

## Troubleshooting

### If you get "authentication failed":

You need to use a Personal Access Token (PAT):

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Name it "Veyya App Deploy"
4. Check the **"repo"** checkbox
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When `git push` asks for password, paste the token

### If you get "branch main doesn't exist":

Your default branch might be named differently. Try:

```bash
# Check your current branch
git branch

# If it shows a different name (like 'master'), use that instead:
git push -u origin master
```

## What Happens Next?

After pushing:
1. Go to your GitHub repository URL
2. You should see all your files there
3. Now you can proceed to deploy on Vercel!

---

**Ready to deploy to Vercel?** Follow the instructions in `DEPLOYMENT_GUIDE.md`
