import { Trash } from 'react-bootstrap-icons';
import { useState } from 'react';
// eslint-disable-next-line sort-imports
import { Container, Row } from 'react-bootstrap';

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
                    <h3>Schlagwörter</h3>
                    <div>
                        <button onClick={addSchlagwort}>Hinzufügen</button>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Neues Schlagwort"
                        />
                    </div>
                    <div>
                        {schlagwoerter.map((wort, index) => (
                            <div key={index}>
                                <span>{wort}</span>
                                <button onClick={() => deleteSchlagwort(index)}>
                                    <Trash />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </Row>
        </Container>
    );
};
