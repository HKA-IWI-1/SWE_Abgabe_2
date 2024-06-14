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
import { type ApolloError } from '@apollo/client/errors';
import { BOOKS_TYPES } from './queries.ts';
import { Bar } from 'react-chartjs-2';
import { type BuchType } from '../../entities/BuchType.ts';
import { CustomDiagram } from '../../components/Diagrams/CustomDiagram.tsx';
import { useQuery } from '@apollo/client';

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

interface QueryTypes {
    loading: boolean;
    error?: ApolloError | undefined;
    data: { buecher: BuchType[] } | undefined;
}

export const DiagramDates = () => {
    const { loading, error, data }: QueryTypes = useQuery(BOOKS_TYPES, {
        variables: {},
    });

    if (error) {
        console.log(error.message);
    }

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

    return (
        <>
            <CustomDiagram loading={loading} error={error}>
                <h1>Buch-Typen</h1>
                <Bar options={options} data={chartData} />
            </CustomDiagram>
        </>
    );
};
