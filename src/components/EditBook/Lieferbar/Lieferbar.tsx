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

interface LieferbarProps {
    lieferbar: boolean;
}

export const Lieferbar = ({ lieferbar }: LieferbarProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <Row>
            <Form.Group as={Col} className="mb-3">
                <InputGroup className="mb-3">
                    <Form.Check
                        type="switch"
                        label="Lieferbar"
                        {...register('lieferbar')}
                        defaultChecked={lieferbar}
                        isValid={!errors.lieferbar}
                        isInvalid={Boolean(errors.lieferbar)}
                    />
                    <FormErrors
                        isError={Boolean(errors.lieferbar)}
                        errorMessage={
                            'Der Lieferbar-Status fehlt oder ist ungültig'
                        }
                    />
                </InputGroup>
            </Form.Group>
        </Row>
    );
};
