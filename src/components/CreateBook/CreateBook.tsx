import { useFieldArray, useForm } from 'react-hook-form';
import { Abbildungen } from '../CreateBook_Abbildungen/Abbildungen';
import { Buchart } from '../CreateBook_Buchart/Buchart';
import { Datum } from '../CreateBook_Datum/Datum';
import { Homepage } from '../CreateBook_Homepage/Homepage';
import { Isbn } from '../CreateBook_Isbn/Isbn';
import { Lieferbar } from '../CreateBook_Lieferbar/Lieferbar';
import { Preis } from '../CreateBook_Preis/Preis';
import { Rabatt } from '../CreateBook_Rabatt/Rabatt';
import { Rating } from '../CreateBook_Rating/Rating';
import { Schlagwoerter } from '../CreateBook_Schlagwoerter/Schlagwoerter';
import Table from 'react-bootstrap/Table';
import { Titel } from '../CreateBook_Titel/Titel';

export interface Abbildungen {
    beschriftung: string;
    contentType: string;
}

export interface FormValues {
    version: string;
    titel: string;
    rating: number;
    art: 'KINDLE' | 'DRUCKAUSGABE';
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    homepage: string;
    isbn: string;
    datum: string;
    schlagwoerter: string[];
    abbildungen: Abbildungen[];
}

/* eslint-disable max-lines-per-function */
export const CreateInput = () => {
    const {
        control,
        watch,
        register,
        unregister,
        formState: { errors },
    } = useForm<FormValues>();
    const {
        fields: schlagwoerterFields,
        append: schlagwoerterAppend,
        remove: schlagwoerterRemove,
    } = useFieldArray({
        control,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        name: 'schlagwoerter',
    });
    const {
        fields: abbildungenFields,
        append: abbildungenAppend,
        remove: abbildungenRemove,
    } = useFieldArray({
        control,
        name: 'abbildungen',
    });

    return (
        <>
            <Table striped bordered style={{ tableLayout: 'fixed' }}>
                <thead />
                <tbody>
                    <tr>
                        <th>
                            <Titel register={register} errors={errors} />
                        </th>
                        <th>
                            <Isbn register={register} errors={errors} />
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <Rating
                                register={register}
                                watch={watch}
                                errors={errors}
                            />
                        </th>
                        <th>
                            <Buchart register={register} errors={errors} />
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <Preis register={register} errors={errors} />
                        </th>
                        <th>
                            <Rabatt register={register} errors={errors} />
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <Homepage register={register} errors={errors} />
                        </th>
                        <th>
                            <Datum register={register} errors={errors} />
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <Lieferbar register={register} />
                        </th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>
                            <Schlagwoerter
                                register={register}
                                unregister={unregister}
                                fields={schlagwoerterFields}
                                append={schlagwoerterAppend}
                                remove={schlagwoerterRemove}
                            />
                        </th>
                        <th>
                            <Abbildungen
                                register={register}
                                unregister={unregister}
                                fields={abbildungenFields}
                                append={abbildungenAppend}
                                remove={abbildungenRemove}
                            />
                        </th>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};
/* eslint-enable max-lines-per-function */
