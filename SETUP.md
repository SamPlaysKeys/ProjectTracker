# 🚀 Simple Project Tracker Setup

## What You Get

A clean, simple project tracker with:
- ✅ **Easy-to-update markdown table** in README.md
- ✅ **GitHub Pages theme** with dusty orange accents
- ✅ **Responsive design** that looks good on all devices
- ✅ **Minimal setup** - just push and go!

## Files Overview

```
ProjectTracker/
├── README.md           # Your project tracker (edit this!)
├── _config.yml         # Site settings
├── assets/css/style.scss  # Custom styling
├── Gemfile             # Dependencies
└── .gitignore          # What to ignore
```

## Quick Setup

### 1. Update Configuration
Edit `_config.yml` and change:
```yaml
baseurl: "/YourRepositoryName"
url: "https://your-username.github.io"
email: your-email@example.com
```

### 2. Enable GitHub Pages
1. Go to your repository Settings
2. Scroll to "Pages" section  
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)"
5. Save settings

### 3. Your site will be live at:
`https://your-username.github.io/YourRepositoryName`

## How to Update Projects

### Adding a New Project
Edit `README.md` and add a new row to the table:

```markdown
| **Your Project Name** | Brief description | 🚀 In Progress | 2024-08-13 | [GitHub](https://github.com/user/repo) |
```

### Updating Project Status
Just change the status emoji and date:
- 🚀 **In Progress** - Currently working on this
- 📋 **Planning** - In research/planning phase  
- ⏸️ **On Hold** - Temporarily paused
- ✅ **Completed** - Successfully finished
- ❌ **Cancelled** - Project discontinued

### Commit Changes
```bash
git add README.md
git commit -m "Update project status"
git push
```

Your site will update automatically in 1-3 minutes!

## Customization

### Colors
To change the dusty orange theme, edit `assets/css/style.scss`:
```scss
:root {
  --accent-color: #your-color;
  --accent-light: #your-lighter-color;
}
```

### Contact Info
Update the contact section in `README.md` with your information.

## That's It! 

Super simple, easy to maintain, and looks professional. Perfect for tracking your projects without any complexity!
