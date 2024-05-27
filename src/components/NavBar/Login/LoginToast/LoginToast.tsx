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

import './LoginToast.scss';
import { Toast, ToastContainer } from 'react-bootstrap';
import { type Key } from 'react';

export interface TeaserData {
    messageType: string;
    message: string;
    timestamp: number;
}

interface LoginToastProps {
    deleteTeaser: (timestamp: number) => void;
    teasers: TeaserData[];
}

export const LoginToast = ({ deleteTeaser, teasers }: LoginToastProps) => {
    const Teaser = (
        { message, messageType, timestamp }: TeaserData,
        key: Key,
    ) => (
        <Toast
            className="d-inline-block m-1"
            bg={messageType.toLowerCase()}
            key={key}
            onClose={() => deleteTeaser(timestamp)}
        >
            <Toast.Header>
                <strong className="me-auto">{messageType}</strong>
                <small>{new Date(timestamp).toLocaleTimeString()}</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );

    return (
        <>
            <ToastContainer
                position={'top-end'}
                className={'position-fixed d-flex flex-column'}
            >
                {teasers.map((teaser: TeaserData, idx: number) => (
                    <Teaser {...teaser} key={idx} />
                ))}
            </ToastContainer>
        </>
    );
};
