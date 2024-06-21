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

import { type BuchType } from '../../../entities/BuchType.ts';
import { Table } from 'react-bootstrap';

export const MainData = (buch: BuchType) => (
    <Table>
        <thead style={{ display: 'none' }}>
            <tr>
                <th>Attribut</th>
                <th>Wert</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>ISBN</td>
                <td>{buch.isbn}</td>
            </tr>
            <tr>
                <td>Rating</td>
                <td>{buch.rating}</td>
            </tr>
            <tr>
                <td>Art</td>
                <td>{buch.art}</td>
            </tr>
            <tr>
                <td>Preis</td>
                <td>{buch.preis} €</td>
            </tr>
            <tr>
                <td>Rabatt</td>
                <td>{buch.rabatt}</td>
            </tr>
            <tr>
                <td>Schlagwörter</td>
                <td>
                    {buch.schlagwoerter ? buch.schlagwoerter.join(', ') : ''}
                </td>
            </tr>
        </tbody>
    </Table>
);
