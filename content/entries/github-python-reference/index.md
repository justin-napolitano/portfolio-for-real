---
slug: github-python-reference
id: github-python-reference
title: 'Python Reference: Algorithms and Data Structures in Python'
repo: justin-napolitano/Python_Reference
githubUrl: 'https://github.com/justin-napolitano/Python_Reference'
generatedAt: '2025-11-24T21:36:06.417Z'
source: github-auto
summary: >-
  Explore a curated collection of fundamental algorithms and data structures
  implemented in Python for practical reference and learning.
tags:
  - python
  - algorithms
  - data structures
  - sorting algorithms
  - search algorithms
  - graph algorithms
  - utility scripts
seoPrimaryKeyword: python algorithms reference
seoSecondaryKeywords:
  - data structures in python
  - sorting algorithms python
  - search algorithms python
  - graph algorithms python
  - python utility scripts
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

Python_Reference is a curated collection of fundamental algorithms and data structures implemented in Python. It serves as a practical reference for developers looking to understand or implement classic algorithms ranging from sorting and searching to graph algorithms and data structures.

## Features

- Implementations of common sorting algorithms: insertion sort, selection sort, merge sort, quick sort, shell sort, and bubble sort.
- Search algorithms including sequential search, ordered sequential search, and binary search (iterative and recursive).
- Data structures such as stacks, queues, linked lists (single, circular), trees (binary, AVL), and heaps.
- Graph algorithms including Prim's Minimum Spanning Tree (MST) with adjacency matrix and heap-based implementations.
- Utility algorithms like palindrome checker, list summation, and Sierpinski triangle drawing.

## Tech Stack

- Python 3

## Getting Started

### Prerequisites

- Python 3.x installed on your system.

### Installation

Clone the repository:

```bash
git clone https://github.com/justin-napolitano/Python_Reference.git
cd Python_Reference
```

### Running Examples

Most scripts can be run directly using Python. For example, to run the shell sort example:

```bash
python shell_sort.py
```

Similarly, linked list and circular list examples include `if __name__ == "__main__"` blocks for direct execution.

## Project Structure

- `avl_tree.py`, `binary_tree.py`, `build_tree.py`, `node.py`: Implementations related to tree data structures including AVL trees.
- Sorting algorithms: `insertionSort.py`, `selection_sort.py`, `mergeSort.py`, `quick_sort.py`, `quicksort.py`, `shell_sort.py`, `short_bubble.py`.
- Searching algorithms: `sequential_search.py`, `ordered_sequential_search.py`, `binary_search_iterative.py`, `binary_search_recursive.py`, `binary_searchK.py`.
- Data structures: `stack.py`, `queue.py`, `py_stack.py`, `dequeue.py`, `single_list_push.py`, `cirular_list_push.py`, `single_to_circular.py`, `unordered_list.py`, `ordered_list.py`.
- Graph algorithms: `prims_algorithm.py`, `prims_algorithm_heap.py`.
- Utility scripts: `palchecker.py` (palindrome checker), `listsum.py` (list summation), `sierpinski_triangle.py` (drawing fractal using turtle graphics), `TowerOfHanoi.py`.
- Other: `lawOfRecursion.txt` (likely notes or explanations related to recursion).

## Future Work / Roadmap

- Add comprehensive unit tests for all algorithms and data structures.
- Improve documentation with usage examples and complexity analysis.
- Implement additional graph algorithms (e.g., Dijkstra, BFS, DFS).
- Refactor and modularize code for better reusability.
- Add performance benchmarks comparing implementations.
- Integrate type hinting and static analysis for improved code quality.

---

*Note: This repository appears to be a personal reference collection. Contributions and issues may be limited.*


