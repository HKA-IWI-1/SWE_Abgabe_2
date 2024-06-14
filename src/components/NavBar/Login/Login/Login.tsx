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
import { AUTH, REFRESH } from '../queries_mutations.ts';
import { LoginToast, type TeaserData } from '../LoginToast/LoginToast.tsx';
import {
    type UserDataContext,
    type UserDataType,
} from '../../../../../App.tsx';
import {
    persistTokenData,
    readRoles,
    readTokenData,
    removeTokenData,
} from '../helper.ts';
import { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { type SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useOutletContext } from 'react-router-dom';

interface Inputs {
    username: string;
    password: string;
}

// eslint-disable-next-line max-lines-per-function
export const Login = () => {
    const { userData, setUserData } = useOutletContext<UserDataContext>();
    const [loggedIn, setLoggedIn] = useState(false);
    const { reset, register, handleSubmit } = useForm<Inputs>({
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const [teasers, setTeasers] = useState([] as TeaserData[]);
    const addTeaser = (teaser: TeaserData) => {
        setTeasers([...teasers, teaser]);
    };

    const deleteTeaser = (timestamp: number) => {
        const updatedTeasers = teasers.filter((teaser) => {
            if (timestamp !== teaser.timestamp) {
                return teaser;
            }
        });
        setTeasers(updatedTeasers);
    };

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
                setUserData((oldData: UserDataType) => ({
                    ...oldData,
                    roles: readRoles(),
                }));
                return true;
            })
            .catch((err) => {
                if (err instanceof Error) {
                    console.error(err);
                }
                addTeaser({
                    messageType: 'Danger',
                    message: err.message as string,
                    timestamp: Date.now(),
                });
            });
    };

    const logOut = useCallback(async () => {
        removeTokenData();
        setLoggedIn(false);
        await client.resetStore();
        setUserData((oldData: UserDataType) => ({
            ...oldData,
            roles: readRoles(),
        }));
    }, [client, setLoggedIn, setUserData]);

    useEffect(() => {
        const { accessToken, rToken, expiresIn, refreshExpiresIn } =
            readTokenData();
        const currentDate = Date.now();

        const tokenIsExpired =
            expiresIn === '' || Number.parseInt(expiresIn, 10) < currentDate;
        const refreshTokenIsExpired =
            refreshExpiresIn === '' ||
            Number.parseInt(refreshExpiresIn, 10) < currentDate;
        if (accessToken === '' || rToken === '' || refreshTokenIsExpired) {
            logOut()
                .then(() => console.log('logged out'))
                .catch((err) => {
                    if (err instanceof Error) {
                        console.error(err);
                    }
                });
        } else if (tokenIsExpired) {
            doTokenRefresh(rToken)
                .then((_) => setLoggedIn(true))
                .catch((err) => {
                    if (err instanceof Error) {
                        console.error(err);
                    }
                });
        } else {
            setLoggedIn(true);
        }
    }, [logOut, doTokenRefresh]);

    return (
        <>
            <LoginToast teasers={teasers} deleteTeaser={deleteTeaser} />
            {!loggedIn && (
                <Form onSubmit={handleSubmit(logIn)}>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Control
                            className="mr-1"
                            type="text"
                            placeholder="Username"
                            required
                            {...register('username', {
                                required: true,
                            })}
                        />
                        <Form.Control
                            className="mr-1"
                            type="password"
                            placeholder="Password"
                            required
                            {...register('password', {
                                required: true,
                            })}
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
                    Logout {userData.roles[0] ?? 'N/A'}
                </Button>
            )}
        </>
    );
};
