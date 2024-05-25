import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../FormError/FormError.tsx';
import { InputGroup } from 'react-bootstrap';

interface BuchartProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

export const Buchart = ({ register, errors }: BuchartProps) => (
    <>
        <Form.Group>
            <Form.Label>Buchart</Form.Label>
            <InputGroup>
                {['KINDLE', 'DRUCKAUSGABE'].map((type) => (
                    <Form.Check
                        key={type}
                        inline
                        label={type}
                        type={'radio'}
                        id={type}
                        value={type}
                        {...register('art', {
                            required: true,
                            pattern: /^DRUCKAUSGABE$|^KINDLE$/u,
                        })}
                        isValid={!errors.art}
                        isInvalid={Boolean(errors.art)}
                    />
                ))}
                <FormErrors
                    isError={Boolean(errors.art)}
                    errorMessage={'Die Buchart fehlt oder ist ungültig'}
                />
            </InputGroup>
        </Form.Group>
    </>
);
