import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../FormError/FormError.tsx';
import { InputGroup } from 'react-bootstrap';

interface BuchpreisProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

const PREIS_MIN = 0;

export const Preis = ({ register, errors }: BuchpreisProps) => (
    <>
        <Form.Group>
            <Form.Label>Preis</Form.Label>
            <InputGroup>
                <InputGroup.Text>€</InputGroup.Text>
                <Form.Control
                    type={'number'}
                    placeholder={'Preis'}
                    aria-label="Preis"
                    {...register('preis', {
                        required: true,
                        valueAsNumber: true,
                        min: PREIS_MIN,
                    })}
                    step=".001"
                    isValid={!errors.preis}
                    isInvalid={Boolean(errors.preis)}
                />
                <FormErrors
                    isError={Boolean(errors.preis)}
                    errorMessage={'Der Preis fehlt oder ist ungültig'}
                />
            </InputGroup>
        </Form.Group>
    </>
);
