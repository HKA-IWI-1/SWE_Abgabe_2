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

import './Login.scss';
import { AUTH, REFRESH } from './queries.ts';
import { useCallback, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormErrors } from './elements/FormError.tsx';
import Stack from 'react-bootstrap/Stack';
import { type SubmitHandler } from 'react-hook-form';
import { TeaserContext } from '../../contexts/teaserContext.ts';
import { persistTokenData } from './helper.ts';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

interface Inputs {
    username: string;
    password: string;
}

// eslint-disable-next-line max-lines-per-function
export const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const { addTeaser } = useContext(TeaserContext);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const [authenticateUser, { client }] = useMutation(AUTH);

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

    const logIn: SubmitHandler<Inputs> = (data: Inputs) => {
        authenticateUser({
            variables: {
                username: data.username,
                password: data.password,
            },
        }) // don't use await in order to handle login errors
            .then((res) => {
                persistTokenData(res);
                setLoggedIn(true);
                reset();
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
                <Form onSubmit={handleSubmit(logIn)}>
                    {/* todo: use form validation library */}
                    <Stack direction="horizontal" gap={3}>
                        <Form.Control
                            className="mr-1"
                            type="text"
                            placeholder="Username"
                            required
                            {...register('username', { required: true })}
                        />
                        {errors.username && (
                            <FormErrors message={'Benutzername fehlt'} />
                        )}
                        <Form.Control
                            className="mr-1"
                            type="password"
                            placeholder="Password"
                            required
                            {...register('password', { required: true })}
                        />
                        {errors.password && (
                            <FormErrors message={'Passwort fehlt'} />
                        )}
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
