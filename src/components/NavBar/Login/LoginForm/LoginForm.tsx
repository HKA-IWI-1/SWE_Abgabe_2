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

import Button from 'react-bootstrap/Button';
import { type FetchResult } from '@apollo/client/link/core';
import Form from 'react-bootstrap/Form';
import { type Inputs } from '../Login/Login.tsx';
import { type MutationFunctionOptions } from '@apollo/client/react/types/types';
import Stack from 'react-bootstrap/Stack';
import { type SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

interface CustomFormProps {
    authenticateUser: (
        options: MutationFunctionOptions<Inputs>,
    ) => Promise<FetchResult<Inputs>>;
}

export const LoginForm = ({ authenticateUser }: CustomFormProps) => {
    const { register, handleSubmit } = useFormContext<Inputs>();

    const logIn: SubmitHandler<Inputs> = async (loginData: Inputs) => {
        await authenticateUser({
            variables: {
                username: loginData.username,
                password: loginData.password,
            },
        });
    };

    return (
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
    );
};
