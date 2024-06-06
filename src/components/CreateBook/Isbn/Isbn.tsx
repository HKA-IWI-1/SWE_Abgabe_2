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

interface IsbnProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

const ISBN13_PATTERN =
    /^(?:ISBN(?:-13)?:? )?(?=\d{13}$|(?=(?:\d+[- ]){4})[- 0-9]{17}$)97[89][- ]?\d{1,5}[- ]?(?:\d+[- ]\d+|\d{2,})[- ]?\d$/u;

export const Isbn = ({ register, errors }: IsbnProps) => (
    <>
        <Form.Group>
            <Form.Label style={{ fontWeight: 'bold' }}>ISBN</Form.Label>
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="ISBN"
                    {...register('isbn', {
                        required: true,
                        pattern: ISBN13_PATTERN,
                    })}
                    isValid={!errors.isbn}
                    isInvalid={Boolean(errors.isbn)}
                />
                <FormErrors
                    isError={Boolean(errors.isbn)}
                    errorMessage={'Die ISBN fehlt oder ist ungültig'}
                />
            </InputGroup>
            <FormText style={{ fontWeight: 'bold' }}>
                Geben Sie eine ISBN-13 ein, z.B. 978-3-7375-0553-6
            </FormText>
        </Form.Group>
    </>
);
