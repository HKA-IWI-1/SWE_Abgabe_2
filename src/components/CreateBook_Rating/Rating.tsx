import {
    type FieldErrors,
    type UseFormRegister,
    type UseFormWatch,
} from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { FormErrors } from '../FormError/FormError.tsx';
import { type FormValues } from '../CreateBook/CreateBook.tsx';

interface RatingProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
    watch: UseFormWatch<FormValues>;
}

const MIN_RATING = 0;
const MAX_RATING = 5;

export const Rating = ({ watch, register, errors }: RatingProps) => (
    <>
        <Form.Group>
            <Form.Label>Rating: {watch('rating')}</Form.Label>
            <Form.Range
                min={MIN_RATING}
                max={MAX_RATING}
                {...register('rating', {
                    required: true,
                    min: MIN_RATING,
                    max: MAX_RATING,
                })}
            />
            <FormErrors
                isError={Boolean(errors.rating)}
                errorMessage={'Das Rating fehlt oder ist ungültig'}
            />
        </Form.Group>
    </>
);
