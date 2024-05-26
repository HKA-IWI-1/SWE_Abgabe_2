/*
 * Copyright (c) 2024 - present Ronny Friedmann
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
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../FormError/FormError.tsx';
import { InputGroup } from 'react-bootstrap';

interface TitleProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

export const Titel = ({ register, errors }: TitleProps) => (
    <>
        <Form.Group>
            <Form.Label>Titel</Form.Label>
            <InputGroup>
                <Form.Control
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
