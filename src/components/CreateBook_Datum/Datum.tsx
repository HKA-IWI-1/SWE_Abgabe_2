import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../FormError/FormError.tsx';
import { InputGroup } from 'react-bootstrap';

interface DatumProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

export const Datum = ({ register, errors }: DatumProps) => (
    <>
        <Form.Group>
            <Form.Label>Datum</Form.Label>
            <InputGroup>
                <Form.Control
                    type="date"
                    {...register('datum', {
                        required: true,
                    })}
                    isValid={!errors.datum}
                    isInvalid={Boolean(errors.datum)}
                />
                <FormErrors
                    isError={Boolean(errors.datum)}
                    errorMessage={'Das Datum fehlt oder ist ungültig'}
                />
            </InputGroup>
        </Form.Group>
    </>
);
