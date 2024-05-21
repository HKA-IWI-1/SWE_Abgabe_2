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

interface DatumProps {
    register: UseFormRegister<any>;
    buch: BookDTO;
    errors: FieldErrors;
}

const ISO8601_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/u;

export const Datum = ({ register, errors }: DatumProps) => (
    <>
        <Form.Group as={Col} className="mb-3">
            <Form.Label>Datum</Form.Label>
            <InputGroup className="mb-3 custom-date-picker">
                <InputGroup.Text>
                    <i className="bi bi-calendar-date pe-2"></i>
                </InputGroup.Text>
                <Form.Control
                    type="date"
                    {...register('datum', {
                        required: true,
                        pattern: ISO8601_REGEX,
                    })}
                    isValid={!errors.datum}
                    isInvalid={Boolean(errors.datum)}
                />
                <FormErrors
                    isError={Boolean(errors.datum)}
                    errorMessage={'Das Datum fehlt oder ist ungültig'}
                />
            </InputGroup>
        </Form.Group>
    </>
);
