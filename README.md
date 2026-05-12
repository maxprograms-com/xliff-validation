# xliff-validation

This project is an example of how to use [TypesXLIFF](https://github.com/maxprograms-com/typesxliff) to validate XLIFF files from a command-line interface (CLI).

## Clone

```bash
git clone https://github.com/maxprograms-com/xliff-validation.git
cd xliff-validation
```

## Build

Install dependencies and compile the project:

```bash
npm install
npm run build
```

The compiled files are generated in `dist/`.

## Execute

Run the validator with:

```bash
./dist/xliffvalidator.sh -xliff <path-to-file.xlf>
```

Use a custom catalog file (optional):

```bash
./dist/xliffvalidator.sh -xliff <path-to-file.xlf> -catalog <path-to-catalog.xml>
```

Executing `./dist/xliffvalidator.sh -help` prints:

```
Usage:

  xliffvalidator.sh -xliff <file> [-catalog <file>] [-help]

Options:

  -xliff <file>    Path to the XLIFF file to validate (required)
  -catalog <file>  (optional) Path to a custom catalog file
  -help            (optional) Show this help message and exit
```
