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

import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { type BookDTO } from '../../entities/BookDTO.ts';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../FormError/FormError.tsx';
import { InputGroup } from 'react-bootstrap';

interface BuchrabattProps {
    register: UseFormRegister<any>;
    buch: BookDTO;
    errors: FieldErrors;
}

const RABATT_MIN = 0;
const RABATT_MAX = 100;

export const Buchrabatt = ({ register, buch, errors }: BuchrabattProps) => (
    <>
        <Form.Group className="mb-3">
            <Form.Label>Rabatt</Form.Label>
            <InputGroup className="mb-3">
                <InputGroup.Text>%</InputGroup.Text>
                <Form.Control
                    type={'number'}
                    placeholder={'Rabatt'}
                    aria-label="Rabatt"
                    {...register('rabatt', {
                        required: true,
                        min: RABATT_MIN,
                        max: RABATT_MAX,
                    })}
                    step=".001"
                    defaultValue={Number.parseFloat(
                        buch.rabatt
                            .slice(0, Math.max(0, buch.rabatt.length - 1))
                            .trim(),
                    )}
                    isValid={!errors.rabatt}
                    isInvalid={Boolean(errors.rabatt)}
                />
                <FormErrors
                    isError={Boolean(errors.rabatt)}
                    errorMessage={'Der Rabatt fehlt oder ist ungültig'}
                />
            </InputGroup>
        </Form.Group>
    </>
);
