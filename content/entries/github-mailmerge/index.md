---
slug: github-mailmerge
id: github-mailmerge
title: Python Mail Merge Utility for Automated Emails
repo: justin-napolitano/mailmerge
githubUrl: 'https://github.com/justin-napolitano/mailmerge'
generatedAt: '2025-11-24T21:35:34.058Z'
source: github-auto
summary: >-
  A Python-based mail merge tool that sends personalized emails using CSV data
  and SMTP, featuring simple configuration and templating.
tags:
  - python
  - smtp
  - email automation
  - csv
  - templating
  - mailmerge
seoPrimaryKeyword: python mail merge utility
seoSecondaryKeywords:
  - email automation tool
  - CSV email sender
  - SMTP email script
  - personalized email sending
  - Python email template
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

A simple Python-based mail merge utility designed to send personalized emails to multiple recipients using a CSV database and a text template. This project demonstrates basic email automation leveraging SMTP and templating techniques.

## Features

- Reads recipient data from a CSV file
- Uses a text template with placeholders for personalization
- Sends emails via SMTP with TLS encryption
- Simple configuration for SMTP server and credentials

## Tech Stack

- Python 3
- Standard libraries: csv, smtplib, ssl

## Getting Started

### Prerequisites

- Python 3 installed
- Access to an SMTP server (e.g., Office365 SMTP)

### Installation

Clone the repository:

```bash
git clone https://github.com/justin-napolitano/mailmerge.git
cd mailmerge
```

### Configuration

- Update SMTP login credentials in `TestScript.py`:
  - `login` with your SMTP username
  - `password` with your SMTP password

- Ensure `mailmerge_database.csv` contains your recipient data
- Customize the email template in `mailmerge_template.txt` as needed

### Running

Run the test script to send emails:

```bash
python TestScript.py
```

## Project Structure

```
mailmerge/
├── mailmerge_database.csv    # CSV file containing recipient data
├── mailmerge_server.conf     # SMTP server configuration (not used in script)
├── mailmerge_template.txt    # Email template with placeholders
├── README.md                 # Project documentation
└── TestScript.py             # Python script to send emails
```

## Future Work / Roadmap

- Externalize configuration (SMTP credentials, server settings) to a config file
- Implement template rendering using a dedicated templating engine (e.g., Jinja2)
- Add error handling and logging for failed email sends
- Support HTML email templates
- Create a command-line interface for flexibility
- Secure sensitive information such as passwords


