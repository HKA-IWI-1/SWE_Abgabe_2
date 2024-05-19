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

import { useRouteError } from 'react-router-dom';

export const Error = () => {
    const error = useRouteError();
    console.error(error);

    let errorMessage;

    switch ((error as any).status) {
        case 404:
            errorMessage = 'The page you are looking for does not exist.';
            break;
        case 500:
            errorMessage =
                'The server is currently unavailable. Please try again later.';
            break;
        default:
            errorMessage = 'Sorry, an unexpected error has occurred.';
    }

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>{errorMessage}</p>
            <p>
                <i>{(error as any).statusText || (error as any).message}</i>
            </p>
        </div>
    );
};
