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

import { Col, InputGroup, Row } from 'react-bootstrap';
import { type BuchArt } from '../../../entities/BuchArt.ts';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../../FormError/FormError.tsx';
import { useFormContext } from 'react-hook-form';

interface BuchartProps {
    art?: BuchArt;
}

export const Buchart = ({ art }: BuchartProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <Row>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Buchart</Form.Label>
                <InputGroup>
                    {['KINDLE', 'DRUCKAUSGABE'].map((type) => (
                        <Form.Check
                            key={type}
                            inline
                            label={type}
                            type={'radio'}
                            id={type}
                            value={type}
                            {...register('art', {
                                required: true,
                                pattern: /^DRUCKAUSGABE$|^KINDLE$/u,
                            })}
                            defaultChecked={art === type}
                            isValid={!errors.art}
                            isInvalid={Boolean(errors.art)}
                        />
                    ))}
                    <FormErrors
                        isError={Boolean(errors.art)}
                        errorMessage={'Die Buchart fehlt oder ist ungültig'}
                    />
                </InputGroup>
            </Form.Group>
        </Row>
    );
};
