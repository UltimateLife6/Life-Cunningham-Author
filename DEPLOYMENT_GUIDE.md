# Deployment Guide: Life Cunningham Author Website

This guide will walk you through deploying your author website to GitHub and Vercel.

## 🚀 Step 1: Create GitHub Repository

### Option A: Using GitHub Web Interface (Recommended)

1. **Go to GitHub.com** and sign in to your account
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Repository settings:**
   - Repository name: `life-cunningham-author`
   - Description: `Official author website for Life Cunningham, fantasy author of the Spirit Caster series`
   - Make it **Public** (recommended for free hosting)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. **Click "Create repository"**

### Option B: Install GitHub CLI (Alternative)

If you prefer command line:
```bash
# Install GitHub CLI from: https://cli.github.com/
gh auth login
gh repo create life-cunningham-author --public --description "Official author website for Life Cunningham"
```

## 🔗 Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your project directory:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/life-cunningham-author.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 3: Deploy to Vercel

### Option A: Deploy from GitHub (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign up/login
2. **Click "New Project"**
3. **Import your GitHub repository:**
   - Select your `life-cunningham-author` repository
   - Vercel will automatically detect it's a static HTML site
4. **Configure deployment:**
   - Project name: `life-cunningham-author`
   - Framework Preset: `Other` (or let Vercel auto-detect)
   - Root Directory: `./` (leave as default)
5. **Click "Deploy"**

### Option B: Deploy from Local Files

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from your project directory:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project: `No`
   - Project name: `life-cunningham-author`
   - Directory: `./` (current directory)

## 🔧 Step 4: Configure Custom Domain (Optional)

### For Vercel:
1. In your Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `lifecunningham.com`)
4. Update your DNS settings as instructed by Vercel

### Update Website URLs:
Once deployed, update these files with your actual domain:
- `index.html` - Update Open Graph URLs
- `about.html` - Update Open Graph URLs
- `books.html` - Update Open Graph URLs
- `blog.html` - Update Open Graph URLs
- `contact.html` - Update Open Graph URLs
- `fan-zone.html` - Update Open Graph URLs

## 📝 Step 5: Update README with Live Links

After deployment, update your README.md with:
- Live website URL
- GitHub repository link
- Deployment status badge

## 🔄 Step 6: Continuous Deployment

### Automatic Deployments:
- **GitHub → Vercel**: Every push to main branch automatically deploys
- **Preview Deployments**: Pull requests get preview URLs

### Manual Deployments:
```bash
# Deploy latest changes
git add .
git commit -m "Update website content"
git push origin main
# Vercel will automatically deploy
```

## 🛠️ Troubleshooting

### Common Issues:

1. **404 Errors on Vercel:**
   - Check `vercel.json` configuration
   - Ensure all HTML files are in the root directory

2. **Images not loading:**
   - Verify image paths are relative (e.g., `images/author-photo.jpg`)
   - Check that images are committed to Git

3. **Styling issues:**
   - Clear browser cache
   - Check CSS file paths in HTML files

4. **Git push errors:**
   - Ensure you're authenticated with GitHub
   - Check repository URL is correct

## 📊 Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Images display properly
- [ ] Navigation works on mobile
- [ ] Contact form functions (if backend is set up)
- [ ] Newsletter signup works (if backend is set up)
- [ ] Social media links are correct
- [ ] SEO meta tags are in place
- [ ] Google Analytics is configured (optional)

## 🎯 Next Steps

1. **Set up Google Analytics** for website traffic
2. **Configure email service** for contact form
3. **Set up newsletter service** (Mailchimp, ConvertKit, etc.)
4. **Add SSL certificate** (automatic with Vercel)
5. **Set up monitoring** and error tracking

## 📞 Support

If you encounter issues:
- Check Vercel deployment logs
- Review GitHub repository settings
- Consult Vercel documentation: https://vercel.com/docs
- Check GitHub documentation: https://docs.github.com

---

**Your website will be live at:** `https://your-project-name.vercel.app`
**GitHub repository:** `https://github.com/YOUR_USERNAME/life-cunningham-author`
