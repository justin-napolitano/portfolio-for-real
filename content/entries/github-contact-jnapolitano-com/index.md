---
slug: github-contact-jnapolitano-com
id: github-contact-jnapolitano-com
title: Personal Website Source Code with Hugo and Python Scripts
repo: justin-napolitano/contact.jnapolitano.com
githubUrl: 'https://github.com/justin-napolitano/contact.jnapolitano.com'
generatedAt: '2025-11-24T21:34:16.485Z'
source: github-auto
summary: >-
  Explore the source code for a personal website built with Hugo, featuring
  automation scripts and a CI/CD pipeline.
tags:
  - hugo
  - python
  - mysql
  - github actions
  - static site generation
  - cloud storage
  - rss feed
seoPrimaryKeyword: hugo personal website source code
seoSecondaryKeywords:
  - static site generator
  - python automation scripts
  - mysql database integration
  - github pages deployment
  - multi-language support
seoOptimized: true
topicFamily: static
topicFamilyConfidence: 0.9
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

A personal website built with Hugo, designed to showcase blog posts, projects, and various content. This repository contains the source code, content, and automation scripts for the site hosted at [contact.jnapolitano.com](https://contact.jnapolitano.com).

---

## Features

- Static site generation using [Hugo](https://gohugo.io/).
- Multi-language support with English as the default language and placeholders for French and Italian.
- Blog post management with archetypes and content directories.
- RSS feed scraping and update automation using Python scripts.
- Integration with MySQL for storing post and author metadata.
- Google Cloud Storage client utilities for managing cloud assets.
- CI/CD pipeline using GitHub Actions for automated deployment to GitHub Pages.

## Tech Stack

- **Hugo**: Static site generator for building the website.
- **HTML/CSS**: Markup and styling of the site.
- **Python**: Scripts for RSS feed scraping, data processing, and MySQL database interaction.
- **MySQL**: Database for posts and author information.
- **Google Cloud Storage SDK**: For cloud storage operations.
- **GitHub Actions**: Automating build and deployment workflows.

## Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/getting-started/install/) installed locally.
- Python 3.x environment.
- MySQL server for database operations.
- Google Cloud credentials if using cloud storage features.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/justin-napolitano/contact.jnapolitano.com.git
cd contact.jnapolitano.com
```

2. Install Python dependencies (if running Python scripts):

```bash
pip install -r requirements.txt  # If a requirements.txt exists
```

3. Set up environment variables for MySQL connection by creating a `.env` file:

```env
DB_USER=yourusername
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_NAME=yourdbname
```

### Running the Site Locally

```bash
hugo server
```

Visit `http://localhost:1313` in your browser to view the site.

### Running Python Scripts

Example: Run RSS scraper script

```bash
python public/posts/hugo-rss-mysql-update/rss-scraper.py
```

## Project Structure

- `archetypes/` - Hugo archetypes for post templates.
- `archived-posts/` - Older blog posts archived here.
- `assets/` - Site assets like images and styles.
- `content/` - Main content directory for posts and pages.
- `layouts/` - Hugo templates and layouts.
- `public/` - Generated site output (usually gitignored).
- `resources/` - Hugo resource files.
- `static/` - Static files served directly.
- `themes/` - Hugo themes used by the site.
- `garbage/` - Experimental or discarded content.
- `test/` - Test scripts or data.
- `submodule.sh` - Script related to git submodules.
- `config.toml` and `hugo.toml` - Configuration files for Hugo.
- Python scripts under `public/posts/` for RSS scraping, MySQL interaction, and GCS client utilities.
- SQL schema files under `public/posts/mysql-config/` for managing database tables.
- GitHub Actions workflow file `public/posts/gh-pages-workflow/hugo.yaml` for deployment automation.

## Future Work / Roadmap

- Complete multi-language content for French and Italian.
- Enhance automation scripts to handle more content types and error cases.
- Improve integration between RSS feed scraping and database updates.
- Add tests and validation for Python scripts.
- Expand cloud storage utilities to support more operations.
- Refine Hugo theme customization and site styling.
- Document deployment process and environment setup in more detail.


