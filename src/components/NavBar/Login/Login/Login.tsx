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
import { FormProvider, useForm } from 'react-hook-form';
import { LoginToast, type TeaserData } from '../LoginToast/LoginToast.tsx';
import {
    type UserDataContext,
    type UserDataType,
} from '../../../../../App.tsx';
import { readRoles, removeTokenData } from '../helper.ts';
import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { LoginForm } from '../LoginForm/LoginForm.tsx';
import Spinner from 'react-bootstrap/Spinner';
import { useOutletContext } from 'react-router-dom';
import { useTokenRefresh } from '../../../../hooks/login/useTokenRefresh.ts';
import { useUserAuthentication } from '../../../../hooks/login/useUserAuthentication.ts';

export interface Inputs {
    username: string;
    password: string;
}

interface AuthData {
    /* eslint-disable @typescript-eslint/naming-convention */
    access_token: string;
    refresh_token: string;
    expires_in: string;
    refresh_expires_in: string;
    roles: string[];
    /* eslint-enable @typescript-eslint/naming-convention */
}

export interface LoginAuthData {
    login?: AuthData;
    refresh?: AuthData;
}

// eslint-disable-next-line max-lines-per-function
export const Login = () => {
    const { userData, setUserData } = useOutletContext<UserDataContext>();
    const [loggedIn, setLoggedIn] = useState(false);
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

    const methods = useForm<Inputs>({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const { authenticateUser, client, loadingAuth } = useUserAuthentication({
        setLoggedIn,
        reset: methods.reset,
        addTeaser,
    });

    const logOut = useCallback(async () => {
        removeTokenData();
        setLoggedIn(false);
        await client.resetStore();
        setUserData((oldData: UserDataType) => ({
            ...oldData,
            roles: readRoles(),
        }));
    }, [client, setLoggedIn, setUserData]);

    const { loadingMutation } = useTokenRefresh({
        logOut,
        setLoggedIn,
        addTeaser,
    });

    return (
        <>
            <FormProvider {...methods}>
                <LoginToast teasers={teasers} deleteTeaser={deleteTeaser} />
                {!loggedIn && (loadingAuth || loadingMutation) && (
                    <Spinner
                        variant="primary"
                        animation="border"
                        role="status"
                    />
                )}
                {!loggedIn && !loadingAuth && (
                    <LoginForm authenticateUser={authenticateUser} />
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
            </FormProvider>
        </>
    );
};
