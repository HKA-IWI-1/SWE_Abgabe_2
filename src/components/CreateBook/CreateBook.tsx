/* eslint-disable max-lines-per-function */
import { Form, InputGroup } from 'react-bootstrap';
import { Globe } from 'react-bootstrap-icons';
import Table from 'react-bootstrap/Table';
// eslint-disable-next-line sort-imports
import { Schlagwoerter } from './Schlagwoerter';

export const CreateInput = () => (
    <Table>
        <thead />
        <tbody>
            <tr>
                <th>
                    <Form.Label>Titel</Form.Label>
                    <Form.Control type="text" placeholder="Das Erwachen" />
                </th>
                <th>
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="text" placeholder="978-1-23-456789-7" />
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
                            <Globe />
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
                <th>Abbildung</th>
            </tr>
        </tbody>
    </Table>
);

/* eslint-enable max-lines-per-function */
