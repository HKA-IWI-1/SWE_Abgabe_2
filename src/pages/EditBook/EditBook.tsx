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
import './EditBook.scss';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { type ApolloError } from '@apollo/client/errors';
import { type BookDTO } from '../../entities/BookDTO.ts';
import { Buchart } from '../../components/EditBook__BuchArt/Buchart.tsx';
import { Buchpreis } from '../../components/EditBook__Buchpreis/Buchpreis.tsx';
import { Buchrabatt } from '../../components/BookDetails__Buchrabatt/Buchrabatt.tsx';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Datum } from '../../components/BookDetails__Datum/Datum.tsx';
import Form from 'react-bootstrap/Form';
import { Homepage } from '../../components/BookDetails__Homepage/Homepage.tsx';
import { Isbn } from '../../components/BookDetails__Isbn/Isbn.tsx';
import { Lieferbar } from '../../components/BookDetails__Lieferbar/Lieferbar.tsx';
import { READ_BOOK } from './queries.ts';
import { Rating } from '../../components/EditBook__Rating/Rating.tsx';
import { Schlagwoerter } from '../../components/BookDetails__Schlagwoerter/Schlagwoerter.tsx';
import Spinner from 'react-bootstrap/Spinner';
import { type SubmitHandler } from 'react-hook-form';
import { Title } from '../../components/EditBook__Titel/Title.tsx';
import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';

export interface BookId {
    book: number;
}

export interface BookInput {
    titel: string;
    rating: number;
    art: 'Kindle' | 'Druckausgabe';
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    homepage: string;
    isbn: string;
    datum: string;
}

interface QueryTypes {
    loading: boolean;
    error?: ApolloError | undefined;
    data: { buch: BookDTO } | undefined;
}

// eslint-disable-next-line max-lines-per-function
export const EditBook = () => {
    const { book } = useLoaderData() as BookId;
    const navigate = useNavigate();
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BookInput>({
        defaultValues: {} as BookInput,
    });

    const { loading, error, data }: QueryTypes = useQuery(READ_BOOK, {
        variables: { id: book },
    });

    if (error) {
        throw new Error(error.message);
    }

    const backButton = (
        <OverlayTrigger
            placement={'right'}
            overlay={<Tooltip id={'tooltip-right'}>Zurück</Tooltip>}
        >
            <Button
                variant="outline-dark"
                onClick={() => {
                    navigate(-1);
                }}
            >
                <i className="bi bi-caret-left-fill"></i>
            </Button>
        </OverlayTrigger>
    );

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const updateBook: SubmitHandler<BookInput> = (bookData) => {
        console.log(bookData);
    };

    // todo: ETag beachten!
    // todo: Warnmeldung wenn Navigation getriggert wird nach einer Änderung (ggf. mit React Router Event?)
    // todo: entity klassen einbauen, dann daraus die daten lesen? Irgendwie Validierung damit data.x nicht immer als Fehler angezeigt wird.
    // todo: validierung

    return (
        <Container>
            {loading && (
                <Row>
                    <Spinner variant="primary" animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            )}
            {!loading && data !== undefined && (
                <>
                    <Form onSubmit={handleSubmit(updateBook)}>
                        <Row className={'mb-4 pt-1'} xs={2} md={2} lg={2}>
                            <Col md={{ span: 2 }} style={{ width: '4rem' }}>
                                {backButton}
                            </Col>
                            <Col>
                                <Title
                                    register={register}
                                    buch={data.buch}
                                    errors={errors}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Rating
                                    register={register}
                                    buch={data.buch}
                                    errors={errors}
                                    watch={watch}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Buchart
                                    register={register}
                                    buch={data.buch}
                                    errors={errors}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Buchpreis
                                    register={register}
                                    buch={data.buch}
                                    errors={errors}
                                />
                            </Col>
                            <Col>
                                <Buchrabatt
                                    register={register}
                                    buch={data.buch}
                                    errors={errors}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Lieferbar
                                    register={register}
                                    buch={data.buch}
                                    errors={errors}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {/* https://stackoverflow.com/questions/36835615/difference-between-input-group-and-form-group */}
                                {/* form group: wrap labels and form controls in a div to get optimum spacing between the label and the control */}
                                {/* Input groups: extended Form Controls. Using input groups you can easily prepend and append text or buttons to the text-based inputs. */}
                                <Homepage
                                    register={register}
                                    buch={data.buch}
                                    errors={errors}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Isbn
                                    register={register}
                                    buch={data.buch}
                                    errors={errors}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Datum
                                    register={register}
                                    buch={data.buch}
                                    errors={errors}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Schlagwoerter />
                        </Row>
                        <Button variant="primary" type="submit">
                            Speichern
                        </Button>
                    </Form>
                </>
            )}
        </Container>
    );
};
