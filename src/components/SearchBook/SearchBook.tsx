import { type ApolloError, type ApolloQueryResult } from '@apollo/client';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { type BuchType } from '../../entities/BuchType.ts';
import { Buchart } from './Buchart/Buchart';
import { Isbn } from './Isbn/Isbn';
import { Lieferbar } from './Lieferbar/Lieferbar';
import { READ_BOOK } from './queries';
import { Rating } from './Rating/Rating';
import { type SubmitHandler } from 'react-hook-form';
import { Suchergebnis } from './Suchergebnis/Suchergebnis';
import { Titel } from './Titel/Titel';
import { useForm } from 'react-hook-form';
import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';

export interface FormValues {
    art: 'DRUCKAUSGABE' | 'KINDLE' | undefined;
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
export const SearchInput = () => {
    const { register, watch, handleSubmit } = useForm<FormValues>();
    const [searchBook, result] = useLazyQuery(READ_BOOK);
    const { loading, error, data, refetch } = result as QueryTypes;
    const [isLieferbarUsed, setIsLieferbarUsed] = useState(false);
    const [isRatingUsed, setIsRatingUsed] = useState(false);

    const SearchBook: SubmitHandler<FormValues> = (bookData) => {
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

        searchBook({
            variables: { suchkriterien: variables },
        }).catch(console.error);
    };
    // todo: default values bei useForm() angeben
    const handleLieferbarChange = () => {
        setIsLieferbarUsed(!isLieferbarUsed);
    };

    const handleRatingChange = () => {
        setIsRatingUsed(!isRatingUsed);
    };

    return (
        <>
            <Form onSubmit={handleSubmit(SearchBook)}>
                <Container>
                    <Row>
                        <Col>
                            <Titel register={register} />
                        </Col>
                        <Col>
                            <Isbn register={register} />
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
                            {isRatingUsed && (
                                <Rating register={register} watch={watch} />
                            )}
                        </Col>
                        <Col md="auto">
                            <Buchart register={register} />
                        </Col>
                        <Col xs={2} className="justify-content-end">
                            <Form.Check
                                type="switch"
                                id="lieferbar-switch"
                                label="Lieferbar aktivieren"
                                checked={isLieferbarUsed}
                                onChange={handleLieferbarChange}
                            />
                            {isLieferbarUsed && (
                                <Lieferbar register={register} />
                            )}
                        </Col>
                    </Row>
                    <Row></Row>
                    <Row>
                        <Col>
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 d-flex justify-content-center"
                            >
                                Suchen
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <div className="mt-5" />
            <Button className="ms-5" onClick={() => refetch()}>
                <i className="bi bi-arrow-clockwise" />
            </Button>
            <div className="mt-2" />
            <Suchergebnis loading={loading} error={error} data={data} />
        </>
    );
};
