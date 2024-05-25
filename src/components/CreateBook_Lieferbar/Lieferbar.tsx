import Form from 'react-bootstrap/Form';
import { type UseFormRegister } from 'react-hook-form';

interface LieferbarProps {
    register: UseFormRegister<any>;
}

export const Lieferbar = ({ register }: LieferbarProps) => (
    <>
        <Form.Group>
            <Form.Check
                type="checkbox"
                label="Lieferbar"
                {...register('lieferbar')}
            />
        </Form.Group>
    </>
);
