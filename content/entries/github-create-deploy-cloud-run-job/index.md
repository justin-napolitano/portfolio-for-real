---
slug: github-create-deploy-cloud-run-job
id: github-create-deploy-cloud-run-job
title: Automate Cloud Run Job Deployment with Bash Script
repo: justin-napolitano/create_deploy_cloud_run_job
githubUrl: 'https://github.com/justin-napolitano/create_deploy_cloud_run_job'
generatedAt: '2025-11-24T21:34:22.298Z'
source: github-auto
summary: >-
  This guide covers automating the deployment of a Cloud Run Job on GCP using a
  Bash script and Google Cloud Build.
tags:
  - bash
  - google cloud run
  - google cloud build
  - docker
  - gcloud
  - cloud deployment
  - cloud-run
seoPrimaryKeyword: cloud run job automation
seoSecondaryKeywords:
  - gcp deployment script
  - docker image build
  - google cloud sdk
  - cloud build yaml
  - service account authentication
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

This repository provides a Bash script to automate the building, deployment, and execution of a Cloud Run Job on Google Cloud Platform (GCP). It uses Google Cloud Build to containerize a Python application and deploy it as a Cloud Run Job with minimal manual setup.

## Features

- Automates Docker image build and push to Google Container Registry
- Dynamically generates a `cloudbuild.yaml` file for Google Cloud Build
- Creates and executes a Cloud Run Job in a specified region
- Uses a service account for authentication and permissions

## Tech Stack

- Shell scripting (Bash)
- Google Cloud SDK (`gcloud` CLI)
- Google Cloud Build
- Google Cloud Run
- Docker

## Getting Started

### Prerequisites

- Install and configure [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
- Install [Docker](https://docs.docker.com/get-docker/)
- Have a Google Cloud Project with billing enabled
- Create a service account with appropriate permissions and download its key JSON file to `keys/service-account-key.json`

### Installation

1. Clone the repository:

```bash
git clone https://github.com/justin-napolitano/create_deploy_cloud_run_job.git
cd create_deploy_cloud_run_job
```

2. Make the deployment script executable:

```bash
chmod +x create_deploy_cloud_run.sh
```

3. Ensure your Python application and `Dockerfile` are in the repository root.

### Usage

Run the deployment script with the following arguments:

```bash
./create_deploy_cloud_run.sh <PROJECT_NAME> <IMAGE_NAME> <JOB_NAME>
```

- `<PROJECT_NAME>`: Your Google Cloud project ID
- `<IMAGE_NAME>`: Desired Docker image name
- `<JOB_NAME>`: Name for the Cloud Run Job

Example:

```bash
./create_deploy_cloud_run.sh smart-axis-421517 my-python-job my-cloud-run-job
```

## Project Structure

```
create_deploy_cloud_run_job/
├── create_deploy_cloud_run.sh   # Main deployment script
├── Dockerfile                   # Dockerfile for Python application (assumed)
├── README.md                    # This file
├── index.md                    # Documentation/tutorial
```

## Future Work / Roadmap

- Add support for customizable deployment regions and service accounts via script arguments
- Integrate automated tests for the deployment script
- Add support for environment variables and secrets management
- Provide support for other container registries beyond Google Container Registry
- Enhance error handling and logging within the script
- Include example Python application and Dockerfile for quick start

---

*Note: This README assumes the presence of a Dockerfile and Python application in the repository root, as referenced in the documentation.*

