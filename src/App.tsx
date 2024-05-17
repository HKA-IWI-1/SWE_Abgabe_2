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

import './App.scss';
import { gql, useQuery } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import { NavBar } from './components/NavBar/NavBar.tsx';
import { useState } from 'react';

interface DisplayBookProps {
    id: number;
}

export const DisplayBook = ({ id }: DisplayBookProps) => {
    const READ_BOOK = gql`
        query ($id: ID! = "1") {
            buch(id: $id) {
                isbn
                version
                rating
                art
                preis
                lieferbar
                datum
                homepage
                schlagwoerter
                titel {
                    titel
                }
                rabatt(short: true)
            }
        }
    `;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { loading, error, data } = useQuery(READ_BOOK, { variables: { id } });

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error : {error.message}</p>;
    }

    return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <div key={data.buch.isbn}>
            <h1>Titel: {data.buch?.titel?.titel}</h1>
            <p>ISBN: {data.buch?.isbn}</p>
            <p>Version: {data.buch?.version}</p>
            <p>Rating: {data.buch?.rating}</p>
            <p>Art: {data.buch?.art}</p>
            <p>Preis: {data.buch?.preis}</p>
            <p>Lieferbar: {data.buch?.lieferbar}</p>
            <p>Datum: {data.buch?.datum}</p>
            <p>Homepage: {data.buch?.homepage}</p>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
            {data.buch?.schlagwoerter?.map(
                (schlagwort: string, index: number) => (
                    <p key={index}>Schlagwort: {schlagwort}</p>
                ),
            )}
            <p>{data.buch?.rabatt}</p>
        </div>
    );
};

export const App = () => {
    const [displayBook, setDisplayBook] = useState(false);
    return (
        <>
            <NavBar></NavBar>
            <Button className={'mt-3'} onClick={() => setDisplayBook(true)}>
                Display Book with ID 1
            </Button>
            {displayBook ? <DisplayBook id={1} /> : undefined}
        </>
    );
};
