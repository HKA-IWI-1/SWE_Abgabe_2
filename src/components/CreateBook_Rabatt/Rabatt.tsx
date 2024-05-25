import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../FormError/FormError.tsx';
import { InputGroup } from 'react-bootstrap';

interface RabattProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

const RABATT_MIN = 0;
const RABATT_MAX = 1;

export const Rabatt = ({ register, errors }: RabattProps) => (
    <>
        <Form.Group>
            <Form.Label>Rabatt</Form.Label>
            <InputGroup>
                <InputGroup.Text>%</InputGroup.Text>
                <Form.Control
                    type={'number'}
                    placeholder={'Rabatt'}
                    aria-label="Rabatt"
                    {...register('rabatt', {
                        required: true,
                        valueAsNumber: true,
                        min: RABATT_MIN,
                        max: RABATT_MAX,
                    })}
                    step="0.01"
                    isValid={!errors.rabatt}
                    isInvalid={Boolean(errors.rabatt)}
                />
                <FormErrors
                    isError={Boolean(errors.rabatt)}
                    errorMessage={'Der Rabatt fehlt oder ist ungültig'}
                />
            </InputGroup>
        </Form.Group>
    </>
);
