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

import './src/App.scss';
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';
import { useState } from 'react';
import { TeaserContext } from './src/contexts/teaserContext.ts';
import { NavBar } from './src/components/NavBar/NavBar.tsx';
import { GlobalToast } from './src/components/GlobalToast/GlobalToast.tsx';
import type { TeaserData } from './src/dataTypes/teaserData';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useNavigation } from 'react-router-dom';

export const App = () => {
    const [teasers, setTeasers] = useState([] as TeaserData[]);

    const addTeaser = (teaser: TeaserData) => {
        const updatedTeasers = [...teasers, teaser];
        setTeasers(updatedTeasers);
    };

    const deleteTeaser = (timestamp: number) => {
        const updatedTeasers = teasers.filter((teaser) => {
            if (timestamp !== teaser.timestamp) {
                return teaser;
            }
        });
        setTeasers(updatedTeasers);
    };

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
        //uri: import.meta.env.VITE_GRAPHQL_API_URL ?? 'http://localhost:3000/graphql',
        uri: 'http://localhost:3000/graphql',
    });

    const apolloClient = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
    });

    const navigation = useNavigation();

    return (
        <>
            <TeaserContext.Provider
                value={{ teasers, addTeaser, deleteTeaser }}
            >
                <ApolloProvider client={apolloClient}>
                    <NavBar />
                    <div id={'main-content-wrapper'}
                        className={
                            navigation.state === 'loading' ? 'loading' : ''
                        }
                    >
                        <Outlet />
                    </div>
                    <GlobalToast></GlobalToast>
                </ApolloProvider>
            </TeaserContext.Provider>
        </>
    );
};
