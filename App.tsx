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

import './App.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';
import { Outlet, useNavigation } from 'react-router-dom';
import { readRoles } from './src/components/NavBar/Login/helper.ts';
import { setContext } from '@apollo/client/link/context';
import { useState } from 'react';

export interface UserDataType {
    theme: string;
    roles: string[];
}

export interface UserDataContext {
    userData: UserDataType;
    setUserData: (
        oldData: (oldData: UserDataType) => {
            roles: string[];
            theme: string;
        },
    ) => UserDataType;
}

export const App = () => {
    const [userData, setUserData] = useState({
        theme: 'light',
        roles: readRoles(),
    } as UserDataType);

    const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem('access_token');
        return {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            headers: {
                ...headers,
                authorization: token === null ? 'N/A' : `Bearer ${token}`,
            },
        };
    });

    const httpLink = createHttpLink({
        uri:
            (import.meta.env.VITE_GRAPHQL_API_URL as string | null) ??
            'http://localhost:3000/graphql',
    });
    const apolloClient = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
    });

    const navigation = useNavigation();

    return (
        <>
            <ApolloProvider client={apolloClient}>
                <div
                    id={'main-content-wrapper'}
                    className={navigation.state === 'loading' ? 'loading' : ''}
                >
                    <Outlet context={{ userData, setUserData }}></Outlet>
                </div>
            </ApolloProvider>
        </>
    );
};
