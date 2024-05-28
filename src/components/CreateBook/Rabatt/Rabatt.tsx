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
import { FormText, InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../../FormError/FormError.tsx';

interface RabattProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

const RABATT_MIN = 0;
const RABATT_MAX = 100;

export const Rabatt = ({ register, errors }: RabattProps) => (
    <>
        <Form.Group>
            <Form.Label>Rabatt</Form.Label>
            <InputGroup>
                <InputGroup.Text>%</InputGroup.Text>
                <Form.Control
                    type={'number'}
                    placeholder={'Rabatt'}
                    aria-label="Rabatt"
                    {...register('rabatt', {
                        required: true,
                        valueAsNumber: true,
                        min: RABATT_MIN,
                        max: RABATT_MAX,
                    })}
                    step="0.01"
                    isValid={!errors.rabatt}
                    isInvalid={Boolean(errors.rabatt)}
                />
                <FormErrors
                    isError={Boolean(errors.rabatt)}
                    errorMessage={'Der Rabatt fehlt oder ist ungültig'}
                />
            </InputGroup>
            <FormText>
                Bitte geben Sie einen Rabattwert zwischen 0 und 100 ein. 10 =
                10%
            </FormText>
        </Form.Group>
    </>
);
