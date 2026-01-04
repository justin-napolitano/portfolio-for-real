---
slug: github-gh-create-from-template
id: github-gh-create-from-template
title: Automate GitHub Repository Creation with a Shell Script
repo: justin-napolitano/gh_create_from_template
githubUrl: 'https://github.com/justin-napolitano/gh_create_from_template'
generatedAt: '2025-11-24T21:34:55.898Z'
source: github-auto
summary: >-
  This guide covers a shell script that automates creating and cloning GitHub
  repositories from templates using the GitHub CLI.
tags:
  - github
  - shell scripting
  - git
  - github cli
  - repository management
  - repository automation
  - bash
seoPrimaryKeyword: github repository automation
seoSecondaryKeywords:
  - create github repository script
  - automate github setup
  - git clone template
  - shell script for github
seoOptimized: true
topicFamily: automation
topicFamilyConfidence: 0.9
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

This repository contains a shell script that automates the creation of a new GitHub repository from a specified template and clones it locally. It leverages the GitHub CLI and Git to streamline repository setup.

## Features

- Automates repository creation on GitHub using a predefined template
- Clones the newly created repository to the local machine
- Validates required tools (GitHub CLI and Git) are installed
- Provides error handling for common failure points

## Tech Stack

- Shell scripting (Bash)
- GitHub CLI (`gh`)
- Git

## Getting Started

### Prerequisites

- [GitHub CLI](https://cli.github.com/) installed and authenticated
- Git installed on your system

### Installation and Usage

1. Clone or download this repository.
2. Make the script executable:

```sh
chmod +x gh_create_from_template.sh
```

3. Run the script:

```sh
./gh_create_from_template.sh
```

4. Follow the prompt to enter the new repository name.

The script will create a new public repository on GitHub based on the `justin-napolitano/gh_submodule_sync` template and then clone it locally.

## Project Structure

- `gh_create_from_template.sh`: The main shell script that performs repository creation and cloning.
- `README.md`: This file.
- `index.md`: Documentation with an overview and usage instructions.

## Future Work / Roadmap

- Add support for private repositories and configurable visibility.
- Parameterize the template repository to allow user selection.
- Add command-line arguments to bypass interactive prompts.
- Enhance error handling and logging.
- Support for additional GitHub repository settings (e.g., topics, descriptions).


