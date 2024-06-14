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

import { Col, Row } from 'react-bootstrap';
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { BackButton } from '../BackButton/BackButton.tsx';
import { type BuchType } from '../../../entities/BuchType.ts';
import { Buchart } from '../BuchArt/Buchart.tsx';
import { Buchpreis } from '../Buchpreis/Buchpreis.tsx';
import { Buchrabatt } from '../../BookDetails/Buchrabatt/Buchrabatt.tsx';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Datum } from '../../BookDetails/Datum/Datum.tsx';
import Form from 'react-bootstrap/Form';
import { Homepage } from '../../BookDetails/Homepage/Homepage.tsx';
import { Isbn } from '../../BookDetails/Isbn/Isbn.tsx';
import { Lieferbar } from '../../BookDetails/Lieferbar/Lieferbar.tsx';
import { Rating } from '../Rating/Rating.tsx';
import { Schlagwoerter } from '../Schlagwoerter/Schlagwoerter.tsx';
import { StatusModal } from '../StatusModal/StatusModal.tsx';
import { Titel } from '../Titel/Titel.tsx';
import { UPDATE_MUTATION } from './mutations.ts';
import { paths } from '../../../config/paths.ts';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

export interface FormValues {
    version: string;
    rating: string;
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
export const EditBookForm = ({ buch, id }: { buch: BuchType; id: number }) => {
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
                rating: Number.parseInt(bookData.rating, 10),
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
                if (err instanceof Error) {
                    console.error(err);
                    setUpdateMessage({
                        visible: true,
                        nachricht: `Fehler: ${err.message}`,
                        error: true,
                    });
                } else {
                    setUpdateMessage({
                        visible: true,
                        nachricht: 'Ein unbekannter Fehler ist aufgetreten.',
                        error: true,
                    });
                }
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
        reValidateMode: 'onBlur',
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
                    <Row className={'pt-2'} xs={3} md={3} lg={3}>
                        <Col md={{ span: 2 }} style={{ width: '4rem' }}>
                            <BackButton isDirty={isDirty} />
                        </Col>
                        <Titel
                            titel={buch.titel.titel}
                            untertitel={buch.titel.untertitel}
                        />
                    </Row>
                    <Row>
                        <Rating
                            register={register}
                            rating={buch.rating ?? 'N/A'}
                            errors={errors}
                            watch={watch}
                        />
                    </Row>
                    <Row>
                        <Buchart
                            register={register}
                            art={buch.art}
                            errors={errors}
                        />
                    </Row>
                    <Row>
                        <Buchpreis register={register} errors={errors} />
                        <Buchrabatt register={register} errors={errors} />
                    </Row>
                    <Row>
                        <Lieferbar
                            register={register}
                            lieferbar={buch.lieferbar ?? false}
                            errors={errors}
                        />
                    </Row>
                    <Row>
                        <Homepage register={register} errors={errors} />
                    </Row>
                    <Row>
                        <Isbn register={register} errors={errors} />
                    </Row>
                    <Row>
                        <Datum register={register} errors={errors} />
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
                <StatusModal
                    updateMessage={updateMessage}
                    setUpdateMessage={setUpdateMessage}
                    routingPath={`/${paths.bookDetails}/${id}`}
                />
            )}
        </>
    );
};
