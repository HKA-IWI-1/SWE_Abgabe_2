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

import { type ApolloError } from '@apollo/client/errors';
import Container from 'react-bootstrap/Container';
import { NavBar } from '../NavBar/NavBar/NavBar.tsx';
import type React from 'react';
import { Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

interface QueryTypes {
    loading: boolean;
    error: ApolloError | undefined;
    children: React.JSX.Element[];
}

export const CustomDiagram = ({ loading, error, children }: QueryTypes) => (
    <>
        <NavBar />
        <Container>
            {loading && (
                <Row>
                    <Spinner variant="primary" animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            )}
            {!loading && error && <h1>Es ist ein Fehler aufgetreten.</h1>}
            {!loading && !error && (
                <>
                    <Row className={'mb-4 pt-1'}>{...children}</Row>
                </>
            )}
        </Container>
    </>
);
