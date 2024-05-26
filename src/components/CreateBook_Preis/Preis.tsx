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

interface BuchpreisProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

const PREIS_MIN = 0;

export const Preis = ({ register, errors }: BuchpreisProps) => (
    <>
        <Form.Group>
            <Form.Label>Preis</Form.Label>
            <InputGroup>
                <InputGroup.Text>€</InputGroup.Text>
                <Form.Control
                    type={'number'}
                    placeholder={'Preis'}
                    aria-label="Preis"
                    {...register('preis', {
                        required: true,
                        valueAsNumber: true,
                        min: PREIS_MIN,
                    })}
                    step=".001"
                    isValid={!errors.preis}
                    isInvalid={Boolean(errors.preis)}
                />
                <FormErrors
                    isError={Boolean(errors.preis)}
                    errorMessage={'Der Preis fehlt oder ist ungültig'}
                />
            </InputGroup>
        </Form.Group>
    </>
);
