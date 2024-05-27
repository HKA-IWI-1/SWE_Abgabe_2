import { Button, Form } from 'react-bootstrap';
import { useFieldArray, useForm } from 'react-hook-form';
import { Abbildungen } from './Abbildungen/Abbildungen';
import { Buchart } from './Buchart/Buchart';
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
import Table from 'react-bootstrap/Table';
import { Titel } from './Titel/Titel';
import { UPDATE_MUTATION } from '../EditBook/BookForm/mutations';
import { Untertitel } from './Untertitel/Untertitel';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

export interface Abbildungen {
    beschriftung: string;
    contentType: string;
}

export interface Titel {
    titel: string;
    untertitel: string;
}

export interface FormValues {
    version: string;
    titel: {
        titel: string;
        untertitel: string;
    };
    rating: string;
    art: 'KINDLE' | 'DRUCKAUSGABE';
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    homepage: string;
    isbn: string;
    datum: string;
    schlagwoerter: string[];
    abbildungen: [
        {
            beschriftung: string;
            contentType: string;
        },
    ];
}

const RABATT_TEILER = 100;

/* eslint-disable max-lines-per-function */
export const CreateInput = () => {
    const [createBook] = useMutation(UPDATE_MUTATION);
    const [createMessage, setCreateMessage] = useState({
        visible: false,
        nachricht: 'N/A',
        error: false,
    });

    const CreateBook: SubmitHandler<FormValues> = (bookData) => {
        console.log(bookData);
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
                abbildungen: bookData.abbildungen,
            },
        })
            .then(() =>
                setCreateMessage({
                    visible: true,
                    nachricht: 'Das Aktualisieren war erfolgreich.',
                    error: false,
                }),
            )
            .catch((err) => {
                if (err instanceof Error) {
                    console.log(err);
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

    const {
        control,
        watch,
        register,
        unregister,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
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
            <Form onSubmit={handleSubmit(CreateBook)}>
                <Table striped bordered style={{ tableLayout: 'fixed' }}>
                    <thead />
                    <tbody>
                        <tr>
                            <th>
                                <Titel register={register} errors={errors} />
                                <Untertitel
                                    register={register}
                                    errors={errors}
                                />
                            </th>
                            <th>
                                <Isbn register={register} errors={errors} />
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <Rating
                                    register={register}
                                    watch={watch}
                                    errors={errors}
                                />
                            </th>
                            <th>
                                <Buchart register={register} errors={errors} />
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <Preis register={register} errors={errors} />
                            </th>
                            <th>
                                <Rabatt register={register} errors={errors} />
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <Homepage register={register} errors={errors} />
                            </th>
                            <th>
                                <Datum register={register} errors={errors} />
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <Lieferbar register={register} />
                            </th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>
                                <Schlagwoerter
                                    register={register}
                                    unregister={unregister}
                                    fields={schlagwoerterFields}
                                    append={schlagwoerterAppend}
                                    remove={schlagwoerterRemove}
                                />
                            </th>
                            <th>
                                <Abbildungen
                                    register={register}
                                    unregister={unregister}
                                    fields={abbildungenFields}
                                    append={abbildungenAppend}
                                    remove={abbildungenRemove}
                                />
                            </th>
                        </tr>
                    </tbody>
                </Table>
                <Button
                    variant="primary"
                    type="submit"
                    className="w-100 d-flex justify-content-center"
                >
                    Speichern
                </Button>
            </Form>
            {createMessage.visible && (
                <StatusModal createMessage={createMessage} />
            )}
        </>
    );
};
/* eslint-enable max-lines-per-function */
