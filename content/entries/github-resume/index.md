---
slug: github-resume
id: github-resume
title: LaTeX Resume Project for Developers with Automation Tools
repo: justin-napolitano/resume
githubUrl: 'https://github.com/justin-napolitano/resume'
generatedAt: '2025-11-24T21:36:11.549Z'
source: github-auto
summary: >-
  A LaTeX-based resume project featuring automation scripts for building,
  deploying, and maintaining a professional resume.
tags:
  - latex
  - python
  - docker
  - github pages
  - automation
  - resume
  - bash
  - makefile
seoPrimaryKeyword: latex resume automation
seoSecondaryKeywords:
  - build and deploy resume
  - github pages resume
  - python automation scripts
  - docker resume build
  - resume backup script
seoOptimized: true
topicFamily: latex
topicFamilyConfidence: 0.9
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

A LaTeX-based resume project designed for software developers, leveraging base LaTeX templates and fonts for easy customization and consistent formatting. This repository contains scripts and automation tools to build, deploy, and maintain the resume efficiently.

## Features

- Single-page, one-column resume layout optimized for clarity and professionalism.
- Uses LaTeX templates with custom commands for consistent formatting.
- Automated build and deployment scripts including Docker support.
- Backup integration with Dropbox for HTML builds.
- Includes Makefile and Python scripts for dependency management and build automation.

## Tech Stack

- LaTeX for resume formatting.
- Python (3.5+) for build automation and backup scripts.
- Bash scripts for deployment and setup.
- Docker for containerized builds.
- GitHub Pages deployment via `ghp-import`.

## Getting Started

### Prerequisites

- Python 3.5 or higher
- Docker (optional, for containerized builds)
- Make
- Dropbox account and API token (for backup script)

### Installation

Clone the repository:

```bash
git clone https://github.com/justin-napolitano/resume.git
cd resume
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

### Building the Resume

Build the HTML version of the resume using Make:

```bash
make html
```

### Deployment

Deploy the built HTML to GitHub Pages:

```bash
./deploy.sh
```

### Backup

To back up the HTML build to Dropbox, update the access token in `backup_html.py` and run:

```bash
python backup_html.py
```

## Project Structure

```
/latex           # LaTeX source files for the resume
/source          # Sphinx documentation source (likely for project docs)
acp.sh           # Bash script (purpose assumed to be automation related)
backup_html.py   # Python script to back up HTML build to Dropbox
deploy.sh        # Bash script to deploy HTML build to GitHub Pages
Dockerfile       # Dockerfile for containerized build environment
Makefile         # Build automation for cleaning and building resume
README.md        # This file
requirements.txt # Python dependencies
...              # Various other scripts for setup, deployment, and maintenance
```

## Future Work / Roadmap

- Improve documentation and inline comments in scripts.
- Add automated testing for build scripts.
- Enhance Dropbox backup script with error handling and logging.
- Expand Docker support for full build and deploy pipeline.
- Integrate CI/CD for automatic deployment on push.

---

*Note: Some assumptions were made regarding the purpose of scripts based on filenames and partial content.*

