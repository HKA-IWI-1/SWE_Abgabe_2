import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../FormError/FormError.tsx';
import { InputGroup } from 'react-bootstrap';

interface HomepageProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

const URL_PATTERN =
    /^https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-\w()@:%+.~#?&/=]*)$/u;

export const Homepage = ({ register, errors }: HomepageProps) => (
    <>
        <Form.Group>
            <Form.Label>Homepage</Form.Label>
            <InputGroup>
                <InputGroup.Text>
                    <i className="bi bi-globe"></i>
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="homepage"
                    {...register('homepage', {
                        required: true,
                        pattern: URL_PATTERN,
                    })}
                    isValid={!errors.homepage}
                    isInvalid={Boolean(errors.homepage)}
                />
                <FormErrors
                    isError={Boolean(errors.homepage)}
                    errorMessage={'Die Homepage fehlt oder ist ungültig'}
                />
            </InputGroup>
        </Form.Group>
    </>
);
