---
slug: github-pandasapi
id: github-pandasapi
title: 'PandasAPI: Streamlined ETL and Data Science Workflows'
repo: justin-napolitano/PandasAPI
githubUrl: 'https://github.com/justin-napolitano/PandasAPI'
generatedAt: '2025-11-24T21:35:52.024Z'
source: github-auto
summary: >-
  A library of utility functions for efficient ETL and data manipulation using
  pandas in Python.
tags:
  - pandas
  - python
  - data science
  - ETL
  - ELT
  - data transformation
  - dataframes
seoPrimaryKeyword: pandas data manipulation library
seoSecondaryKeywords:
  - ETL with pandas
  - dataframe utility functions
  - python data processing
  - pandas API
  - data transformation tools
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

A collection of common functions designed to streamline ETL, ELT, and data science workflows using pandas. This library provides utility methods for loading, transforming, and writing pandas DataFrames.

## Features

- Load CSV files into pandas DataFrames with a wrapper function.
- Create DataFrames from lists, series, or dictionaries.
- Generate empty DataFrames.
- Convert DataFrames to dictionaries with multiple orientation options.
- Write DataFrames to CSV files with customizable parameters.

## Tech Stack

- Python 3
- pandas

## Getting Started

### Prerequisites

- Python 3.x installed
- pandas library installed (`pip install pandas`)

### Installation

Clone the repository:

```bash
git clone https://github.com/justin-napolitano/PandasAPI.git
cd PandasAPI
```

### Usage

Import the `PandasFunctions` class from `PandasFunctions.py` and use its static methods:

```python
from PandasFunctions import PandasFunctions

# Load CSV
df = PandasFunctions.Load.csv_to_df('file.csv')

# Create DataFrame
new_df = PandasFunctions.Load.create_df([{'col1': 1, 'col2': 2}])

# Transform DataFrame
records = PandasFunctions.Transform.df_to_record_dict(new_df, orient='records')

# Write DataFrame
PandasFunctions.Write.data_frame_to_csv(new_df, 'output.csv')
```

## Project Structure

```
PandasAPI/
├── LICENSE
└── PandasFunctions.py   # Core utility functions for pandas operations
```

## Future Work / Roadmap

- Expand support for additional file formats (e.g., JSON, Excel).
- Add more transformation utilities for common data cleaning tasks.
- Enhance error handling and logging.
- Provide parameter flexibility for write operations.
- Include unit tests and example notebooks.


