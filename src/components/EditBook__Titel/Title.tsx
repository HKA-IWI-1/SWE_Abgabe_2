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

import { Col, InputGroup } from 'react-bootstrap';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { type BookDTO } from '../../entities/BookDTO.ts';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../FormError/FormError.tsx';

interface TitleProps {
    register: UseFormRegister<any>;
    buch: BookDTO;
    errors: FieldErrors;
}

export const Title = ({ register, errors }: TitleProps) => (
    <>
        <Form.Group as={Col} className="mb-3">
            <InputGroup className="mb-3">
                <InputGroup.Text>Titel</InputGroup.Text>
                <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Titel"
                    {...register('titel', {
                        required: true,
                    })}
                    isValid={!errors.titel}
                    isInvalid={Boolean(errors.titel)}
                />
                <FormErrors
                    isError={Boolean(errors.titel)}
                    errorMessage={'Der Titel fehlt oder ist ungültig'}
                />
            </InputGroup>
        </Form.Group>
    </>
);
