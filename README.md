# xliff-validation

This project is an example of how to use [TypesXLIFF](https://github.com/maxprograms-com/typesxliff) to validate XLIFF files from a command-line interface (CLI).

## Installation

### Option 1: Install globally with npm

```bash
npm install -g xliff-validation
```

Then run:

```bash
xliffvalidator -xliff <path-to-file.xlf>
```

### Option 2: Clone and build from source

```bash
git clone https://github.com/maxprograms-com/xliff-validation.git
cd xliff-validation
npm install
npm run build
```

Then run:

```bash
./dist/xliffvalidator.js -xliff <path-to-file.xlf>
```

## Usage

Run the validator with:

```bash
xliffvalidator -xliff <path-to-file.xlf>
```

Use a custom catalog file (optional):

```bash
xliffvalidator -xliff <path-to-file.xlf> -catalog <path-to-catalog.xml>
```

For help:

```bash
xliffvalidator -help
```

Output:

``` text
Usage:

  xliffvalidator -xliff <file> [-catalog <file>] [-help]

Options:

  -xliff <file>    Path to the XLIFF file to validate (required)
  -catalog <file>  (optional) Path to a custom catalog file
  -help            (optional) Show this help message and exit
```
