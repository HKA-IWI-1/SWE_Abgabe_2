/*
 * Copyright (c) 2024 - present Adrian Spindler, Luca Breisinger, Ronny Friedmann
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

import { type ApolloError, type ApolloQueryResult } from '@apollo/client';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FormProvider, type SubmitHandler } from 'react-hook-form';
import { type BuchArt } from '../../entities/BuchArt.ts';
import { type BuchType } from '../../entities/BuchType.ts';
import { Buchart } from '../../components/SearchBook/Buchart/Buchart';
import { Isbn } from '../../components/SearchBook/Isbn/Isbn';
import { Lieferbar } from '../../components/SearchBook/Lieferbar/Lieferbar';
import { NavBar } from '../../components/NavBar/NavBar/NavBar.tsx';
import { READ_BOOK } from './queries.ts';
import { Rating } from '../../components/SearchBook/Rating/Rating';
import { Suchergebnis } from '../../components/SearchBook/Suchergebnis/Suchergebnis';
import { Titel } from '../../components/SearchBook/Titel/Titel';
import { useForm } from 'react-hook-form';
import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';

export interface FormValues {
    art: BuchArt | undefined;
    isbn: string;
    lieferbar: boolean;
    rating: string;
    titel: string;
}

interface QueryTypes {
    loading: boolean;
    error?: ApolloError | undefined;
    data:
        | {
              buecher: BuchType[] | undefined;
          }
        | undefined;
    refetch: () => Promise<ApolloQueryResult<any>>;
}

interface Variables {
    isbn?: string;
    rating?: number;
    art?: string;
    lieferbar?: boolean;
    titel?: string;
}

// eslint-disable-next-line max-lines-per-function
export const SearchBook = () => {
    const [searchBook, result] = useLazyQuery(READ_BOOK);
    const { loading, error, data, refetch } = result as QueryTypes;
    const [isLieferbarUsed, setIsLieferbarUsed] = useState(false);
    const [isRatingUsed, setIsRatingUsed] = useState(false);

    const SearchInput: SubmitHandler<FormValues> = async (bookData) => {
        const variables: Variables = {};
        if (bookData.titel) {
            variables.titel = bookData.titel;
        }
        if (bookData.isbn) {
            variables.isbn = bookData.isbn;
        }
        if (isRatingUsed) {
            variables.rating = Number.parseInt(bookData.rating, 10);
        }
        if (bookData.art) {
            variables.art = bookData.art;
        }
        if (isLieferbarUsed) {
            variables.lieferbar = bookData.lieferbar;
        }

        await searchBook({
            variables: { suchkriterien: variables },
        });
    };

    const methods = useForm<FormValues>({
        defaultValues: {
            rating: undefined,
            art: undefined,
            lieferbar: undefined,
            isbn: undefined,
            titel: undefined,
        },
    });

    const { handleSubmit } = methods;

    const handleLieferbarChange = () => {
        setIsLieferbarUsed(!isLieferbarUsed);
    };

    const handleRatingChange = () => {
        setIsRatingUsed(!isRatingUsed);
    };

    return (
        <>
            <NavBar />
            <FormProvider {...methods}>
                <Form onSubmit={handleSubmit(SearchInput)}>
                    <Container>
                        <Row>
                            <Col>
                                <Titel />
                            </Col>
                            <Col>
                                <Isbn />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={5}>
                                <Form.Check
                                    type="switch"
                                    id="rating-switch"
                                    label="Rating aktivieren"
                                    checked={isRatingUsed}
                                    onChange={handleRatingChange}
                                />
                                {isRatingUsed && <Rating />}
                            </Col>
                            <Col md="auto">
                                <Buchart />
                            </Col>
                            <Col xs={2} className="justify-content-end">
                                <Form.Check
                                    type="switch"
                                    id="lieferbar-switch"
                                    label="Lieferbar aktivieren"
                                    checked={isLieferbarUsed}
                                    onChange={handleLieferbarChange}
                                />
                                {isLieferbarUsed && <Lieferbar />}
                            </Col>
                        </Row>
                        <Row></Row>
                        <Row>
                            <Col>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="mt-3 w-100 d-flex justify-content-center"
                                >
                                    Suchen
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </FormProvider>

            <Button className="mt-5 ms-5 mb-2" onClick={() => refetch()}>
                <i className="bi bi-arrow-clockwise" />
            </Button>

            <Suchergebnis loading={loading} error={error} data={data} />
        </>
    );
};
