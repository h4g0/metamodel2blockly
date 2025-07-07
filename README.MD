# CI/CD Configuration Parser

This script provides functionalities to parse and visualize CI/CD configuration files, specifically for GitHub Actions and Travis CI into our metamodel. It allows you to run tests, visualize models, and perform various operations on configuration files.

## Features

- **Visualize Ecore Model**: Generate a visual representation of the Ecore model.
- **Run Tests**: Execute tests for GitHub Actions and Travis CI configurations.
- **File Operations**: Copy random files for validation and count instances.

## Requirements

- Python 3.x
- Required Python packages: `argparse`, `yaml`, `pyecore` and other dependencies specified in your script.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

The script can be run with various command-line arguments to perform different tasks. Below are the available options:

### Visualize Ecore Model

To visualize the Ecore model, use the `--visualize` flag:
```bash
python main.py --visualize
```

### Run All GitHub Actions Tests

To run all tests for GitHub Actions configurations, use the `--run_all_ga` flag:
```bash
python main.py --run_all_ga
```

### Run All Travis CI Tests

To run all tests for Travis CI configurations, use the `--run_all_travis` flag:
```bash
python main.py --run_all_travis
```

### Run a Specific GitHub Actions Test

To run a test for a specific GitHub Actions configuration file, use the `--run_test_ga` flag followed by the filename:
```bash
python main.py --run_test_ga <filename.yml>
```

### Run a Specific Travis CI Test

To run a test for a specific Travis CI configuration file, use the `--run_test_travis` flag followed by the filename:
```bash
python main.py --run_test_travis <filename.yml>
```
