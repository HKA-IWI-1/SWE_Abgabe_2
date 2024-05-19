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

import { App } from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Start } from './src/pages/Start/Start';
import { Error } from './src/pages/Error/Error';
import { SearchBook } from './src/pages/SearchBook/SearchBook';
import { CreateBook } from './src/pages/CreateBook/CreateBook';
import { Diagrams } from './src/pages/Diagrams/Diagrams';
import { EditBook, editBookLoader } from './src/pages/EditBook/EditBook';
import {
    BookDetails,
    bookDetailsLoader,
} from './src/pages/BookDetails/BookDetails';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Start />,
            },
            {
                path: 'suchen',
                element: <SearchBook />,
            },
            {
                path: 'neues_buch',
                element: <CreateBook />,
                errorElement: <Error />,
            },
            {
                path: ' diagramme',
                element: <Diagrams />,
            },
            {
                path: 'buch/:bookId',
                element: <BookDetails />,
                loader: bookDetailsLoader,
                errorElement: <Error />,
            },
            {
                path: 'buch/:bookId/bearbeiten', // https://reactrouter.com/en/main/start/tutorial#updating-data
                element: <EditBook />,
                loader: editBookLoader,
                errorElement: <Error />,
            },
        ],
    },
]);

// eslint-disable-next-line unicorn/prefer-query-selector
ReactDOM.createRoot(document.getElementById('root')!).render(
    // https://react.dev/reference/react/StrictMode#strictmode
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
