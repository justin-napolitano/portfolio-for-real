---
slug: github-jnapolitano-io
id: github-jnapolitano-io
title: Automated Deployment and Backup for Static Sites
repo: justin-napolitano/jnapolitano.io
githubUrl: 'https://github.com/justin-napolitano/jnapolitano.io'
generatedAt: '2025-11-24T21:35:20.510Z'
source: github-auto
summary: >-
  Explore scripts and configurations for automating deployment, backup, and
  LaTeX resume management for static sites.
tags:
  - github pages
  - python
  - bash
  - docker
  - latex
  - makefile
  - dropbox api
seoPrimaryKeyword: static site deployment automation
seoSecondaryKeywords:
  - github pages deployment
  - python backup scripts
  - docker environment setup
  - latex resume templates
  - makefile build automation
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

A collection of scripts and configurations for building, deploying, and backing up a static site, along with LaTeX resume templates. This repository automates deployment workflows, dependency management, and Dropbox backups for the site hosted at cv.jnapolitano.io.

## Features

- Automated deployment scripts using GitHub Pages and shell scripts
- Backup functionality to Dropbox via Python API
- Build pipeline automation with Python and Makefile integration
- LaTeX resume templates for easy customization and PDF generation
- Dockerfile for containerized environment setup
- Various utility scripts for installation, setup, and maintenance

## Tech Stack

- JavaScript (primary language noted)
- Python 3.5+ for backup and build scripts
- Bash shell scripting for deployment and setup automation
- Makefile for build automation
- Docker for containerization
- Dropbox API for backup integration
- LaTeX for resume formatting

## Getting Started

### Prerequisites

- Python 3.5 or higher
- pip package manager
- Dropbox account and API token
- Make utility
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/justin-napolitano/jnapolitano.io.git
cd jnapolitano.io
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

### Usage

- To build the site:

```bash
make html
```

- To deploy the site to GitHub Pages:

```bash
./deploy.sh
```

- To back up the built HTML to Dropbox:

```bash
python backup_html.py
```

- To install required system dependencies and setup environment:

```bash
./install.sh
```

- To uninstall or clean up:

```bash
./uninstall.sh
```

## Project Structure

```
acp.sh            # Shell script, purpose assumed for automation
backup_html.py    # Python script to back up build/html folder to Dropbox
chtml.sh          # Shell script, likely related to HTML processing
deploy.sh         # Deploys site to GitHub Pages
deployz.sh        # Alternative deploy script
Dockerfile        # Docker environment setup
...               # Various shell scripts for setup, push, pull, install, uninstall
latex/            # LaTeX templates and resume files
label_list.py     # Python script for reading pickle files related to docs
Makefile          # Build automation rules
overview.rst      # Documentation overview
python_build.py   # Python build pipeline automation
README.md         # This file
requirements.txt  # Python dependencies
source/           # Sphinx documentation source
```

## Future Work / Roadmap

- Consolidate and document all shell scripts with clear usage instructions
- Enhance backup script with error handling and token management
- Add unit tests for Python build and backup scripts
- Improve Dockerfile for full environment reproducibility
- Expand LaTeX resume templates with more customization options
- Integrate CI/CD pipeline for automated testing and deployment


---

# Notes

This README assumes the primary purpose is managing a static site with deployment and backup automation, alongside LaTeX resume management. Some scripts and files have unclear roles and would benefit from additional documentation.


