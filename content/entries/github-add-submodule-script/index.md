---
slug: github-add-submodule-script
id: github-add-submodule-script
title: Automate Git Submodule Addition with Bash Script
repo: justin-napolitano/add-submodule-script
githubUrl: 'https://github.com/justin-napolitano/add-submodule-script'
generatedAt: '2025-11-24T21:33:53.198Z'
source: github-auto
summary: >-
  A Bash script to automate adding Git submodules, including branch creation and
  pull request generation using GitHub CLI.
tags:
  - bash
  - git
  - submodules
seoPrimaryKeyword: git submodule automation script
seoSecondaryKeywords:
  - bash script for git
  - github submodule management
  - automate git workflows
  - git submodule command
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

A Bash script that automates adding Git submodules to a repository. It handles branch creation, submodule addition, commit, push, and pull request creation via the GitHub CLI.

## Features

- Adds a Git submodule to a specified directory within your repository.
- Automatically creates a new branch named after the submodule repository.
- Commits and pushes changes to GitHub.
- Creates a pull request using the GitHub CLI (`gh`).

## Tech Stack

- Shell scripting (Bash)
- Git
- GitHub CLI (`gh`)

## Getting Started

### Prerequisites

- Git installed and configured on your system.
- GitHub CLI (`gh`) installed and authenticated. Installation instructions: [GitHub CLI Installation](https://cli.github.com/manual/installation).

### Installation & Usage

1. Clone or download this repository.

2. Make the script executable:

```bash
chmod +x add_submodule.sh
```

3. Run the script with the submodule repository link and the target location within your repository:

```bash
./add_submodule.sh <submodule-link> <location>
```

Example:

```bash
./add_submodule.sh https://github.com/username/repo.git content/posts
```

This command adds the submodule `repo` into the `content/posts/repo` directory, creates a new branch named `repo`, commits the changes, pushes the branch, and opens a pull request against the `main` branch.

## Project Structure

```
add-submodule-script/
├── add_submodule.sh    # Main Bash script to add submodules
├── README.md           # This README file
└── index.md            # Tutorial/blog post explaining the script
```

## Future Work / Roadmap

- Support customizing the base branch for pull requests.
- Add error handling for GitHub CLI failures.
- Support adding multiple submodules in a single run.
- Add options for customizing commit messages and pull request descriptions.
- Provide more detailed logging and a verbose mode.

---

*Note: This script assumes you have Git and GitHub CLI configured and authenticated.*

