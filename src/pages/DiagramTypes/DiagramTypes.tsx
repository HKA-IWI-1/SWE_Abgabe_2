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

import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { type ApolloError } from '@apollo/client/errors';
import { BOOKS_TYPES } from './queries.ts';
import { type BuchType } from '../../entities/BuchType.ts';
import { Col } from 'react-bootstrap';
import { CustomDiagram } from '../../components/Diagrams/CustomDiagram.tsx';
import { Pie } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';

const dynamicColors = () => {
    const factor = 255;
    const r = Math.floor(Math.random() * factor);
    const g = Math.floor(Math.random() * factor);
    const b = Math.floor(Math.random() * factor);
    return `rgba(${r},${g},${b}, 0.5)`;
};

interface QueryTypes {
    loading: boolean;
    error?: ApolloError | undefined;
    data: { buecher: BuchType[] } | undefined;
}

export const DiagramTypes = () => {
    const { loading, error, data }: QueryTypes = useQuery(BOOKS_TYPES, {
        variables: {},
    });

    if (error) {
        console.log(error.message);
    }

    const dataMap = new Map();
    data?.buecher.forEach((buch: BuchType) => {
        if (dataMap.has(buch.art)) {
            dataMap.set(buch.art, dataMap.get(buch.art) + 1);
        } else {
            dataMap.set(buch.art, 1);
        }
    });
    const colors: string[] = [];
    dataMap.forEach(() => colors.push(dynamicColors()));
    const chartData = {
        labels: Array.from(dataMap.keys()),
        datasets: [
            {
                label: 'Anzahl der Bücher anhand der Art',
                data: Array.from(dataMap.values()),
                backgroundColor: colors,
            },
        ],
    };
    Chart.register(ArcElement, Tooltip, Legend);

    return (
        <>
            <CustomDiagram loading={loading} error={error}>
                <h1>Buch-Typen</h1>
                <Col style={{ maxHeight: '175%' }}>
                    <Pie data={chartData} />
                </Col>
            </CustomDiagram>
        </>
    );
};
