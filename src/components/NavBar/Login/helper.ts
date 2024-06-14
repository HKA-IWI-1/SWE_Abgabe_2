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
    accessTokenIdentifier,
    expiresInIdentifier,
    refreshExpiresInIdentifier,
    refreshTokenIdentifier,
    rolesIdentifier,
} from '../../../helpers/localStorageKeys.ts';
import { type LoginAuthData } from './Login/Login.tsx';

export const persistTokenData = (result: LoginAuthData) => {
    const data = result.login ?? result.refresh;
    localStorage.setItem(accessTokenIdentifier, data?.access_token ?? '');
    localStorage.setItem(refreshTokenIdentifier, data?.refresh_token ?? '');
    const secondsToMilliseconds = 1000;
    localStorage.setItem(
        expiresInIdentifier,
        (
            Date.now() +
            Number.parseInt(data?.expires_in ?? '', 10) * secondsToMilliseconds
        ).toString(),
    );
    localStorage.setItem(
        refreshExpiresInIdentifier,
        (
            Date.now() +
            Number.parseInt(data?.refresh_expires_in ?? '', 10) *
                secondsToMilliseconds
        ).toString(),
    );
    if (data?.roles) {
        localStorage.setItem(rolesIdentifier, JSON.stringify(data.roles));
    }
};

export const removeTokenData = () => {
    localStorage.removeItem(accessTokenIdentifier);
    localStorage.removeItem(refreshTokenIdentifier);
    localStorage.removeItem(expiresInIdentifier);
    localStorage.removeItem(refreshExpiresInIdentifier);
    localStorage.removeItem(rolesIdentifier);
};

export const readTokenData = () => {
    const accessToken = localStorage.getItem(accessTokenIdentifier) ?? '';
    const rToken = localStorage.getItem(refreshTokenIdentifier) ?? '';
    const expiresIn = localStorage.getItem(expiresInIdentifier) ?? '';
    const refreshExpiresIn =
        localStorage.getItem(refreshExpiresInIdentifier) ?? '';
    const roles = localStorage.getItem(rolesIdentifier) ?? '';
    return { accessToken, rToken, expiresIn, refreshExpiresIn, roles };
};

export const readRoles = (): string[] =>
    JSON.parse(localStorage.getItem(rolesIdentifier) ?? '[]') as string[];
