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

import {
    BarElement,
    CategoryScale,
    Chart,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { type Buch } from '../../../entities/Buch.ts';

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Veröffentlichung von Büchern nach Monaten',
        },
    },
};

export const CustomChart = ({
    data,
}: {
    data: { buecher: Buch[] } | undefined;
}) => {
    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
    );

    const booksPerMonth: number[] = [];

    data?.buecher.forEach((buch) => {
        const date = new Date(Date.parse(buch.datum!));
        const month = date.getMonth();
        booksPerMonth[month] = booksPerMonth[month]
            ? booksPerMonth[month] + 1
            : 1;
    });

    const labels = [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
    ];

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Bücher',
                data: booksPerMonth,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return <Bar options={options} data={chartData} />;
};
