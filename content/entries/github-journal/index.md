---
slug: github-journal
id: github-journal
title: Automate Your Knowledge Management with Sphinx
repo: justin-napolitano/journal
githubUrl: 'https://github.com/justin-napolitano/journal'
generatedAt: '2025-11-24T21:35:21.495Z'
source: github-auto
summary: >-
  A guide to setting up a static site and knowledge management system using
  Sphinx, with automation and deployment scripts.
tags:
  - sphinx
  - python
  - static site generation
  - documentation
  - ghp-import
  - dropbox
  - makefile
  - bash
  - github pages
  - automation
seoPrimaryKeyword: sphinx static site automation
seoSecondaryKeywords:
  - knowledge management system
  - python documentation
  - ghp-import
  - backup scripts
  - makefile usage
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

A static site and knowledge management system built with Sphinx, featuring automation scripts and a comprehensive documentation and article repository.

---

## Features

- Static site generation using Sphinx with HTML output
- Automated deployment and backup scripts
- Extensive collection of articles, tutorials, and reference materials
- Support for bibliography management and citation
- Integration with Dropbox for backup
- Build automation with Makefile and Python scripts

## Tech Stack

- Primary Language: HTML (Sphinx-generated)
- Scripting: Bash, Python 3.5+
- Documentation: reStructuredText, Markdown, MyST
- Build Tools: Make, Python subprocess
- Deployment: ghp-import for GitHub Pages
- Backup: Dropbox API

## Getting Started

### Prerequisites

- Python 3.5 or higher
- Dropbox SDK for Python (`pip install dropbox`)
- Make
- Bash shell

### Installation

```bash
# Clone the repository
git clone https://github.com/justin-napolitano/journal.git
cd journal

# Install Python dependencies
pip install -r requirements.txt

# Optional: Install dependencies for Rocky Linux
pip install -r requirements_rocky.txt
```

### Build the Documentation

```bash
# Clean previous builds
make clean

# Build HTML output
make html
```

### Deployment

```bash
# Deploy to GitHub Pages
./deploy.sh
```

### Backup

```bash
# Run backup script to upload HTML build to Dropbox
python3 backup_html.py
```

## Project Structure

```
journal/
├── acp.sh                  # Bash script (purpose unspecified)
├── backup_html.py          # Python script to backup build/html to Dropbox
├── chtml.sh                # Bash script (purpose unspecified)
├── deploy.sh               # Bash script to deploy site using ghp-import
├── deployz.sh              # Bash script (alternative deploy script)
├── doit.sh                 # Bash script (purpose unspecified)
├── install.sh              # Bash script for installation
├── label_list.py           # Python script to read and display Sphinx pickle labels
├── latex/                  # Directory with LaTeX related files
├── Makefile                # Makefile for build automation
├── pullit.sh               # Bash script to pull updates
├── pushit.sh               # Bash script to push changes
├── python_build.py         # Python build automation script
├── requirements.txt        # Python dependencies
├── requirements_rocky.txt  # Python dependencies for Rocky Linux
├── requirments.txt         # Possibly a typo duplicate of requirements.txt
├── source/                 # Sphinx source files (Markdown and reStructuredText)
│   ├── _toc.yml            # Table of contents
│   ├── conf.py             # Sphinx configuration
│   ├── index.md            # Main landing page
│   ├── parts/              # Articles, tutorials, reference, contact, bibliography
│   └── ...
├── todo/                   # TODO notes
│   └── todo.md
└── uninstall.sh            # Bash script for uninstallation
```

## Future Work / Roadmap

- Improve automation scripts with better error handling and logging
- Expand documentation with additional tutorials and reference materials
- Enhance deployment process with CI/CD integration
- Add support for additional output formats (e.g., PDF via LaTeX)
- Refactor and document scripts for clarity and maintainability

---

For detailed documentation, visit [https://docs.jnapolitano.io](https://docs.jnapolitano.io).


