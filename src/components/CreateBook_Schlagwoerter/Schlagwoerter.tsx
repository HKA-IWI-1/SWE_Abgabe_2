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
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface SchlagwoerterProps {
    keyword: string;
}

export const Schlagwoerter = () => {
    const { register, handleSubmit, reset } = useForm<SchlagwoerterProps>();
    const [keywords, setKeywords] = useState<string[]>([]);

    const onSubmit = ({ keyword }: SchlagwoerterProps) => {
        const trimmedKeyword = keyword.trimStart();
        if (trimmedKeyword !== '') {
            setKeywords((prevKeywords) => [...prevKeywords, trimmedKeyword]);
            reset();
        }
    };

    const removeKeyword = (index: number) => {
        setKeywords((prevKeywords) =>
            prevKeywords.filter((_, i) => i !== index),
        );
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Schlagwörter</FormLabel>
                <InputGroup>
                    <Form.Control
                        type="text"
                        {...register('keyword', {
                            required: true,
                        })}
                        placeholder="Schlagwort eingeben"
                    />
                    <Button type="submit">Hinzufügen</Button>
                </InputGroup>
            </Form>
            <div>
                {keywords.map((keyword, index) => (
                    <div
                        key={index}
                        className="d-flex align-items-center justify-content-between"
                    >
                        {keyword}
                        <Button onClick={() => removeKeyword(index)}>
                            <i className="bi bi-trash"></i>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
