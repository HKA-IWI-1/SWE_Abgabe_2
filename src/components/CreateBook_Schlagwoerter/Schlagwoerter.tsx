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
