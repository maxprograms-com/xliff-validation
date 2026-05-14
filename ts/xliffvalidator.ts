#!/usr/bin/env node
/*******************************************************************************
 * Copyright (c) 2026 Maxprograms.
 *
 * This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 1.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/org/documents/epl-v10.html
 *
 * Contributors:
 *     Maxprograms - initial API and implementation
 *******************************************************************************/

import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { XliffDocument, XliffParser } from "typesxliff";
import { Catalog, XMLAttribute } from "typesxml";

export class XLIFFValidator {

    constructor() {
        let xliffFile: string = '';
        let catalogFile: string = '';
        let args: string[] = process.argv;
        for (let i = 0; i < args.length; i++) {
            if (args[i] === '-catalog' && i + 1 < args.length) {
                catalogFile = args[i + 1];
            }
            if (args[i] === '-xliff' && i + 1 < args.length) {
                xliffFile = args[i + 1];
            }
            if (args[i] === '-help') {
                this.usage();
                process.exit(0);
            }
        }
        if (xliffFile === '') {
            this.usage();
            process.exit(1);
        }
        // Expand ~ to home directory if present in xliffFile
        if (xliffFile.startsWith('~')) {
            const home: string = homedir();
            if (xliffFile === '~') {
                xliffFile = home;
            } else if (xliffFile.startsWith('~/')) {
                xliffFile = join(home, xliffFile.slice(2));
            }
        }
        xliffFile = resolve(xliffFile);
        if (!existsSync(xliffFile)) {
            console.error('XLIFF file "' + xliffFile + '" does not exist.');
            process.exit(1);
        }
        if (catalogFile === '') {
            const __filename: string = fileURLToPath(import.meta.url);
            const __dirname: string = dirname(__filename);
            catalogFile = join(__dirname, 'catalog', 'catalog.xml');
        } else {
            if (catalogFile.startsWith('~')) {
                const home: string = homedir();
                if (catalogFile === '~') {
                    catalogFile = home;
                } else if (catalogFile.startsWith('~/')) {
                    catalogFile = join(home, catalogFile.slice(2));
                }
            }
            if (!existsSync(catalogFile)) {
                console.error('Catalog file "' + catalogFile + '" does not exist.');
                process.exit(1);
            }
            catalogFile = resolve(catalogFile);
        }
        const catalog: Catalog = new Catalog(catalogFile);
        const parser: XliffParser = new XliffParser();
        parser.setCatalog(catalog);
        parser.setValidating(true);
        try {
            parser.parseFile(xliffFile);
            const document: XliffDocument | undefined = parser.getXliffDocument();
            if (document) {
                const version: string = document.getVersion();
                let namespace: string = '';
                const attributes: Array<XMLAttribute> = document.getOtherAttributes();
                for (const attribute of attributes) {
                    if (attribute.getName() === 'xmlns') {
                        namespace = attribute.getValue();
                    }
                }
                if (namespace === '') {
                    console.error('XLIFF file is invalid');
                    console.error('Namespace declaration is missing');
                    process.exit(1);
                }
                switch (version) {
                    case '2.0':
                    case '2.1':
                        if (namespace !== 'urn:oasis:names:tc:xliff:document:2.0') {
                            console.error('XLIFF file is invalid');
                            console.error('Namespace declaration is invalid for version ' + version);
                            process.exit(1);
                        }
                        break;
                    case '2.2':
                        if (namespace !== 'urn:oasis:names:tc:xliff:document:2.2') {
                            console.error('XLIFF file is invalid');
                            console.error('Namespace declaration is invalid for version ' + version);
                            process.exit(1);
                        }
                        break;
                    default:
                        console.error('XLIFF file is invalid');
                        console.error('Unsupported XLIFF version: ' + version);
                        process.exit(1);
                }
                if (document.isValid()) {
                    console.log('XLIFF file is valid');
                } else {
                    console.error('XLIFF file is invalid');
                    console.error(document.getValidationError());
                    process.exit(1);
                }
            } else {
                console.error('XLIFF file is invalid');
                console.error('Failed to parse XLIFF file');
                process.exit(1);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('XLIFF file is invalid:', error.message);
            } else {
                console.error('XLIFF file is invalid:', error);
            }
            process.exit(1);
        }
    }

    usage(): void {
        console.log('Usage:\n');
        console.log('  xliffvalidator -xliff <file> [-catalog <file>] [-help]\n');
        console.log('Options:\n');
        console.log('  -xliff <file>    Path to the XLIFF file to validate (required)');
        console.log('  -catalog <file>  (optional) Path to a custom catalog file');
        console.log('  -help            (optional) Show this help message and exit');
    }
}

new XLIFFValidator();