---
slug: github-napolitano-tseng
id: github-napolitano-tseng
title: Data-Driven Market Research Platform with Hugo and Python
repo: justin-napolitano/napolitano-tseng
githubUrl: 'https://github.com/justin-napolitano/napolitano-tseng'
generatedAt: '2025-11-24T21:35:41.227Z'
source: github-auto
summary: >-
  Explore the napolitano-tseng project, a market research platform built with
  Hugo, TailwindCSS, and Python for automation and deployment.
tags:
  - hugo
  - tailwindcss
  - python
  - netlify
  - makefile
  - postcss
  - automation
  - market research
seoPrimaryKeyword: data-driven market research platform
seoSecondaryKeywords:
  - hugo site generator
  - tailwindcss styling
  - python automation scripts
  - continuous deployment
  - npm installation
  - build automation
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

The napolitano-tseng website is a data-driven market research platform built using Hugo, TailwindCSS, and Python automation. It provides services including market research, sales analysis, CRM development, and cloud infrastructure management.

## Features

- Static site generated with Hugo for fast performance
- TailwindCSS for responsive and customizable styling
- Automated build and deployment pipeline using Makefile and Python scripts
- Content organized for blogs, products, and company information
- Data-driven components with JSON data files for slides and features
- Netlify configuration for continuous deployment

## Tech Stack

- [Hugo](https://gohugo.io/) (static site generator)
- TailwindCSS with typography plugin
- PostCSS and Autoprefixer for CSS processing
- Python scripts for build automation
- Makefile for build commands
- Netlify for hosting and deployment

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3
- Hugo (version 0.90.0 as specified)
- Make

### Installation

```bash
# Clone the repository
git clone https://github.com/justin-napolitano/napolitano-tseng.git
cd napolitano-tseng

# Install npm dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt
```

### Running Locally

```bash
# Start Hugo server with TailwindCSS watch
npm run watch:tw &
npm run watch:hugo
```

### Building for Production

```bash
npm run build
```

Or use the Makefile commands:

```bash
make clean
make html
```

## Project Structure

```
├── archetypes/          # Hugo archetypes for content templates
├── config.toml          # Hugo main configuration
├── configTaxo.toml      # Additional taxonomy config
├── content/             # Markdown content files
│   ├── about.md
│   ├── contact.md
│   ├── blog/            # Blog posts organized by topic
│   └── products/        # Product/service pages
├── data/                # JSON data files for site components
├── layouts/             # Hugo templates
├── static/              # Static assets like images
├── themes/              # Hugo theme files
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # TailwindCSS configuration
├── package.json         # npm project metadata and scripts
├── python-build.py      # Python script for build automation
├── netlify.toml         # Netlify deployment config
└── public/              # Generated site output
```

## Future Work / Roadmap

- Expand content with more detailed market research reports
- Improve automation scripts to include testing and linting
- Add CI/CD integration beyond Netlify
- Enhance data visualization features
- Modularize Hugo themes for easier customization
- Implement user feedback forms and analytics

---

*This README is generated based on the current repository contents and inferred project details.*

