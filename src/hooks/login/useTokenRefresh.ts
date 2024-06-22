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
    persistTokenData,
    readTokenData,
} from '../../components/NavBar/Login/helper.ts';
import { type LoginAuthData } from '../../components/NavBar/Login/Login/Login.tsx';
import { REFRESH } from './queries_mutations.ts';
import { type TeaserData } from '../../components/NavBar/Login/LoginToast/LoginToast.tsx';
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

interface TokenRefreshProps {
    logOut: () => Promise<void>;
    setLoggedIn: (loggedIn: boolean) => void;
    addTeaser: (teaser: TeaserData) => void;
}

export const useTokenRefresh = ({
    logOut,
    setLoggedIn,
    addTeaser,
}: TokenRefreshProps) => {
    const [refreshTokenMutation, { loading: loadingMutation }] = useMutation(
        REFRESH,
        {
            onCompleted: (data: LoginAuthData) => {
                setLoggedIn(true);
                persistTokenData({ result: data });
            },
            onError: (err) => {
                addTeaser({
                    messageType: 'Danger',
                    message: err.message,
                    timestamp: Date.now(),
                });
                console.error(err);
            },
        },
    );

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
            logOut().catch((err) => {
                if (err instanceof Error) {
                    console.error(err);
                }
            });
        } else if (tokenIsExpired) {
            refreshTokenMutation({
                variables: {
                    refreshToken: rToken,
                },
            }).catch((err) => {
                console.error(err);
            });
        } else {
            setLoggedIn(true);
        }
    }, [logOut, refreshTokenMutation, setLoggedIn]);

    return { loadingMutation };
};
