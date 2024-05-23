import { Form, InputGroup } from 'react-bootstrap';
import { Schlagwoerter } from '../CreateBook_Schlagwoerter/Schlagwoerter';
import Table from 'react-bootstrap/Table';
// eslint-disable-next-line sort-imports
import { Abbildungen } from '../CreateBook_Abbildungen/Abbildungen';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export interface FormValues {
    version: string;
    titel: string;
    rating: number;
    art: 'KINDLE' | 'DRUCKAUSGABE';
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    homepage: string;
    isbn: string;
    datum: string;
    schlagwoerter: string[];
    abbildungen: Abbildungen[];
}

export interface Abbildungen {
    beschriftung: string;
    contentType: string;
}

/* eslint-disable max-lines-per-function */
export const CreateInput = () => {
    const [abbildungen, setAbbildungen] = useState<Abbildungen[]>([]);

    const handleAbbildungenChange = (updatedAbbildungen: Abbildungen[]) => {
        setAbbildungen(updatedAbbildungen);
    };

    return (
        <Table striped bordered style={{ tableLayout: 'fixed' }}>
            <thead />
            <tbody>
                <tr>
                    <th>
                        <Form.Label>Titel</Form.Label>
                        <Form.Control type="text" placeholder="Das Erwachen" />
                    </th>
                    <th>
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="978-1-23-456789-7"
                        />
                    </th>
                </tr>
                <tr>
                    <th>
                        <Form.Label>Bewertug</Form.Label>
                        <Form.Control type="range" min="1" max="5" step="1" />
                    </th>
                    <th>
                        <Form.Label> Buchart</Form.Label>
                        <div>
                            <Form.Check
                                inline
                                type="radio"
                                name="buchart"
                                label="Kindle"
                            />
                            <Form.Check
                                inline
                                type="radio"
                                name="buchart"
                                label="Paperback"
                            />
                        </div>
                    </th>
                </tr>
                <tr>
                    <th>
                        <Form.Label> Preis </Form.Label>
                        <InputGroup>
                            <InputGroup.Text>€</InputGroup.Text>
                            <Form.Control type="number" placeholder="23.4" />
                        </InputGroup>
                    </th>
                    <th>
                        <Form.Label> Rabatt </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="number"
                                min="0"
                                max="1"
                                step="0.01"
                                placeholder="0.25"
                            />
                            <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                    </th>
                </tr>
                <tr>
                    <th>
                        <Form.Label> Homepage </Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-globe"> </i>
                            </InputGroup.Text>
                            <Form.Control type="url" />
                        </InputGroup>
                    </th>
                    <th>
                        <Form.Label> Datum </Form.Label>
                        <Form.Control type="date" />
                    </th>
                </tr>
                <tr>
                    <th>
                        <Form.Check type="checkbox" label="Lieferbar" />
                    </th>
                    <th></th>
                </tr>
                <tr>
                    <th>
                        <Schlagwoerter />
                    </th>
                    <th>
                        <Abbildungen
                            onAbbildungenChange={handleAbbildungenChange}
                        />
                    </th>
                </tr>
                <tr>
                    <th />
                    <th>
                        {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
                        <pre>{JSON.stringify(abbildungen, undefined, 2)}</pre>
                    </th>
                </tr>
            </tbody>
        </Table>
    );
};
/* eslint-enable max-lines-per-function */
