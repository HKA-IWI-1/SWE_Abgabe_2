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

import '../../../pages/BookDetails/BookDetails.scss';
import { Col, Row } from 'react-bootstrap';
import { type BookDTO } from '../../../entities/BookDTO.ts';

export const InfoBar = ({ datum, lieferbar, homepage }: BookDTO) => {
    const lieferElement = lieferbar === true && (
        <Col className={'border-black border-end border-2'}>
            <span className={'pe-2'}>Lieferbar</span>
            {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
            {lieferbar && (
                <i className="bi bi-check-circle" style={{ color: 'green' }} />
            )}
            {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
            {!lieferbar && (
                <i className="bi bi-x-octagon" style={{ color: 'red' }} />
            )}
        </Col>
    );

    return (
        <Row xs={3} md={3} lg={4}>
            <Col className={'border-black border-end border-2'}>
                <i className="bi bi-calendar-date pe-2"></i>
                <span>{datum ?? 'N/A'}</span>
            </Col>
            {lieferElement}
            <Col>
                <i className="bi bi-globe pe-2"></i>
                <a
                    target={'_blank'}
                    href={homepage ?? ''}
                    rel="noreferrer"
                    className={'text-dark'}
                >
                    {homepage ?? 'N/A'}
                </a>
            </Col>
        </Row>
    );
};
