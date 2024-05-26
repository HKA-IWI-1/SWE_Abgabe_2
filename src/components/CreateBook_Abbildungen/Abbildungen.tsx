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

import { Button, Form, FormLabel, InputGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Abbildung {
    beschriftung: string;
    contentType: string;
}

interface AbbildungenProps {
    onAbbildungenChange: (abbildungen: Abbildung[]) => void;
}

// eslint-disable-next-line max-lines-per-function
export const Abbildungen: React.FC<AbbildungenProps> = ({
    onAbbildungenChange,
}) => {
    const { register, handleSubmit, reset } = useForm<Abbildung>();
    const [abbildungen, setAbbildungen] = useState<Abbildung[]>([]);

    const onSubmit = (data: Abbildung) => {
        const trimmedBeschriftung = data.beschriftung.trim();
        if (trimmedBeschriftung !== '' && data.contentType !== '') {
            setAbbildungen((prevAbbildungen) => [...prevAbbildungen, data]);
            reset();
        }
    };

    const removeAbbildung = (index: number) => {
        setAbbildungen((prevAbbildungen) =>
            prevAbbildungen.filter((_, i) => i !== index),
        );
    };

    React.useEffect(() => {
        onAbbildungenChange(abbildungen);
    }, [abbildungen, onAbbildungenChange]);

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Schlagwörter</FormLabel>
                <InputGroup>
                    <Form.Control
                        type="text"
                        {...register('beschriftung', {
                            required: true,
                        })}
                        placeholder="Beschriftung eingeben"
                    />
                    <Form.Control
                        type="text"
                        {...register('contentType', {
                            required: true,
                        })}
                        placeholder="Content Type eingeben"
                    />
                    <Button type="submit">Hinzufügen</Button>
                </InputGroup>
            </Form>
            <div>
                {abbildungen.map((abbildung, index) => (
                    <div
                        key={index}
                        className="d-flex align-items-center justify-content-between"
                    >
                        {abbildung.beschriftung} | {abbildung.contentType}
                        <Button onClick={() => removeAbbildung(index)}>
                            <i className="bi bi-trash"></i>
                        </Button>
                    </div>
                ))}
            </div>
            {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
            <pre>{JSON.stringify(abbildungen, undefined, 2)}</pre>
        </div>
    );
};
