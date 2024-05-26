import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../FormError/FormError.tsx';
import { InputGroup } from 'react-bootstrap';

interface TitleProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

export const Titel = ({ register, errors }: TitleProps) => (
    <>
        <Form.Group>
            <Form.Label>Titel</Form.Label>
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Titel"
                    {...register('titel', {
                        required: true,
                    })}
                    isValid={!errors.titel}
                    isInvalid={Boolean(errors.titel)}
                />
                <FormErrors
                    isError={Boolean(errors.titel)}
                    errorMessage={'Der Titel fehlt oder ist ungültig'}
                />
            </InputGroup>
        </Form.Group>
    </>
);
