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

import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import {
    type FieldArrayWithId,
    type UseFieldArrayAppend,
    type UseFieldArrayRemove,
    useFormContext,
} from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { type FormValues } from '../CreateBookForm/CreateBookForm.tsx';

interface AbbildungenProps {
    fields: FieldArrayWithId<any>[];
    append: UseFieldArrayAppend<FormValues, never>;
    remove: UseFieldArrayRemove;
}

export const Abbildungen = ({ fields, append, remove }: AbbildungenProps) => {
    const { register } = useFormContext();
    return (
        <>
            <Row xs={1} md={1} lg={1}>
                <Form.Label style={{ fontWeight: 'bold' }}>
                    Abbildungen
                </Form.Label>
                {fields.map((_, index) => (
                    <Form.Group as={Col} className="mb-3" key={index}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                {...register(
                                    `abbildungen.${index}.beschriftung`,
                                    {
                                        required: true,
                                    },
                                )}
                                type="text"
                                placeholder="Beschriftung"
                            />
                            <Form.Control
                                {...register(
                                    `abbildungen.${index}.contentType`,
                                    {
                                        required: true,
                                    },
                                )}
                                type="text"
                                placeholder="ContentType"
                            />
                            <Button onClick={() => remove(index)}>
                                <i className="bi bi-trash" />
                            </Button>
                        </InputGroup>
                    </Form.Group>
                ))}
            </Row>
            <Row xs={1} md={1} lg={1} className={'mb-2'}>
                <Button
                    type="button"
                    className="w-75 mx-auto"
                    onClick={() => {
                        append({
                            beschriftung: 'Beschriftung',
                            contentType: 'ContentType',
                        });
                    }}
                >
                    Neue Abbildung hinzufügen.
                </Button>
            </Row>
        </>
    );
};
