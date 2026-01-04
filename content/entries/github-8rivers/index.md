---
slug: github-8rivers
id: github-8rivers
title: Automate Web Documentation with 8rivers Scripts
repo: justin-napolitano/8rivers
githubUrl: 'https://github.com/justin-napolitano/8rivers'
generatedAt: '2025-11-24T21:33:50.659Z'
source: github-auto
summary: >-
  8rivers provides scripts for automating the build, deployment, and backup of
  web documentation projects using Python and shell scripting.
tags:
  - python
  - bash
  - sphinx
  - docker
  - github pages
  - dropbox api
  - makefile
  - automation
seoPrimaryKeyword: web documentation automation
seoSecondaryKeywords:
  - documentation deployment scripts
  - python automation tools
  - html documentation generation
  - cloud backup solutions
  - github cli deployment
seoOptimized: true
topicFamily: automation
topicFamilyConfidence: 0.95
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

8rivers is a collection of scripts and tools designed to automate the building, deployment, and backup of web documentation projects. It integrates Python and shell scripting to streamline workflows involving dependency management, HTML documentation generation, and cloud backup.

## Features

- Automated installation of Python dependencies via pip
- HTML documentation build using Makefile and Sphinx
- Deployment of documentation to GitHub Pages through GitHub CLI
- Backup of generated HTML builds to Dropbox using Dropbox API
- Multiple shell scripts for setup, deployment, and maintenance
- Dockerfile for containerized environment setup

## Tech Stack

- Python (3.5+)
- Bash scripting
- Makefile
- Dropbox API
- Docker
- Sphinx documentation builder

## Getting Started

### Prerequisites

- Python 3.5 or higher
- pip
- Dropbox API token (required for backup scripts)
- Make
- GitHub CLI (for deployment)

### Installation

Clone the repository:

```bash
git clone https://github.com/justin-napolitano/8rivers.git
cd 8rivers
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

### Usage

Build the HTML documentation:

```bash
make html
```

Deploy the built documentation to GitHub Pages:

```bash
./deploy.sh
```

Backup the built HTML to Dropbox (ensure your access token is set in `backup_html.py`):

```bash
python3 backup_html.py
```

Run setup or maintenance scripts as needed:

```bash
./install.sh
./uninstall.sh
```

## Project Structure

```
8rivers/
├── acp.sh                # Shell script (automation tasks)
├── backup_html.py        # Python script to backup build/html to Dropbox
├── chtml.sh              # Shell script related to HTML build
├── deploy.sh             # Deploy built docs to GitHub Pages
├── deployz.sh            # Alternative deployment script
├── Dockerfile            # Docker container setup
├── doit.sh               # Shell script for task automation
├── install.sh            # Setup script
├── label_list.py         # Python script for processing pickle files
├── latex/                # LaTeX related files
├── LICENSE               # License file
├── mac_setup.sh          # Mac OS setup script
├── Makefile              # Build instructions
├── overview.rst          # Documentation overview
├── pullit.sh             # Shell script for pulling updates
├── pushit.sh             # Shell script for pushing changes
├── python_build.py       # Python build automation script
├── README.md             # This README
├── requirements.txt      # Python dependencies
├── requirments.txt       # (Likely duplicate/misspelled dependencies file)
├── res.text              # Resource text file
├── source/               # Sphinx source files
├── test.text             # Test text file
└── uninstall.sh          # Uninstall script
```

## Future Work / Roadmap

- Consolidate and document the purpose of multiple deployment scripts (`deploy.sh` and `deployz.sh`)
- Improve error handling and logging in Python scripts
- Add automated tests for scripts and build processes
- Enhance Dockerfile for more robust containerization
- Expand documentation and usage examples
- Integrate CI/CD pipelines for automated builds and deployments


