import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { type ApolloError } from '@apollo/client';
import { type Buch } from '../../entities/Buch';
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
              buecher: Buch[] | undefined;
          }
        | undefined;
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
    const { loading, error, data } = result as QueryTypes;

    const SearchBook: SubmitHandler<FormValues> = (bookData) => {
        const variables: Variables = {};
        if (bookData.titel) {
            variables.titel = bookData.titel;
        }
        if (bookData.isbn) {
            variables.isbn = bookData.isbn;
        }
        /* if (bookData.rating) {
            variables.rating = Number.parseInt(bookData.rating, 10);
        } */
        if (bookData.art) {
            variables.art = bookData.art;
        }
        /* variables.lieferbar = bookData.lieferbar; */

        // eslint-disable-next-line no-void
        void searchBook({
            variables: { suchkriterien: variables },
        });
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
                            <Rating register={register} watch={watch} />
                        </Col>
                        <Col md="auto">
                            <Buchart register={register} />
                        </Col>
                        <Col xs={1} className="justify-content-end">
                            <Lieferbar register={register} />
                        </Col>
                    </Row>
                    <Row></Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 d-flex justify-content-center"
                            >
                                Suchen
                            </Button>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </Form>
            <div className="mt-5" />
            <Suchergebnis loading={loading} error={error} data={data} />
        </>
    );
};
