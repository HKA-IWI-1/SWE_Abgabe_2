import { Table } from 'react-bootstrap';

interface BookProps {
    isbn: string;
    rating?: number;
    art?: string;
    preis: number;
    rabatt?: number;
    schlagwoerter?: string;
}

export const MainData = (buch: BookProps) => (
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
                <td>{buch.rating ?? 'N/A'}</td>
            </tr>
            <tr>
                <td>Art</td>
                <td>{buch.art ?? 'N/A'}</td>
            </tr>
            <tr>
                <td>Preis</td>
                <td>{buch.preis}</td>
            </tr>
            <tr>
                <td>Rabatt</td>
                <td>{buch.rabatt ?? 'N/A'}</td>
            </tr>
            <tr>
                <td>Schlagwörter</td>
                <td>{buch.schlagwoerter ?? 'N/A'}</td>
            </tr>
        </tbody>
    </Table>
);
