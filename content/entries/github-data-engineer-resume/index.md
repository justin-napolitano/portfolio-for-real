---
slug: github-data-engineer-resume
id: github-data-engineer-resume
title: Customizable LaTeX Resume Template for Data Engineers
repo: justin-napolitano/data-engineer-resume
githubUrl: 'https://github.com/justin-napolitano/data-engineer-resume'
generatedAt: '2025-11-24T21:34:29.276Z'
source: github-auto
summary: >-
  A LaTeX resume template designed for clarity and customization, featuring
  multiple layouts and build automation.
tags:
  - latex
  - resume template
  - XeLaTeX
  - Python
  - Makefile
  - Overleaf
  - data engineering
  - resume
  - overleaf
  - python
  - makefile
  - data-engineer
seoPrimaryKeyword: latex resume template
seoSecondaryKeywords:
  - customizable resume
  - XeLaTeX resume
  - build automation
  - Overleaf template
  - data engineer CV
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

A LaTeX resume/CV template designed for customization and clarity. Inspired by AltaCV and AwesomeCV, this template runs on XeLaTeX and provides multiple page styles and layout options to suit different presentation needs.

---

## Features

- Clean and professional resume template using LaTeX
- Multiple page styles including header and highlight bar options
- Supports single-sided and double-sided layouts
- Customizable colors and headers
- Ready-to-use Overleaf template available

## Tech Stack

- Primary language: TeX (LaTeX)
- Build automation: Makefile
- Python script for build automation and dependency management

## Getting Started

### Prerequisites

- XeLaTeX installed
- Python 3.x
- Make utility

### Installation and Build

```bash
# Clone the repository
git clone https://github.com/justin-napolitano/data-engineer-resume.git
cd data-engineer-resume

# Install dependencies (if any listed in requirements.txt)
python3 python-build.py

# Build the resume PDF
make clean
make html

# The output PDF will be resume.pdf
```

Alternatively, use the Overleaf template for online editing:
[Overleaf my-resume template](https://www.overleaf.com/latex/templates/my-resume/qxsxdtmknkfr)

## Project Structure

```
├── deployz/                  # Deployment related scripts or files
├── sections/                 # LaTeX sections for modular resume content
├── head_shot.jpeg            # Profile image
├── last_build.pdf            # Last generated PDF
├── LICENSE                  # License file
├── my-resume.cls             # Custom LaTeX class file
├── python-build.py           # Python script automating build and dependency installation
├── README.md                 # Project documentation
├── resume.tex                # Main LaTeX source file
├── resume.pdf                # Compiled resume PDF
├── resume-1.png              # Example resume page 1
├── resume-2.png              # Example resume page 2
├── resume-3.png              # Example resume page 3
└── technical.pdf             # Possibly a technical section or appendix
```

## Future Work / Roadmap

- Improve documentation and add usage examples
- Automate PDF generation fully with Python script
- Add support for additional languages or export formats
- Enhance modularity of LaTeX sections for easier customization
- Integrate CI/CD for automatic build and deployment

---

This template is suitable for users familiar with LaTeX looking for a customizable resume format that can be built locally or on Overleaf.


