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

import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom';
import { App } from './App.tsx';
import { BookDetails } from './src/pages/BookDetails/BookDetails';
import { CreateBook } from './src/pages/CreateBook/CreateBook';
import { DiagramDates } from './src/pages/DiagramDates/DiagramDates.tsx';
import { DiagramTypes } from './src/pages/DiagramTypes/DiagramTypes.tsx';
import { EditBook } from './src/pages/EditBook/EditBook';
import { ErrorDetails } from './src/pages/ErrorDetails/ErrorDetails';
import { type LoaderFunctionArgs } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SearchBook } from './src/pages/SearchBook/SearchBook';
import { Start } from './src/pages/Start/Start';
import { paths } from './src/config/paths.ts';

const bookDetailsLoader = ({ params }: LoaderFunctionArgs) => ({
    bookId: params.bookId,
});

const editBookLoader = ({ params }: LoaderFunctionArgs) => ({
    bookId: params.bookId,
});

const router = createBrowserRouter([
    {
        path: paths.root,
        element: <App />,
        errorElement: <ErrorDetails />,
        children: [
            {
                errorElement: <ErrorDetails />,
                children: [
                    {
                        index: true,
                        element: <Start />,
                    },
                    {
                        path: paths.search,
                        element: <SearchBook />,
                    },
                    {
                        path: paths.createBook,
                        element: <CreateBook />,
                    },
                    {
                        path: paths.bookDetailsRouting,
                        element: <BookDetails />,
                        loader: bookDetailsLoader,
                    },
                    {
                        path: paths.editBook,
                        element: <EditBook />,
                        loader: editBookLoader,
                    },
                    {
                        path: paths.diagramsArt,
                        element: <DiagramTypes />,
                    },
                    {
                        path: paths.diagramsDates,
                        element: <DiagramDates />,
                    },
                    {
                        path: '*',
                        element: <Navigate to={paths.root} replace />,
                    },
                ],
            },
        ],
    },
]);
ReactDOM.createRoot(document.querySelector('#root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
