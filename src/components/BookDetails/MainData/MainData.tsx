import { type BookDTO } from '../../../entities/BookDTO.ts';
import { Table } from 'react-bootstrap';

export const MainData = (buch: BookDTO) => (
    <Table>
        <thead style={{ display: 'none' }}>
            <tr>
                <th>Attribut</th>
                <th>Wert</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>ISBN</td>
                <td>{buch.isbn}</td>
            </tr>
            <tr>
                <td>Rating</td>
                <td>{buch.rating}</td>
            </tr>
            <tr>
                <td>Art</td>
                <td>{buch.art}</td>
            </tr>
            <tr>
                <td>Preis</td>
                <td>{buch.preis}</td>
            </tr>
            <tr>
                <td>Rabatt</td>
                <td>{buch.rabatt}</td>
            </tr>
            <tr>
                <td>Schlagwörter</td>
                <td>
                    {buch.schlagwoerter ? buch.schlagwoerter.join(', ') : ''}
                </td>
            </tr>
        </tbody>
    </Table>
);
