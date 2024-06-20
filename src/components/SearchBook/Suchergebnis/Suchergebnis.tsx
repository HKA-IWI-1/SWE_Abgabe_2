import { Alert, Button, Row, Spinner, Table } from 'react-bootstrap';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { type ApolloError } from '@apollo/client';
import { type BuchType } from '../../../entities/BuchType.ts';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { type UserDataContext } from '../../../../App.tsx';
import { admin } from '../../../authentication/roles.ts';
import { paths } from '../../../config/paths';
import { useState } from 'react';

interface QueryTypes {
    loading: boolean;
    error?: ApolloError | undefined;
    data:
        | {
              buecher: BuchType[] | undefined;
          }
        | undefined;
}

// eslint-disable-next-line max-lines-per-function
export const Suchergebnis = ({ loading, error, data }: QueryTypes) => {
    const navigate = useNavigate();
    const [deleteModalId, setDeleteModalId] = useState<number>();
    const { userData } = useOutletContext<UserDataContext>();
    const isAdmin = userData.roles.includes(admin);

    const hideModal = () => {
        setDeleteModalId(undefined);
    };

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
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>ISBN</th>
                                <th>Preis</th>
                                {isAdmin && <th>Delete</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {data.buecher?.map((buch, index) => (
                                <tr
                                    key={index}
                                    onClick={() =>
                                        navigate(
                                            `/${paths.bookDetails}/${buch.id}`,
                                        )
                                    }
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{buch.id}</td>
                                    <td>{buch.titel.titel}</td>
                                    <td>{buch.isbn}</td>
                                    <td>{buch.preis}</td>
                                    {isAdmin && (
                                        <td>
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDeleteModalId(buch.id);
                                                }}
                                            >
                                                <i className="bi bi-trash" />
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {deleteModalId !== undefined && (
                        <DeleteModal id={deleteModalId} hideModal={hideModal} />
                    )}
                </>
            )}
            {error && <Alert variant="danger">Error: {error.message}</Alert>}
            <div className="mt-5" />
            <div className="mt-5" />
        </>
    );
};
