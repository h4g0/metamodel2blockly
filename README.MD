# Metamodel to Blockly Generator

Converts Ecore and BESSER JSON metamodels into Blockly blocks with:

* TSX React component generation
* Interactive web editor
* Stable color generation
* TypeScript type safety

## Supported Metamodel Formats

The tool accepts the following formats as input:

* **Ecore metamodels** (`.ecore`)
* **BESSER JSON metamodels** (`.json`)

---

## Installation

1. Clone this repository
2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

---

## Usage

### Generate TSX Blocks

```bash
python Model2Block.py --output tsx your_metamodel.ecore
# or
python Model2Block.py --output tsx your_besser_metamodel.json
```

### Generate Web Editor

```bash
python Model2Block.py --output web model.ecore
# or
python Model2Block.py --output web model.json
```

This creates:

```
generated/[modelname]-visualci
```

A full React + Blockly application.

---

## Running the Generated Web Application

1. Navigate to the generated project:

```bash
cd generated/[modelname]-visualci
```

2. Install dependencies:

Using **npm**:

```bash
npm install
```

Using **yarn**:

```bash
yarn
```

3. Start the development server:

Using **npm**:

```bash
npm start
# or
npm run dev
```

Using **yarn**:

```bash
yarn start
# or
yarn dev
```

4. Open your browser at:

```
http://localhost:3000
```

---

## Using the Blockly Editor

* Drag blocks from the toolbox onto the workspace
* Connect them to define models
* Use **Export XML** to save models
* Use **Clear Workspace** to start over

---

## Features

* **Stable Colors** via CRC32 hashing
* **Typed TSX Blocks**
* **Full Web Interface** with live Blockly workspace
* **Support for References & Containments**
* **Ecore + BESSER JSON Compatible**

---

## Quick Start

```bash
python Model2Block.py --output web your_metamodel.ecore
cd generated/yourmodel-visualci
npm install
npm run dev
```

---

## Command Line Options

```
positional arguments:
  metamodel             Path to the .ecore or .json metamodel file

optional arguments:
  -h, --help            Show help
  --output {web,json,tsx}
                        web  : full React project
                        tsx  : TSX blocks only
                        json : generated raw block definitions
```

---

## Output Structure

### JSON Output (`--output json`)

* `blockly_editor.json`

### TSX Output (`--output tsx`)

* `generated/[modelname]-blocks.tsx`

### Web Output (`--output web`)

* `generated/[modelname]-visualci`

  * React + Blockly editor
  * Can be launched using **npm start**, **npm run dev**, **yarn start**, or **yarn dev**

---

## Development

### Requirements

* Python 3.8+
* `pyecore`, `blockly`
* Node.js + npm **or** yarn (for web generation)

### Customization

Edit `create_block_from_class.py` to change block templates or color logic.

### Testing

```bash
python Model2Block.py --output web your_metamodel.ecore
python Model2Block.py --output tsx your_metamodel.json
```