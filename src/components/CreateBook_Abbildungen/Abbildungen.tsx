import { Button, Form, InputGroup } from 'react-bootstrap';
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

    // Call the prop function to pass the updated array to the parent component
    React.useEffect(() => {
        onAbbildungenChange(abbildungen);
    }, [abbildungen, onAbbildungenChange]);

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
