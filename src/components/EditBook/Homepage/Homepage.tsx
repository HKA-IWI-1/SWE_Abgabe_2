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
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../../FormError/FormError.tsx';
import { useFormContext } from 'react-hook-form';

const URL_PATTERN =
    /^https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-\w()@:%+.~#?&/=]*)$/u;

export const Homepage = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <Row>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Homepage</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text>
                        <i className="bi bi-globe pe-2"></i>
                    </InputGroup.Text>
                    <Form.Control
                        placeholder={'Homepage'}
                        aria-label="homepage"
                        {...register('homepage', {
                            required: true,
                            pattern: URL_PATTERN,
                        })}
                        isValid={!errors.homepage}
                        isInvalid={Boolean(errors.homepage)}
                    />
                    <FormErrors
                        isError={Boolean(errors.homepage)}
                        errorMessage={'Die Homepage fehlt oder ist ungültig'}
                    />
                </InputGroup>
            </Form.Group>
        </Row>
    );
};
