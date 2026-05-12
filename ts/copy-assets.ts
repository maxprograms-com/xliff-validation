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

import { chmodSync, copyFileSync, cpSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

const files = ['xliffvalidator.cmd', 'xliffvalidator.sh'];

for (const file of files) {
    let filepath = join('dist', basename(file));
    copyFileSync(file, filepath);
    const stats = statSync(filepath);
    let newMode = stats.mode;
    newMode |= 0o111; // Octal: execute bits
    chmodSync(filepath, newMode);
}

cpSync('./catalog', './dist/catalog', { recursive: true });
