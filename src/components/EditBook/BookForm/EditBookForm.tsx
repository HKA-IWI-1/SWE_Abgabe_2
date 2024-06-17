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
    FormProvider,
    type SubmitHandler,
    useFieldArray,
    useForm,
} from 'react-hook-form';
import { type BuchType } from '../../../entities/BuchType.ts';
import { Buchart } from '../BuchArt/Buchart.tsx';
import { Buchpreis } from '../Buchpreis/Buchpreis.tsx';
import { Buchrabatt } from '../Buchrabatt/Buchrabatt.tsx';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Datum } from '../Datum/Datum.tsx';
import Form from 'react-bootstrap/Form';
import { Head } from '../Head/Head.tsx';
import { Homepage } from '../Homepage/Homepage.tsx';
import { Isbn } from '../Isbn/Isbn.tsx';
import { Lieferbar } from '../Lieferbar/Lieferbar.tsx';
import { Rating } from '../Rating/Rating.tsx';
import { Row } from 'react-bootstrap';
import { Schlagwoerter } from '../Schlagwoerter/Schlagwoerter.tsx';
import { StatusModal } from '../StatusModal/StatusModal.tsx';
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

const parseRabatt = (buch: BuchType) =>
    buch.rabatt === undefined
        ? 0
        : Number.parseFloat(
              buch.rabatt.slice(0, Math.max(0, buch.rabatt.length - 1)).trim(),
          );

const RABATT_TEILER = 100;

// eslint-disable-next-line max-lines-per-function
export const EditBookForm = ({ buch, id }: { buch: BuchType; id: number }) => {
    const [updateMessage, setUpdateMessage] = useState({
        visible: false,
        nachricht: 'N/A',
        error: false,
    });
    const [updateBook] = useMutation(UPDATE_MUTATION, {
        onCompleted: () => {
            setUpdateMessage({
                visible: true,
                nachricht: 'Das Aktualisieren war erfolgreich.',
                error: false,
            });
        },
        onError: (err) => {
            setUpdateMessage({
                visible: true,
                nachricht: `Fehler: ${err.message}`,
                error: true,
            });
        },
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
        }).catch((err) => {
            if (err instanceof Error) {
                console.error(err);
            }
        });
    };

    const methods = useForm<FormValues>({
        defaultValues: {
            version: buch.version,
            rating: buch.rating,
            art: buch.art,
            preis: buch.preis,
            rabatt: parseRabatt(buch),
            lieferbar: buch.lieferbar,
            homepage: buch.homepage,
            isbn: buch.isbn,
            datum: buch.datum,
            schlagwoerter: buch.schlagwoerter,
        },
        reValidateMode: 'onChange',
        mode: 'all',
    });
    const { control } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        name: 'schlagwoerter',
    });

    return (
        <>
            <Container>
                <FormProvider {...methods}>
                    <Form onSubmit={methods.handleSubmit(UpdateBook)}>
                        <Head buch={buch} />
                        <Rating rating={buch.rating ?? 'N/A'} />
                        <Buchart art={buch.art} />
                        <Row>
                            <Buchpreis />
                            <Buchrabatt />
                        </Row>
                        <Lieferbar lieferbar={buch.lieferbar ?? false} />
                        <Homepage />
                        <Isbn />
                        <Datum />
                        <Schlagwoerter
                            fields={fields}
                            append={append}
                            remove={remove}
                        />
                        <Button variant="primary" type="submit">
                            Speichern
                        </Button>
                    </Form>
                </FormProvider>
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
