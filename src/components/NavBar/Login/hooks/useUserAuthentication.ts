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
    type UserDataContext,
    type UserDataType,
} from '../../../../../App.tsx';
import { persistTokenData, readRoles } from '../helper.ts';
import { AUTH } from '../queries_mutations.ts';
import { type LoginAuthData } from '../Login/Login.tsx';
import { type TeaserData } from '../LoginToast/LoginToast.tsx';
import { useMutation } from '@apollo/client';
import { useOutletContext } from 'react-router-dom';

interface AuthUserProps {
    setLoggedIn: (loggedIn: boolean) => void;
    reset: () => void;
    addTeaser: (teaser: TeaserData) => void;
}

export const useUserAuthentication = ({
    setLoggedIn,
    reset,
    addTeaser,
}: AuthUserProps) => {
    const { setUserData } = useOutletContext<UserDataContext>();
    const [authenticateUser, { client, loading: loadingAuth }] = useMutation(
        AUTH,
        {
            onCompleted: (data: LoginAuthData) => {
                persistTokenData(data);
                setLoggedIn(true);
                reset();
                setUserData((oldData: UserDataType) => ({
                    ...oldData,
                    roles: readRoles(),
                }));
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
    return { authenticateUser, client, loadingAuth };
};
