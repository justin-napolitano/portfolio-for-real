---
slug: github-ny-times-newsreoom-strategist
id: github-ny-times-newsreoom-strategist
title: LaTeX Resume Template with Build Automation Scripts
repo: justin-napolitano/ny-times-newsreoom-strategist
githubUrl: 'https://github.com/justin-napolitano/ny-times-newsreoom-strategist'
generatedAt: '2025-11-24T21:35:49.572Z'
source: github-auto
summary: >-
  A LaTeX resume template with Python scripts for automated builds and
  customizable styles, designed for professional resume creation.
tags:
  - latex
  - python
  - build automation
  - makefile
  - xelatex
  - resume template
  - dependency management
seoPrimaryKeyword: latex resume template automation
seoSecondaryKeywords:
  - build scripts for resumes
  - customizable resume styles
  - python build pipeline
  - automated resume generation
  - makefile for latex
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

This repository contains a LaTeX resume template and related build scripts, designed for producing professional resumes with customizable styling. It leverages XeLaTeX for compilation and includes automation scripts to manage dependencies and build processes.

## Features

- LaTeX-based resume template with customizable page styles and color highlights
- Supports multiple page layouts including headers and highlight bars
- Automated build pipeline using Python and Makefile
- Dependency management via pip requirements
- Sample PDFs demonstrating template capabilities

## Tech Stack

- Primary language: TeX (LaTeX)
- Python scripts for build automation
- Makefile for cleaning and building LaTeX documents
- XeLaTeX compiler

## Getting Started

### Prerequisites

- XeLaTeX installed on your system
- Python 3 environment
- pip package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/justin-napolitano/ny-times-newsreoom-strategist.git
cd ny-times-newsreoom-strategist
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

### Build Resume

Run the build script or use Makefile commands:

```bash
make clean
make html
```

Alternatively, run the Python build pipeline:

```bash
python python-build.py
```

## Project Structure

```
/                  # Root directory
├── deployz/       # Deployment related files (assumed)
├── sections/      # LaTeX sections for resume content
├── my-resume.cls  # LaTeX class file defining resume styling
├── resume.tex     # Main LaTeX resume source
├── python-build.py # Python script automating build and dependency installation
├── Makefile       # (assumed) for cleaning and building
├── README.md      # This file
├── LICENSE        # License file
├── *.pdf, *.log   # Build output and logs
└── images         # Resume example images
```

## Future Work / Roadmap

- Add comprehensive documentation for LaTeX class options
- Implement continuous integration for automated builds
- Expand build automation to support PDF generation directly
- Provide templates for different resume styles and layouts
- Improve error handling and logging in build scripts
- Add unit tests for Python build automation

---

*Note: Some assumptions were made due to limited explicit documentation.*

