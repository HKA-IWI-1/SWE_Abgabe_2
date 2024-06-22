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
import './BookDetails.scss';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import { Abbildungen } from '../../components/BookDetails/Abbildungen/Abbildungen.tsx';
import { type ApolloError } from '@apollo/client/errors';
import { BuchEmptyData } from '../../entities/BuchEmptyData.ts';
import { type BuchType } from '../../entities/BuchType.ts';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { InfoBar } from '../../components/BookDetails/InfoBar/InfoBar.tsx';
import { MainData } from '../../components/BookDetails/MainData/MainData.tsx';
import { NavBar } from '../../components/NavBar/NavBar/NavBar.tsx';
import Spinner from 'react-bootstrap/Spinner';
import { type UserDataContext } from '../../../App.tsx';
import { admin } from '../../authentication/roles.ts';
import { paths } from '../../config/paths.ts';
import { useReadBookById } from '../../hooks/useReadBookById/useReadBookById.ts';

interface QueryTypes {
    loading: boolean;
    error?: ApolloError | undefined;
    data: { buch: BuchType } | undefined;
}

// eslint-disable-next-line max-lines-per-function
export const BookDetails = () => {
    const { userData } = useOutletContext<UserDataContext>();
    const isAdmin = userData.roles.includes(admin);
    const { bookId } = useLoaderData() as { bookId: number };
    const navigate = useNavigate();

    const { loading, error, data }: QueryTypes = useReadBookById({ bookId });

    const editBookButton = (
        <OverlayTrigger
            placement={'left'}
            overlay={<Tooltip id={'tooltip-left'}>Bearbeiten</Tooltip>}
        >
            <Button
                className={'edit-book'}
                variant="outline-dark"
                onClick={() => {
                    navigate(paths.edit);
                }}
            >
                <i className="bi bi-pencil-fill"></i>
            </Button>
        </OverlayTrigger>
    );

    const buchOrEmpty = data?.buch ?? BuchEmptyData;
    return (
        <>
            <NavBar />
            <Container>
                {loading && (
                    <Row>
                        <Spinner
                            variant="primary"
                            animation="border"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Row>
                )}
                {!loading && error && (
                    <h1>Es ist leider ein Fehler aufgetreten</h1>
                )}
                {!loading && !error && (
                    <>
                        <Row className={'mb-4 pt-1'}>
                            <Col>
                                <h1>{buchOrEmpty.titel.titel}</h1>
                            </Col>
                            <Col>
                                <h2>{buchOrEmpty.titel.untertitel}</h2>
                            </Col>
                            <Col md={{ span: 2 }}>
                                {isAdmin && editBookButton}
                            </Col>
                            <Row>
                                <InfoBar {...buchOrEmpty} />
                            </Row>
                        </Row>
                        <Row className={'mb-5'}>
                            <MainData {...buchOrEmpty} />
                        </Row>
                        <Row>
                            <Abbildungen
                                abbildungen={
                                    (
                                        data as {
                                            buch?: { abbildungen?: [] };
                                        }
                                    ).buch?.abbildungen ?? []
                                }
                            />
                        </Row>
                    </>
                )}
            </Container>
        </>
    );
};
