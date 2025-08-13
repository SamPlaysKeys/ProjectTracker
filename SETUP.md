# Project Tracker Setup & Maintenance Guide

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Local Development](#local-development)
3. [GitHub Pages Deployment](#github-pages-deployment)
4. [Adding New Projects](#adding-new-projects)
5. [Customization](#customization)
6. [Troubleshooting](#troubleshooting)
7. [File Structure](#file-structure)

## 🚀 Quick Start

### Prerequisites
- GitHub account
- Git installed on your machine
- Ruby and Bundle (for local development)

### 1. Enable GitHub Pages
1. Go to your repository settings
2. Scroll to "Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)"
5. Save the settings

### 2. Update Configuration
Edit `_config.yml` and update these values:
```yaml
baseurl: "/YourRepositoryName"  # Replace with your actual repo name
url: "https://yourusername.github.io"  # Replace with your GitHub username
email: your-email@example.com
```

### 3. Your site will be available at:
`https://yourusername.github.io/YourRepositoryName`

## 💻 Local Development

### Installation
```bash
# Install Ruby dependencies
bundle install

# Start the development server
bundle exec jekyll serve

# Your site will be available at http://localhost:4000
```

### Development Commands
```bash
# Build the site
bundle exec jekyll build

# Serve with live reload
bundle exec jekyll serve --livereload

# Build for production
JEKYLL_ENV=production bundle exec jekyll build
```

## 🌐 GitHub Pages Deployment

### Automatic Deployment
- Every push to the `main` branch automatically deploys to GitHub Pages
- No additional configuration needed
- Deployment typically takes 1-3 minutes

### Manual Deployment
If you need to trigger a manual deployment:
1. Go to your repository
2. Click on "Actions" tab
3. Find the "pages build and deployment" workflow
4. Click "Re-run jobs"

## 📝 Adding New Projects

### Method 1: Direct File Edit (Easiest)
1. Go to your repository on GitHub
2. Navigate to `_data/projects.yml`
3. Click the pencil icon to edit
4. Add your new project using the template below
5. Commit directly to main branch

### Method 2: Local Development
1. Clone your repository
2. Edit `_data/projects.yml`
3. Add your new project
4. Commit and push changes

### Project Template
```yaml
- name: "Your Project Name"
  description: "Brief description of what this project entails"
  status: "Planning" # Required: Planning | In Progress | On Hold | Completed | Cancelled
  category: "Development" # Required: Development | Learning | Personal | Work | Research | Creative
  priority: "Medium" # Optional: High | Medium | Low
  progress: 0 # Optional: 0-100 percentage
  start_date: "2024-01-01" # Optional: YYYY-MM-DD format
  end_date: "2024-12-31" # Optional: YYYY-MM-DD format
  last_updated: "2024-01-01" # Optional: YYYY-MM-DD format
  icon: "🚀" # Optional: Any emoji or icon
  tags: ["tag1", "tag2"] # Optional: List of relevant tags
  links: # Optional: Related links
    - name: "GitHub Repository"
      url: "https://github.com/user/repo"
      type: "github" # github | demo | docs | figma | notion | other
```

### Status Options
- **Planning** 📋: Project is in the planning/research phase
- **In Progress** 🚀: Actively working on the project
- **On Hold** ⏸️: Temporarily paused or deprioritized
- **Completed** ✅: Successfully finished
- **Cancelled** ❌: Project discontinued

### Category Options
- **Development**: Software development projects
- **Learning**: Educational goals and skill development
- **Personal**: Personal projects and hobbies
- **Work**: Professional or work-related projects
- **Research**: Research and investigation projects
- **Creative**: Creative and artistic projects

### Link Types with Auto-Icons
- `github` 🐙 - GitHub repositories
- `demo` 🌐 - Live demos or websites
- `docs` 📚 - Documentation
- `figma` 🎨 - Design files
- `notion` 📝 - Notion pages
- `other` 🔗 - Generic links

## 🎨 Customization

### Changing Colors
Edit `_config.yml` to change the accent color:
```yaml
accent_color: "#CC8563" # Dusty orange (default)
light_accent: "#E6B896" # Lighter version
```

Or modify `assets/css/style.scss` for more detailed color customization:
```scss
:root {
  --accent-color: #CC8563; // Your preferred color
  --light-accent: #E6B896;
}
```

### Adding New Categories
1. Edit `_config.yml`
2. Add your new category to `project_categories`:
```yaml
project_categories:
  - "Development"
  - "Learning"
  - "Personal"
  - "Work"
  - "Research"
  - "Creative"
  - "Your New Category" # Add here
```

### Modifying Project Card Layout
Edit `_includes/project-card.html` to change how project cards are displayed.

### Customizing Statistics
Edit the stats section in `README.md` to show different metrics:
```liquid
{% assign your_custom_stat = site.data.projects | where: "priority", "High" | size %}
<div class="stat-card">
  <div class="stat-number">{{ your_custom_stat }}</div>
  <div class="stat-label">High Priority</div>
</div>
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Site Not Updating
- **Problem**: Changes don't appear on the live site
- **Solution**: 
  - Wait 3-5 minutes for deployment
  - Check GitHub Actions tab for build errors
  - Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

#### 2. Jekyll Build Errors
- **Problem**: Build fails with Ruby/Jekyll errors
- **Solution**:
  ```bash
  # Update Ruby gems
  bundle update
  
  # Reinstall dependencies
  rm Gemfile.lock
  bundle install
  ```

#### 3. Layout Issues
- **Problem**: CSS styles not loading properly
- **Solution**:
  - Check that `baseurl` in `_config.yml` matches your repository name
  - Verify file paths in includes are correct
  - Check browser developer tools for 404 errors

#### 4. Data Not Showing
- **Problem**: Projects don't appear on the site
- **Solution**:
  - Verify YAML syntax in `_data/projects.yml`
  - Check for proper indentation (use spaces, not tabs)
  - Validate YAML using an online YAML validator

#### 5. JavaScript Not Working
- **Problem**: Filters and collapsible sections don't work
- **Solution**:
  - Check browser console for JavaScript errors
  - Verify that `project-tracker.js` is loading correctly
  - Ensure the layout includes the script tag

### YAML Validation
Use these online tools to validate your `projects.yml`:
- [YAML Lint](http://www.yamllint.com/)
- [Online YAML Parser](https://yaml-online-parser.appspot.com/)

### Testing Locally
Always test changes locally before deploying:
```bash
# Install dependencies (first time only)
bundle install

# Start local server
bundle exec jekyll serve

# Open http://localhost:4000/YourRepositoryName
```

## 📁 File Structure

```
ProjectTracker/
├── _config.yml              # Jekyll configuration
├── _data/
│   └── projects.yml          # Project data (main file to edit)
├── _includes/
│   ├── project-card.html     # Project card component
│   ├── progress-bar.html     # Progress bar component
│   ├── status-badge.html     # Status badge component
│   └── project-meta.html     # Project metadata component
├── _layouts/
│   └── default.html          # Custom layout with JavaScript
├── assets/
│   ├── css/
│   │   └── style.scss        # Main stylesheet
│   └── js/
│       └── project-tracker.js # Interactive features
├── Gemfile                   # Ruby dependencies
├── README.md                 # Main project tracker page
├── SETUP.md                  # This documentation file
└── .gitignore               # Git ignore file
```

### Key Files to Customize

#### For Content Updates:
- `_data/projects.yml` - Add/edit/remove projects

#### For Styling:
- `assets/css/style.scss` - Modify colors, fonts, layout
- `_config.yml` - Change basic colors and settings

#### For Functionality:
- `README.md` - Modify page structure and content
- `assets/js/project-tracker.js` - Add/modify interactive features

#### For Components:
- `_includes/project-card.html` - Project card layout
- `_includes/progress-bar.html` - Progress bar appearance
- `_includes/status-badge.html` - Status badge styling

## 🆘 Getting Help

### Resources
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Liquid Template Language](https://shopify.github.io/liquid/)

### Community Support
- [Jekyll Talk](https://talk.jekyllrb.com/)
- [GitHub Community](https://github.com/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/jekyll)

### Reporting Issues
If you encounter bugs or have feature requests:
1. Check existing issues in your repository
2. Create a new issue with:
   - Description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if relevant

---

## 📅 Maintenance Schedule

### Weekly
- [ ] Update project progress percentages
- [ ] Add new projects as they come up
- [ ] Update `last_updated` dates for active projects

### Monthly
- [ ] Review and update project statuses
- [ ] Archive completed projects
- [ ] Clean up unused tags
- [ ] Check for broken links

### Quarterly
- [ ] Review and update categories
- [ ] Consider new features or improvements
- [ ] Update dependencies (`bundle update`)
- [ ] Backup your data

---

💡 **Pro Tip**: Bookmark your repository's `_data/projects.yml` file for quick access to add new projects!

🌟 **Remember**: This is your project tracker. Customize it to fit your workflow and needs!
