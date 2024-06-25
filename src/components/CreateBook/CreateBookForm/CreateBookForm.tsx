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

import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { Abbildungen } from '../Abbildungen/Abbildungen';
import { type BuchArt } from '../../../entities/BuchArt.ts';
import { Buchart } from '../Buchart/Buchart';
import { CREATE_MUTATION } from './mutations.ts';
import { Datum } from '../Datum/Datum';
import { Homepage } from '../Homepage/Homepage';
import { Isbn } from '../Isbn/Isbn';
import { Lieferbar } from '../Lieferbar/Lieferbar';
import { Preis } from '../Preis/Preis';
import { Rabatt } from '../Rabatt/Rabatt';
import { Rating } from '../Rating/Rating';
import { Schlagwoerter } from '../Schlagwoerter/Schlagwoerter';
import { StatusModal } from '../StatusModal/StatusModal';
import { type SubmitHandler } from 'react-hook-form';
import { Titel } from '../Titel/Titel';
import { Untertitel } from '../Untertitel/Untertitel';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

export interface FormValues {
    version: string;
    titel: {
        titel: string;
        untertitel: string;
    };
    rating: string;
    art: BuchArt;
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    homepage: string;
    isbn: string;
    datum: string;
    abbildungen: [
        {
            beschriftung: string;
            contentType: string;
        },
    ];
    schlagwoerter: string[];
}

const RABATT_TEILER = 100;

// eslint-disable-next-line max-lines-per-function
export const CreateBookForm = () => {
    const [createMessage, setCreateMessage] = useState({
        visible: false,
        nachricht: 'N/A',
        error: false,
    });

    const [createBook, { loading }] = useMutation(CREATE_MUTATION, {
        onCompleted: () => {
            setCreateMessage({
                visible: true,
                nachricht: 'Das Erstellen war erfolgreich.',
                error: false,
            });
        },
        onError: (err) => {
            setCreateMessage({
                visible: true,
                nachricht: `Fehler: ${err.message}`,
                error: true,
            });
            console.error(err.message);
        },
    });

    const hideModal = () => {
        setCreateMessage({
            ...createMessage,
            visible: false,
        });
    };

    const CreateBook: SubmitHandler<FormValues> = async (bookData) => {
        await createBook({
            variables: {
                isbn: bookData.isbn,
                rating: Number.parseInt(bookData.rating, 10),
                art: bookData.art,
                preis: bookData.preis,
                rabatt: bookData.rabatt / RABATT_TEILER,
                lieferbar: bookData.lieferbar,
                datum: bookData.datum,
                homepage: bookData.homepage,
                schlagwoerter: bookData.schlagwoerter,
                titel: bookData.titel,
                abbildungen: bookData.abbildungen,
            },
        });
    };

    const methods = useForm<FormValues>({
        defaultValues: {
            rating: undefined,
            art: undefined,
            preis: undefined,
            rabatt: undefined,
            lieferbar: undefined,
            homepage: undefined,
            isbn: undefined,
            datum: undefined,
        },
        reValidateMode: 'onChange',
        mode: 'all',
    });

    const { control, handleSubmit } = methods;

    const {
        fields: schlagwoerterFields,
        append: schlagwoerterAppend,
        remove: schlagwoerterRemove,
    } = useFieldArray({
        control,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        name: 'schlagwoerter',
    });

    const {
        fields: abbildungenFields,
        append: abbildungenAppend,
        remove: abbildungenRemove,
    } = useFieldArray({
        control,
        name: 'abbildungen',
    });

    return (
        <>
            <FormProvider {...methods}>
                <Form onSubmit={handleSubmit(CreateBook)}>
                    <Container className="mb-5">
                        <Row>
                            <Col>
                                <Titel />
                                <Untertitel />
                            </Col>
                            <Col>
                                <Isbn />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Rating />
                            </Col>
                            <Col>
                                <Buchart />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Preis />
                            </Col>
                            <Col>
                                <Rabatt />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Homepage />
                            </Col>
                            <Col>
                                <Datum />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Lieferbar />
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Schlagwoerter
                                    fields={schlagwoerterFields}
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    append={schlagwoerterAppend}
                                    remove={schlagwoerterRemove}
                                />
                            </Col>
                            <Col>
                                <Abbildungen
                                    fields={abbildungenFields}
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    append={abbildungenAppend}
                                    remove={abbildungenRemove}
                                />
                            </Col>
                        </Row>
                        {loading && (
                            <Row>
                                <Spinner
                                    variant="primary"
                                    animation="border"
                                    role="status"
                                    className="mx-auto"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </Spinner>
                            </Row>
                        )}
                        <Row className="justify-content-md-center">
                            <Col xs={4}>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="mt-3 w-100 d-flex justify-content-center"
                                >
                                    Speichern
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                {createMessage.visible && (
                    <StatusModal
                        createMessage={createMessage}
                        onHide={hideModal}
                    />
                )}
            </FormProvider>
        </>
    );
};
