import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../FormError/FormError.tsx';
import { InputGroup } from 'react-bootstrap';

interface IsbnProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

const ISBN13_PATTERN =
    /^(?:ISBN(?:-13)?:? )?(?=\d{13}$|(?=(?:\d+[- ]){4})[- 0-9]{17}$)97[89][- ]?\d{1,5}[- ]?(?:\d+[- ]\d+|\d{2,})[- ]?\d$/u;

export const Isbn = ({ register, errors }: IsbnProps) => (
    <>
        <Form.Group>
            <Form.Label>ISBN</Form.Label>
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="ISBN"
                    {...register('isbn', {
                        required: true,
                        pattern: ISBN13_PATTERN,
                    })}
                    isValid={!errors.isbn}
                    isInvalid={Boolean(errors.isbn)}
                />
                <FormErrors
                    isError={Boolean(errors.isbn)}
                    errorMessage={'Die ISBN fehlt oder ist ungültig'}
                />
            </InputGroup>
        </Form.Group>
    </>
);
