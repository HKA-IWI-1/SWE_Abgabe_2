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

import { Col, Modal, Row } from 'react-bootstrap';
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { BackButton } from '../EditForm__BackButton/BackButton.tsx';
import { type BookDTO } from '../../entities/BookDTO.ts';
import { Buchart } from '../EditBook__BuchArt/Buchart.tsx';
import { Buchpreis } from '../EditBook__Buchpreis/Buchpreis.tsx';
import { Buchrabatt } from '../BookDetails__Buchrabatt/Buchrabatt.tsx';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Datum } from '../BookDetails__Datum/Datum.tsx';
import Form from 'react-bootstrap/Form';
import { Homepage } from '../BookDetails__Homepage/Homepage.tsx';
import { Isbn } from '../BookDetails__Isbn/Isbn.tsx';
import { Lieferbar } from '../BookDetails__Lieferbar/Lieferbar.tsx';
import { Rating } from '../EditBook__Rating/Rating.tsx';
import { Schlagwoerter } from '../BookDetails__Schlagwoerter/Schlagwoerter.tsx';
import { Title } from '../EditBook__Titel/Title.tsx';
import { UPDATE_MUTATION } from '../Login/queries_mutations.ts';
import { paths } from '../../config/paths.ts';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export interface FormValues {
    version: string;
    titel: string;
    rating: number;
    art: 'KINDLE' | 'DRUCKAUSGABE';
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    homepage: string;
    isbn: string;
    datum: string;
    schlagwoerter: string[];
}

const RABATT_TEILER = 100;

// eslint-disable-next-line max-lines-per-function
export const EditBookForm = ({ buch, id }: { buch: BookDTO; id: number }) => {
    const navigate = useNavigate();
    const [updateBook] = useMutation(UPDATE_MUTATION);
    const [updateMessage, setUpdateMessage] = useState({
        visible: false,
        nachricht: 'N/A',
        error: false,
    });

    const UpdateBook: SubmitHandler<FormValues> = (bookData) => {
        updateBook({
            variables: {
                id,
                version: bookData.version,
                isbn: bookData.isbn,
                rating: bookData.rating,
                art: bookData.art,
                preis: bookData.preis,
                rabatt: bookData.rabatt / RABATT_TEILER,
                lieferbar: bookData.lieferbar,
                datum: bookData.datum,
                homepage: bookData.homepage,
                schlagwoerter: bookData.schlagwoerter,
            },
        })
            .then(() =>
                setUpdateMessage({
                    visible: true,
                    nachricht: 'Das Aktualisieren war erfolgreich.',
                    error: false,
                }),
            )
            .catch((err) => {
                setUpdateMessage({
                    visible: true,
                    nachricht:
                        'Beim Aktualisieren ist ein unbekannter Fehler aufgetreten.',
                    error: true,
                });
                console.log(err);
            });
    };

    const rabattParsed =
        buch.rabatt === undefined
            ? 0
            : Number.parseFloat(
                  buch.rabatt
                      .slice(0, Math.max(0, buch.rabatt.length - 1))
                      .trim(),
              );

    const {
        control,
        watch,
        register,
        unregister,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            version: buch.version,
            titel: buch.titel.titel,
            rating: buch.rating,
            art: buch.art,
            preis: buch.preis,
            rabatt: rabattParsed,
            lieferbar: buch.lieferbar,
            homepage: buch.homepage,
            isbn: buch.isbn,
            datum: buch.datum,
            schlagwoerter: buch.schlagwoerter,
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        name: 'schlagwoerter',
    });

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit(UpdateBook)}>
                    <Row className={'pt-2'} xs={2} md={2} lg={2}>
                        <Col md={{ span: 2 }} style={{ width: '4rem' }}>
                            <BackButton isDirty={isDirty} />
                        </Col>
                        <Title
                            register={register}
                            buch={buch}
                            errors={errors}
                        />
                    </Row>
                    <Row>
                        <Rating
                            register={register}
                            buch={buch}
                            errors={errors}
                            watch={watch}
                        />
                    </Row>
                    <Row>
                        <Buchart
                            register={register}
                            buch={buch}
                            errors={errors}
                        />
                    </Row>
                    <Row>
                        <Buchpreis
                            register={register}
                            buch={buch}
                            errors={errors}
                        />
                        <Buchrabatt
                            register={register}
                            buch={buch}
                            errors={errors}
                        />
                    </Row>
                    <Row>
                        <Lieferbar
                            register={register}
                            buch={buch}
                            errors={errors}
                        />
                    </Row>
                    <Row>
                        <Homepage
                            register={register}
                            buch={buch}
                            errors={errors}
                        />
                    </Row>
                    <Row>
                        <Isbn register={register} buch={buch} errors={errors} />
                    </Row>
                    <Row>
                        <Datum
                            register={register}
                            buch={buch}
                            errors={errors}
                        />
                    </Row>
                    <Schlagwoerter
                        register={register}
                        unregister={unregister}
                        fields={fields}
                        append={append}
                        remove={remove}
                    />
                    <Button variant="primary" type="submit">
                        Speichern
                    </Button>
                </Form>
            </Container>
            {updateMessage.visible && (
                <Modal
                    show={updateMessage.visible}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {updateMessage.nachricht}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button
                            onClick={() => {
                                if (updateMessage.error) {
                                    setUpdateMessage({
                                        visible: false,
                                        nachricht: 'N/A',
                                        error: updateMessage.error,
                                    });
                                } else {
                                    navigate(paths.root);
                                }
                            }}
                        >
                            Okay
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};
