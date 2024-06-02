import { Alert, Button, Row, Spinner, Table } from 'react-bootstrap';
import { type ApolloError } from '@apollo/client';
import { type Buch } from '../../../entities/Buch';
import { paths } from '../../../config/paths';
import { useNavigate } from 'react-router-dom';

interface QueryTypes {
    loading: boolean;
    error?: ApolloError | undefined;
    data:
        | {
              buecher: Buch[] | undefined;
          }
        | undefined;
}

export const Suchergebnis = ({ loading, error, data }: QueryTypes) => {
    const navigate = useNavigate();
    return (
        <>
            {loading && (
                <Row>
                    <Spinner
                        variant="primary"
                        animation="border"
                        role="status"
                        className="mx-auto"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            )}
            {!loading && data && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>ISBN</th>
                            <th>Preis</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.buecher?.map((buch, index) => (
                            <tr key={index}>
                                <td>{buch.id}</td>
                                <td>{buch.titel.titel}</td>
                                <td>{buch.isbn}</td>
                                <td>{buch.preis}</td>
                                <td>
                                    <td>
                                        <Button
                                            onClick={() =>
                                                navigate(
                                                    `/${paths.bookDetails}/${buch.id}`,
                                                )
                                            }
                                        >
                                            Details
                                        </Button>
                                    </td>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {error && <Alert variant="danger">Error: {error.message}</Alert>}
            <div className="mt-5" />
            <div className="mt-5" />
        </>
    );
};
