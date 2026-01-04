---
slug: github-cover-letter
id: github-cover-letter
title: LaTeX Resume and Cover Letter Template Repository
repo: justin-napolitano/cover-letter
githubUrl: 'https://github.com/justin-napolitano/cover-letter'
generatedAt: '2025-11-24T21:34:19.050Z'
source: github-auto
summary: >-
  A straightforward LaTeX template for creating resumes and cover letters with
  minimal setup, focusing on content over formatting.
tags:
  - latex
  - resume
  - cover-letter
  - tex
  - expressive-resume
  - cover letter
  - pdf generation
  - expressive resume
seoPrimaryKeyword: latex resume cover letter template
seoSecondaryKeywords:
  - create resume with latex
  - latex cover letter template
  - pdf generation with latex
  - resume formatting with latex
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

This repository provides the Expressive Resume LaTeX template and supporting files to create professional, well-formatted resumes and cover letters with minimal LaTeX knowledge. The templates prioritize simplicity and ease of use, allowing users to focus on content rather than formatting.

## Features

- Minimal setup and configuration to start writing resumes or cover letters immediately.
- Custom LaTeX commands to simplify common resume elements such as headers, objectives, and contact information.
- Compatible with most LaTeX typesetting engines (built on LaTeX2e).
- Includes paired cover letter template to complement the resume.

## Tech Stack

- Primary language: TeX (LaTeX2e)
- PDF generation via pdfTeX / pdfLaTeX

## Getting Started

### Prerequisites

- A LaTeX distribution installed (e.g., TeX Live, MiKTeX)
- A LaTeX editor or command line tools

### Installation

1. Clone the repository:

```bash
git clone https://github.com/justin-napolitano/cover-letter.git
cd cover-letter
```

2. Navigate to the `expressive-resume` directory where the template files are located.

### Usage

1. Create a new `.tex` file inside the `expressive-resume` folder.
2. Use the `ExpressiveResume` document class:

```tex
\documentclass{ExpressiveResume}

\begin{document}

% Your resume content here

\end{document}
```

3. Add your resume header using the `\resumeheader` command with optional parameters:

```tex
\resumeheader[
    firstname=John,
    lastname=Doe,
    email=john.doe@example.com,
    phone=123-456-7890,
    linkedin=johndoe,
    github=johndoe,
    city=San Francisco,
    state=CA
]
```

4. Optionally add an objective statement:

```tex
\objective{
    Seeking a software engineering position where I can apply my skills.
}
```

5. Compile the `.tex` file with your preferred LaTeX engine (e.g., `pdflatex`).

## Project Structure

```
cover-letter/
├── expressive-resume/    # LaTeX templates and related files
├── README.md             # This file
├── References.pdf        # Reference document (purpose unspecified)
├── texput.log            # LaTeX compilation log
```

## Future Work / Roadmap

- Improve documentation with more usage examples.
- Add support for additional resume sections and customization options.
- Provide sample `.tex` files demonstrating cover letter use.
- Automate PDF compilation via scripts or Makefile.
- Enhance error handling and troubleshooting guidance for LaTeX compilation.


