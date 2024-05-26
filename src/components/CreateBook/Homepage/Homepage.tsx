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
import { FormErrors } from '../../FormError/FormError.tsx';
import { InputGroup } from 'react-bootstrap';

interface HomepageProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

const URL_PATTERN =
    /^https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-\w()@:%+.~#?&/=]*)$/u;

export const Homepage = ({ register, errors }: HomepageProps) => (
    <>
        <Form.Group>
            <Form.Label>Homepage</Form.Label>
            <InputGroup>
                <InputGroup.Text>
                    <i className="bi bi-globe"></i>
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="homepage"
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
    </>
);
