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
    legend: 'none',
    pieSliceText: 'label',
    title: 'Anzahl der Bücher anhand der Arten',
    pieStartAngle: 100,
};

export const CustomChart = ({
    data,
}: {
    data: { buecher: Buch[] } | undefined;
}) => {
    const chartData = new Map();
    chartData.set('Art', 'Anzahl');

    data?.buecher.forEach((buch: Buch) => {
        if (chartData.has(buch.art)) {
            chartData.set(buch.art, chartData.get(buch.art) + 1);
        } else {
            chartData.set(buch.art, 1);
        }
    });

    return (
        <Chart
            chartType="PieChart"
            data={Array.from(chartData)}
            options={options}
            width={'100%'}
            height={'400px'}
        />
    );
};
