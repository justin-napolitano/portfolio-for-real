---
slug: github-neo4japi
id: github-neo4japi
title: 'Neo4j API: Python Extensions for Graph Database Interaction'
repo: justin-napolitano/neo4jAPI
githubUrl: 'https://github.com/justin-napolitano/neo4jAPI'
generatedAt: '2025-11-24T21:35:42.012Z'
source: github-auto
summary: >-
  Explore Python extensions for Neo4j, including data ingestion, REST API
  wrappers, and local setup with Docker or Podman.
tags:
  - neo4j
  - python
  - flask
  - docker
  - podman
  - data ingestion
  - neomodel
seoPrimaryKeyword: neo4j python extensions
seoSecondaryKeywords:
  - neo4j database interaction
  - flask rest api
  - docker neo4j setup
  - data ingestion pipelines
  - python neo4j driver
seoOptimized: true
topicFamily: datascience
topicFamilyConfidence: 0.8
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

Some basic Neo4j Python extensions built on top of the official Neo4j Python library. This repository provides utilities and abstractions to facilitate interaction with Neo4j graph databases, including data ingestion, node and relationship management, and REST API wrappers. The codebase is under active development and will be refactored soon.

---

## Features

- Simplified Neo4j driver initialization and query execution
- Data ingestion pipelines for CSV and GraphML formats into Neo4j
- Node and relationship creation abstractions using neomodel
- REST API endpoints for basic Neo4j operations with Flask
- Docker and Podman configurations for local Neo4j sandbox environments

## Tech Stack

- Python 3.x
- Neo4j Python Driver
- Neomodel (Object Graph Mapper for Neo4j)
- Flask (for REST API)
- Docker / Podman for containerized Neo4j instances
- Apache Spark (via PySpark) for data processing (optional/integrated)

## Getting Started

### Prerequisites

- Python 3.7 or higher
- Neo4j database (local or remote instance)
- Docker or Podman (optional, for containerized Neo4j)

### Installation

```bash
# Clone the repository
git clone https://github.com/justin-napolitano/neo4jAPI.git
cd neo4jAPI

# It is recommended to use a virtual environment
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate   # Windows

# Install required Python packages
pip install -r requirements.txt  # (Assuming this file exists or install manually)
```

### Running Neo4j Locally with Podman

```bash
podman run --name loc_neo -p7687:7687 -p7474:7474 -p7473:7473 \
  --volume neo4jdata:/data --volume neo4jlogs:/logs -v neo4jplugins:/plugins \
  -d --env NEO4J_AUTH=neo4j/test neo4j
```

### Running the REST API Server

```bash
python rest_server.py
```

The server will be available on `http://0.0.0.0:5000/`.

### Running Data Upload Scripts

Scripts such as `csv_to_neo.py`, `graphml_to_neo.py`, and `upload_csv_to_neo.py` provide utilities to ingest data into Neo4j. Adjust connection parameters and data paths as needed before running.

## Project Structure

```
neo4jAPI/
├── clean_loc_data.py          # Utility to gather JSON files from directories
├── csv_to_neo.py              # Pipeline to upload CSV data to Neo4j
├── docker-compose.dev.yml     # Docker Compose config for local dev environment
├── Dockerfile                 # Dockerfile for building container
├── graphml_to_neo.py          # Script to import GraphML files into Neo4j
├── LICENSE                   # License file
├── master_df.csv              # Sample or master dataset
├── neo4j_connect.py           # Basic Neo4j connection wrapper
├── neo4j_connect_2.py         # Extended Neo4j connection with example queries
├── neo4jClasses.py            # Neo4j Aura and Sandbox API wrappers
├── neo_native_apy.py          # Neo4j native driver wrapper with utility methods
├── neoModelAPI.py             # Neomodel-based API for node creation and queries
├── NeoNodes.py                # Node definitions using neomodel
├── podman-run.txt             # Podman command to run local Neo4j container
├── rest.py                    # Flask REST API example
├── rest_server.py             # Flask REST API server
├── results_to_neo4j.py        # Data upload and relationship management utilities
├── stack_graph.py             # Cypher queries for graph processing and batching
├── upload_csv_to_neo.py       # Data preparation and upload pipeline
```

## Future Work / Roadmap

- Refactor codebase for improved modularity and clarity
- Add comprehensive unit and integration tests
- Enhance error handling and logging throughout the API layers
- Expand REST API with more Neo4j operations and authentication
- Integrate with cloud Neo4j Aura services with secure credential management
- Improve documentation and usage examples
- Add support for additional data formats and ingestion pipelines

---

For detailed usage, refer to individual scripts and inline comments.

---

Repository URL: [https://github.com/justin-napolitano/neo4jAPI](https://github.com/justin-napolitano/neo4jAPI)

---

*Note: Some credentials and URIs in the code samples are placeholders or sensitive and should be replaced or secured appropriately.*

