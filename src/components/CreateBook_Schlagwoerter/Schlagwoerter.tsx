import { useState } from 'react';
// eslint-disable-next-line sort-imports
import { Button, Container, Form, InputGroup, Row } from 'react-bootstrap';

export const Schlagwoerter = () => {
    const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    // Funktion zum Hinzufügen eines neuen Schlagworts
    const addSchlagwort = () => {
        const trimmedValue = inputValue.trimStart();
        if (trimmedValue !== '') {
            setSchlagwoerter([...schlagwoerter, trimmedValue]);
            setInputValue('');
        }
    };

    // Funktion zum Löschen eines Schlagworts
    const deleteSchlagwort = (indexToDelete: number) => {
        const updatedSchlagwoerter = schlagwoerter.filter(
            (_, index) => index !== indexToDelete,
        );
        setSchlagwoerter(updatedSchlagwoerter);
    };

    return (
        <Container>
            <Row>
                <div>
                    <div>
                        <Form.Label> Schlagwörter </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Neues Schlagwort"
                            />
                            <Button onClick={addSchlagwort}>Hinzufügen</Button>
                        </InputGroup>
                    </div>
                    <div>
                        {schlagwoerter.map((wort, index) => (
                            <div key={index}>
                                <span>{wort}</span>
                                <Button onClick={() => deleteSchlagwort(index)}>
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </Row>
        </Container>
    );
};
