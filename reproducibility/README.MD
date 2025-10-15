# Metamodel to Blockly Generator

Converts Ecore metamodels into Blockly blocks with:
- TSX React components generation
- Interactive web editor
- Stable color generation
- TypeScript type safety

## Installation

1. Clone this repository
2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Generate TSX Blocks
```bash
python Model2Block.py --output tsx your_metamodel.ecore
```

### Generate Web Editor
```bash
python Model2Block.py --output web model.ecore
```

This will generate a directory `generated/[modelname]-visualci` containing a React app with Blockly integration.

To run the app:
1. Navigate to the generated directory:
```bash
cd generated/[modelname]-visualci
```
2. Install dependencies (only first time):
```bash
npm install
```
3. Start the development server:
```bash
npm start
```

Open your browser to `http://localhost:3000` to use the Blockly editor.

### Using the Blockly Editor
- Drag blocks from the toolbox on the left to the workspace
- Connect blocks together to create models
- Use the "Export XML" button to save your model
- Use the "Clear" button to reset the workspace

### Features
- **Stable Colors**: Uses CRC32 hashing for consistent block colors
- **TypeScript Support**: Generates fully typed TSX components
- **Web Interface**: Includes export functionality and workspace controls
- **Relationships**: Handles both containments and references

## Quick Start

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Detailed Usage

### Command Line Options
```bash
Convert Ecore metamodels to Blockly blocks

positional arguments:
  metamodel             Path to the Ecore metamodel file

optional arguments:
  -h, --help            show this help message and exit
  --output {web,json,tsx}
                        Output format (web: full project, tsx: just blocks
                        file, json: raw blocks)
```

### Examples

1. Generate TSX blocks with custom filename:
```bash
python Model2Block.py --output tsx  model.ecore
```

2. Generate Web editor:
```bash
python Model2Block.py --output web  model.ecore
```

## Output Structure

- **JSON Output**: `blockly_editor.json`
  - JSON blocks
  
- **TSX Output**: `generated/[modelname]-blocks.tsx`
  - React components
  - Ready for integration with Blockly React projects

- **WEB Output**: `generated/[modelname]-visualci`
  - Interactive Blockly workspace
  - Drag-and-drop interface   

## Development

### Requirements
- Python 3.8+
- Packages: `pyecore`, `blockly`
- **For web output**: Node.js and npm

### Customization
To modify block generation:
1. Edit `create_block_from_class.py`
2. Adjust color mappings and block templates

### Testing
Generate a web project for testing:
```bash
python Model2Block.py --output web your_metamodel.ecore
```

Generate TSX blocks:
```bash
python Model2Block.py --output tsx your_metamodel.ecore
```
