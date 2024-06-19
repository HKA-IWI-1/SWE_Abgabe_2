import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { Abbildungen } from './Abbildungen/Abbildungen';
import { type Art } from '../../entities/Art.ts';
import { BuchEmptyData } from '../../entities/BuchEmptyData.ts';
import { type BuchType } from '../../entities/BuchType.ts';
import { Buchart } from './Buchart/Buchart';
import { CREATE_MUTATION } from './mutations';
import { Datum } from './Datum/Datum';
import { Homepage } from './Homepage/Homepage';
import { Isbn } from './Isbn/Isbn';
import { Lieferbar } from './Lieferbar/Lieferbar';
import { Preis } from './Preis/Preis';
import { Rabatt } from './Rabatt/Rabatt';
import { Rating } from './Rating/Rating';
import { Schlagwoerter } from './Schlagwoerter/Schlagwoerter';
import { StatusModal } from './StatusModal/StatusModal';
import { type SubmitHandler } from 'react-hook-form';
import { Titel } from './Titel/Titel';
import { Untertitel } from './Untertitel/Untertitel';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

export interface FormValues {
    version: string;
    titel: {
        titel: string;
        untertitel: string;
    };
    rating: string;
    art: Art;
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

const parseRabatt = (buch: BuchType) =>
    buch.rabatt === undefined
        ? 0
        : Number.parseFloat(
              buch.rabatt.slice(0, Math.max(0, buch.rabatt.length - 1)).trim(),
          );

const RABATT_TEILER = 100;

/* eslint-disable max-lines-per-function */
export const CreateInput = () => {
    const [createBook] = useMutation(CREATE_MUTATION, {
        onError: (err) => {
            console.error(err.message);
        },
    });
    const [createMessage, setCreateMessage] = useState({
        visible: false,
        nachricht: 'N/A',
        error: false,
    });
    const hideModal = () => {
        setCreateMessage({
            ...createMessage,
            visible: false,
        });
    };

    const CreateBook: SubmitHandler<FormValues> = (bookData) => {
        createBook({
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
        })
            .then(() =>
                setCreateMessage({
                    visible: true,
                    nachricht: 'Das Erstellen war erfolgreich.',
                    error: false,
                }),
            )
            .catch((err) => {
                if (err instanceof Error) {
                    console.error(err);
                    setCreateMessage({
                        visible: true,
                        nachricht: `Fehler: ${err.message}`,
                        error: true,
                    });
                } else {
                    setCreateMessage({
                        visible: true,
                        nachricht: 'Ein unbekannter Fehler ist aufgetreten.',
                        error: true,
                    });
                }
            });
    };

    const methods = useForm<FormValues>({
        defaultValues: {
            version: BuchEmptyData.version,
            rating: BuchEmptyData.rating,
            art: BuchEmptyData.art,
            preis: BuchEmptyData.preis,
            rabatt: parseRabatt(BuchEmptyData),
            lieferbar: BuchEmptyData.lieferbar,
            homepage: BuchEmptyData.homepage,
            isbn: BuchEmptyData.isbn,
            datum: BuchEmptyData.datum,
            schlagwoerter: BuchEmptyData.schlagwoerter,
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
        <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(CreateBook)}>
                <Container>
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
                    <Row className="justify-content-md-center">
                        <Col xs={4}>
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 d-flex justify-content-center"
                            >
                                Speichern
                            </Button>
                        </Col>
                    </Row>
                </Container>
                <div className="mt-5" />
            </Form>
            {createMessage.visible && (
                <StatusModal createMessage={createMessage} onHide={hideModal} />
            )}
        </FormProvider>
    );
};
/* eslint-enable max-lines-per-function */
