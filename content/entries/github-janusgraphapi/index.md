---
slug: github-janusgraphapi
id: github-janusgraphapi
title: Integrating JanusGraph with Python and Pandas
repo: justin-napolitano/JanusGraphAPI
githubUrl: 'https://github.com/justin-napolitano/JanusGraphAPI'
generatedAt: '2025-11-24T21:35:15.470Z'
source: github-auto
summary: >-
  Explore a Python-based API for integrating JanusGraph with Pandas, including
  setup, features, and future enhancements.
tags:
  - janusgraph
  - gremlin
  - python
  - pandas
seoPrimaryKeyword: janusgraph python integration
seoSecondaryKeywords:
  - janusgraph api
  - gremlin server
  - pandas functionality
  - python scripts
  - graph data manipulation
seoOptimized: true
topicFamily: datascience
topicFamilyConfidence: 0.9
kind: project
entryLayout: project
showInProjects: true
showInNotes: false
showInWriting: false
showInLogs: false
---

A collection of Python scripts that integrate pandas functionality with JanusGraph and Gremlin servers. This repository provides tools to create a sample database of every zip code in the United States as a proof of concept.

---

## Features

- Connect to JanusGraph and Gremlin servers using Python
- Load and transform US city and zip code data using pandas
- Create and modify graph vertices with properties such as `is_root` and `sprouted`
- Query and manipulate graph data programmatically
- Clear existing graph data for fresh imports

## Tech Stack

- Python 3
- JanusGraph
- Gremlin Server
- pandas (via a custom `PandasFunctions` module)
- gremlin-python client

## Getting Started

### Prerequisites

- Python 3.x installed
- JanusGraph and Gremlin Server running and accessible
- Required Python packages (see assumptions below)

### Installation

```bash
# Clone the repo
git clone https://github.com/justin-napolitano/JanusGraphAPI.git
cd JanusGraphAPI

# (Assuming a requirements.txt exists or install manually)
pip install gremlinpython pandas
```

### Running

Scripts are standalone and can be run directly. For example, to prepare the zip code database:

```bash
python PrepareZipCodeDB.py
```

To add the `is_root` property to city vertices:

```bash
python AddIsRootProperty.py
```

To clear all vertices in the graph:

```bash
python CleareGraph.py
```

## Project Structure

- `AddIsRootProperty.py`: Adds an `is_root` property to city vertices.
- `AddChildrenToRoot.py`: Contains functions to retrieve root vertices and their children URLs.
- `AddSproutedProperty.py`: Adds a `sprouted` property to city vertices.
- `Application.py` and `TSubmit.py`: Example scripts demonstrating connection and vertex addition.
- `CleareGraph.py`: Deletes all vertices from the JanusGraph database.
- `GremlinConnect.py`: Defines the `GremlinConnection` class for connecting and interacting with Gremlin server.
- `PrepareCityDB.py` and `PrepareZipCodeDB.py`: Prepare city and zip code dataframes and export them.
- `Query.py`: Query utilities for retrieving vertices by label or property.
- CSV files (`uscities.csv`, `zip_code_database_standard.csv`, `state_df.csv`): Source data files.
- `add children_to_root_url.py`: Placeholder or incomplete script.

## Assumptions

- The IP address `192.168.1.195` and port `8182` are the JanusGraph server endpoints.
- The `PandasFunctions` module is a custom wrapper around pandas for loading, transforming, and writing data.
- Some scripts are incomplete or placeholders.

## Future Work / Roadmap

- Implement full data ingestion pipeline from CSVs to JanusGraph vertices and edges.
- Enhance error handling and logging across scripts.
- Add support for edge creation and complex graph queries.
- Parameterize connection details for flexibility.
- Provide Docker or environment setup scripts for easier deployment.
- Add unit and integration tests.
- Improve documentation with usage examples and API references.


