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

import { type Buch } from '../../../entities/Buch.ts';
import { Chart } from 'react-google-charts';

const options = {
    wordtree: {
        format: 'implicit',
    },
};

export const CustomChart = ({
    data,
}: {
    data: { buecher: Buch[] } | undefined;
}) => {
    const booksPerDate = new Map();
    data?.buecher.forEach((buch) => {
        const date = buch.datum ?? '';
        if (booksPerDate.has(date)) {
            booksPerDate.set(date, booksPerDate.get(date) + 1);
        } else {
            booksPerDate.set(date, 1);
        }
    });

    const chartData = [
        [
            { type: 'date', id: 'Date' },
            {
                type: 'number',
                id: 'AmountPerDay',
            },
        ],
        ...Array.from(booksPerDate).map(([date, value]) => [
            new Date(Date.parse(date as string)),
            value as number,
        ]),
    ];

    return (
        <Chart
            chartType="Calendar"
            data={chartData}
            options={options}
            width={'100%'}
            height={'400px'}
        />
    );
};