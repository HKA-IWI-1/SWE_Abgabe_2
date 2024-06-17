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

import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../../FormError/FormError.tsx';
import { useFormContext } from 'react-hook-form';

interface RatingProps {
    rating: string;
}

const MIN_RATING = 0;
const MAX_RATING = 5;

export const Rating = ({ rating }: RatingProps) => {
    const {
        watch,
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <Row>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Rating: {watch('rating') ?? rating}</Form.Label>
                <Form.Range
                    min={MIN_RATING}
                    max={MAX_RATING}
                    {...register('rating', {
                        required: true,
                        min: MIN_RATING,
                        max: MAX_RATING,
                    })}
                />
                <FormErrors
                    isError={Boolean(errors.rating)}
                    errorMessage={'Das Rating fehlt oder ist ungültig'}
                />
            </Form.Group>
        </Row>
    );
};
