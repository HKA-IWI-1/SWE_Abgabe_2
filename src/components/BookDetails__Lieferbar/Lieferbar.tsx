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
import { FormErrors } from '../FormError/elements/FormError.tsx';
import { InputGroup } from 'react-bootstrap';

interface LieferbarProps {
    register: UseFormRegister<any>;
    buch: BookDTO;
    errors: FieldErrors;
}

export const Lieferbar = ({ register, buch, errors }: LieferbarProps) => (
    <>
        <Form.Group className="mb-3">
            <InputGroup className="mb-3">
                <Form.Check
                    type="switch"
                    label="Lieferbar"
                    {...register('lieferbar')}
                    defaultChecked={buch.lieferbar}
                />
                {errors.lieferbar && (
                    <FormErrors
                        message={'Der Lieferbar-Status fehlt oder ist ungültig'}
                    />
                )}
            </InputGroup>
        </Form.Group>
    </>
);
