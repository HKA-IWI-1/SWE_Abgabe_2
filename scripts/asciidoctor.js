/*
 * Copyright (c) 2024 - present Florian Sauer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the “Software”), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions
 * of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

import asciidoctor from '@asciidoctor/core';
import kroki from 'asciidoctor-kroki';
import { join } from 'node:path';
import url from 'node:url';

const adoc = asciidoctor();
console.log(`Asciidoctor.js ${adoc.getVersion()}`);

kroki.register(adoc.Extensions);

const options = {
  safe: 'safe',
  attributes: { linkcss: true },
  base_dir: '.extras/doc/projectManual',
  to_dir: 'html',
  mkdirs: true,
};
adoc.convertFile(
  join('.extras', 'doc', 'projectManual', 'projectManual.adoc'),
  options,
);

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
console.log(
  `HTML-File ${join(
    __dirname,
    '..',
    '.extras',
    'doc',
    'projectManual',
    'html',
    'projectManual.html',
  )}`,
);
