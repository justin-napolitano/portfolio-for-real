---
slug: github-github-scripts
id: github-github-scripts
title: Automate GitHub Repository Management with Shell Scripts
repo: justin-napolitano/github_scripts
githubUrl: 'https://github.com/justin-napolitano/github_scripts'
generatedAt: '2025-11-24T21:34:57.750Z'
source: github-auto
summary: >-
  Explore a collection of shell scripts for automating GitHub tasks, including
  submodule management and repository creation.
tags:
  - bash
  - git
  - automation
  - submodules
  - repository management
  - github
seoPrimaryKeyword: github repository automation scripts
seoSecondaryKeywords:
  - git submodule sync
  - create github repository
  - add submodule script
  - github cli automation
  - shell scripting for github
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

A collection of shell scripts designed to automate and manage GitHub repository tasks, particularly focused on handling Git submodules and repository creation workflows. Each script is modularized as a submodule, enabling easy updates and integration.

## Features

- Synchronize Git submodules recursively to their latest remote commits.
- Automate adding submodules to a Git super project, including branch creation and pull request initiation.
- Create new GitHub repositories from a template and clone them locally using GitHub CLI.

## Tech Stack

- Shell scripting (Bash)
- Git and GitHub CLI

## Getting Started

### Prerequisites

- Git installed and configured.
- GitHub CLI (`gh`) installed and authenticated for scripts that interact with GitHub.

### Installation

Clone the repository with submodules:

```bash
git clone --recurse-submodules https://github.com/justin-napolitano/github_scripts.git
cd github_scripts
```

### Usage

Each script is maintained as a submodule with its own documentation. Below are summaries:

#### Sync Submodules Script

Synchronizes all Git submodules to their latest remote commits.

```bash
cd gh_submodule_sync
chmod +x sync_submodules.sh
./sync_submodules.sh
```

#### Add Submodule Script

Adds a submodule to your Git super project, pushes the branch, and creates a pull request.

```bash
cd add-submodule-script
chmod +x add_submodule.sh
./add_submodule.sh <submodule-link> <location>
```

#### Create and Clone GitHub Repository Script

Creates a new GitHub repo from a template and clones it locally.

```bash
cd gh_create_from_template
chmod +x create_and_clone_repo.sh
./create_and_clone_repo.sh
```

## Project Structure

```
github_scripts/
├── add-submodule-script/       # Script and docs to add a submodule and create PR
├── gh_create_from_template/    # Script and docs to create repo from template and clone
├── gh_submodule_sync/          # Script and docs to sync submodules recursively
├── gh_submodule_sync.sh        # Sync submodules script at root
├── index.md                    # Overview and usage
├── README.md                   # This file
```

## Future Work / Roadmap

- Add more modular scripts for common GitHub automation tasks.
- Enhance error handling and logging in existing scripts.
- Support private repository templates and authentication flows.
- Provide Dockerized versions for environment consistency.
- Expand documentation with examples and troubleshooting guides.


