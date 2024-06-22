/*
 * Copyright (c) 2024 - present Adrian Spindler, Luca Breisinger, Ronny Friedmann
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

const NO_BOOKS_FOUND = 'Keine Buecher gefunden';

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
                    <Table striped bordered hover className="mb-5">
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
            {error && (
                <Alert
                    variant={
                        error.message.includes(NO_BOOKS_FOUND)
                            ? 'dark'
                            : 'danger'
                    }
                >
                    {error.message.includes(NO_BOOKS_FOUND)
                        ? 'Es wurden keine passenden Bücher gefunden.'
                        : `Error: ${error.message} `}
                </Alert>
            )}
        </>
    );
};
