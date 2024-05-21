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

import {
    type FieldErrors,
    type UseFormRegister,
    type UseFormWatch,
} from 'react-hook-form';
import { type BookDTO } from '../../entities/BookDTO.ts';
import { type FieldValues } from 'react-hook-form/dist/types/fields';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../Login/elements/FormError.tsx';

interface RatingProps {
    register: UseFormRegister<any>;
    buch: BookDTO;
    errors: FieldErrors;
    watch: UseFormWatch<FieldValues>;
}

export const Rating = ({ watch, register, buch, errors }: RatingProps) => (
    <>
        <Form.Group className="mb-3">
            <Form.Label>Rating: {watch('rating') ?? buch.rating}</Form.Label>
            <Form.Range
                min={1}
                max={5}
                {...register('rating', {
                    required: true,
                })}
                defaultValue={buch.rating}
            />
            {errors.rating && (
                <FormErrors message={'Das Rating fehlt oder ist ungültig'} />
            )}
        </Form.Group>
    </>
);
