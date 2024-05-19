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

import { type ChangeEvent, useCallback, useContext, useEffect } from 'react';
import { type FetchResult, gql, useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { TeaserContext } from '../../contexts/teaserContext.ts';
import { useState } from 'react';

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

const REFRESH = gql`
    mutation ($refreshToken: String!) {
        refresh(refresh_token: $refreshToken) {
            access_token
            expires_in
            refresh_token
            refresh_expires_in
            roles
        }
    }
`;

const persistTokenData = (result: FetchResult<any>) => {
    localStorage.setItem(
        'access_token',
        result.data.login.access_token as string,
    );
    localStorage.setItem(
        'refresh_token',
        result.data.login.refresh_token as string,
    );
    localStorage.setItem('expires_in', result.data.login.expires_in as string);
};

// eslint-disable-next-line max-lines-per-function
export const Login = () => {
    const [validated, setValidated] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { addTeaser } = useContext(TeaserContext);

    const [authenticateUser, { client }] = useMutation(AUTH);
    const doAuthentication = async () =>
        authenticateUser({
            variables: {
                username,
                password,
            },
        });

    const [refreshToken] = useMutation(REFRESH);
    const doTokenRefresh = useCallback(
        async (token: string) => {
            const result = await refreshToken({
                variables: {
                    refreshToken: token,
                },
            });
            persistTokenData(result);
        },
        [refreshToken],
    );

    const logIn = (event: ChangeEvent<any>) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        if (username !== '' && password !== '') {
            doAuthentication() // don't use await in order to handle login errors
                .then((res) => {
                    persistTokenData(res);
                    setLoggedIn(true);
                    setUsername('');
                    setPassword('');
                    return true;
                })
                .catch((err) => {
                    console.error(err);
                    addTeaser({
                        messageType: 'Danger',
                        message: err.message as string,
                        timestamp: Date.now(),
                    });
                });
        }
    };

    const logOut = useCallback(async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
        setLoggedIn(false);
        await client.resetStore();
    }, [client, setLoggedIn]);

    useEffect(() => {
        const token = localStorage.getItem('access_token') ?? '';
        const rToken = localStorage.getItem('refresh_token') ?? '';
        const expiresIn = localStorage.getItem('expires_in') ?? '';
        if (token !== '') {
            if (expiresIn !== '' && expiresIn <= `${Date.now()}`) {
                if (rToken === '') {
                    logOut()
                        .then((result) => console.log(result))
                        .catch((err) => console.error(err));
                } else {
                    doTokenRefresh(rToken)
                        .then((result) => console.log(result))
                        .catch((err) => console.error(err));
                }
            }
            setLoggedIn(true);
        }
    }, [logOut, doTokenRefresh]);

    return (
        <>
            {!loggedIn && (
                <Form noValidate validated={validated} onSubmit={logIn}>
                    {/* todo: use form validation library */}
                    <Stack direction="horizontal" gap={3}>
                        <Form.Control
                            className="mr-1"
                            type="text"
                            placeholder="Username"
                            required
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                        />
                        <Form.Control
                            className="mr-1"
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                        <div className="vr" />
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Stack>
                </Form>
            )}
            {loggedIn && (
                <Button
                    variant="primary"
                    type="submit"
                    onClick={async (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        await logOut();
                    }}
                >
                    Logout
                </Button>
            )}
        </>
    );
};
