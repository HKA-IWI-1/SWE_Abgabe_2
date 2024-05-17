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

import { gql, useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { useState } from 'react';

// eslint-disable-next-line max-lines-per-function
export const Login = () => {
    const [validated, setValidated] = useState(false);

    const AUTH = gql`
        mutation ($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                access_token
                expires_in
                refresh_token
                refresh_expires_in
                roles
            }
        }
    `;

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error : {error.message}</p>;

    let username = '';
    let password = '';
    const [doAuthentication, { error }] = useMutation(AUTH);

    const handleSubmit = (event: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        event.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        event.stopPropagation();
        setValidated(true);
        if (username !== '' && password !== '' && !error) {
            doAuthentication({
                variables: {
                    username,
                    password,
                },
            })
                .then((result) => {
                    // todo: handle expired token
                    localStorage.setItem(
                        'token',
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        result.data?.login?.access_token,
                    );
                    return 1;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handlePasswordChange = (event: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        password = event.target.value;
    };

    const handleUserChange = (event: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        username = event.target.value;
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* todo: use actual form validation */}
            <Stack direction="horizontal" gap={3}>
                <Form.Control
                    className="mr-1"
                    type="text"
                    placeholder="Username"
                    required
                    onChange={handleUserChange}
                />
                <Form.Control
                    className="mr-1"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={handlePasswordChange}
                />
                <div className="vr" />
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Stack>
        </Form>
    );
};
