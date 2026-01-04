---
slug: github-config
id: github-config
title: Personalized Shell Configuration for Fish and Zsh
repo: justin-napolitano/config
githubUrl: 'https://github.com/justin-napolitano/config'
generatedAt: '2025-11-24T21:34:15.654Z'
source: github-auto
summary: >-
  Consolidated setup for Fish and Zsh shells with custom Starship prompt
  configuration.
tags:
  - fish
  - zsh
  - starship
  - shell scripting
seoPrimaryKeyword: shell configuration files
seoSecondaryKeywords:
  - fish shell setup
  - zsh configuration
  - starship prompt customization
  - oh-my-zsh integration
  - terminal setup
seoOptimized: true
topicFamily: devtools
topicFamilyConfidence: 0.9
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

System configuration files for shell environments and prompt customization. This repository consolidates personalized setups for Fish and Zsh shells, alongside a custom Starship prompt configuration.

## Features

- Fish shell configuration (`config.fish`)
- Zsh configuration integrated with Oh My Zsh (`zshrc`)
- Starship prompt customization (`starship.toml`)

## Tech Stack

- Shell scripting (Fish, Zsh)
- Starship prompt configuration (Rust-based prompt)

## Getting Started

### Prerequisites

- Fish shell or Zsh installed
- Oh My Zsh installed (for Zsh configuration)
- Starship prompt installed (optional, for prompt customization)

### Installation

Clone the repository:

```bash
git clone https://github.com/justin-napolitano/config.git
cd config
```

Copy or source the configuration files to your home directory or appropriate config locations:

- For Fish shell:
  ```bash
  cp config.fish ~/.config/fish/config.fish
  ```

- For Zsh:
  ```bash
  cp zshrc ~/.zshrc
  ```

- For Starship prompt:
  ```bash
  cp starship.toml ~/.config/starship.toml
  ```

Reload your shell or start a new terminal session to apply changes.

## Project Structure

```
config/
├── config.fish       # Fish shell configuration
├── starship.toml     # Starship prompt configuration
└── zshrc             # Zsh shell configuration with Oh My Zsh
```

## Future Work / Roadmap

- Add README documentation for individual config files
- Include installation scripts for automated setup
- Expand support for other shells (e.g., Bash)
- Add backup and sync options for config files
- Integrate versioning for config changes


