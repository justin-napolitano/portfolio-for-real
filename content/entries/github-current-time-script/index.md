---
slug: github-current-time-script
id: github-current-time-script
title: Bash Script for Current Date and Time in ISO 8601 Format
repo: justin-napolitano/current-time-script
githubUrl: 'https://github.com/justin-napolitano/current-time-script'
generatedAt: '2025-11-24T21:34:25.075Z'
source: github-auto
summary: >-
  A Bash script that outputs the current date and time in ISO 8601 format,
  useful for logging and automation tasks.
tags:
  - bash
  - unix
  - date command
  - scripting
  - automation
seoPrimaryKeyword: bash current time script
seoSecondaryKeywords:
  - ISO 8601 timestamp
  - bash date output
  - logging utility
  - scripting workflows
  - unix time format
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

A lightweight Bash script that outputs the current date and time in ISO 8601 format including the timezone offset. This utility provides a consistent and standardized timestamp useful for logging, automation, and scripting workflows.

## Features

- Outputs current date and time in the format: `YYYY-MM-DDTHH:MM:SS±HH:MM`
- Uses standard Bash and the Unix `date` command
- Minimal dependencies and easy to integrate into other scripts

## Tech Stack

- Shell scripting (Bash)
- Unix `date` command

## Getting Started

### Prerequisites

- Bash shell
- `date` command (available on most Unix-like systems)

### Installation

Clone or download this repository. Save the script file `current-time.sh` to your local machine.

### Usage

Make the script executable:

```bash
chmod +x current-time.sh
```

Run the script:

```bash
./current-time.sh
```

Example output:

```
date = "2024-07-13T14:27:45-06:00"
```

## Project Structure

- `current-time.sh` - The main Bash script that outputs the current time.
- `README.md` - This readme file.
- `index.md` - Additional documentation with usage instructions and metadata.

## Future Work / Roadmap

- Add support for alternative output formats such as UTC or Unix timestamp.
- Introduce command-line options to customize output format and timezone.
- Improve portability across different Unix-like systems and shells.
- Add automated tests to verify output format consistency.

---

This project is provided as-is without warranty. You may modify and use it as needed.


