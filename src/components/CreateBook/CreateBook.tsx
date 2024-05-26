import { useFieldArray, useForm } from 'react-hook-form';
// eslint-disable-next-line no-lone-blocks
{
    /* import { type Abbildungen } from './Abbildungen/Abbildungen'; */
}
import { Buchart } from './Buchart/Buchart';
import { Datum } from './Datum/Datum';
import { Homepage } from './Homepage/Homepage';
import { Isbn } from './Isbn/Isbn';
import { Lieferbar } from './Lieferbar/Lieferbar';
import { Preis } from './Preis/Preis';
import { Rabatt } from './Rabatt/Rabatt';
import { Rating } from './Rating/Rating';
import { Schlagwoerter } from './Schlagwoerter/Schlagwoerter';
import Table from 'react-bootstrap/Table';
import { Titel } from './Titel/Titel';

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
    // eslint-disable-next-line no-lone-blocks
    {
        /* const {
        fields: abbildungenFields,
        append: abbildungenAppend,
        remove: abbildungenRemove,
    } = useFieldArray({
        control,
        name: 'abbildungen',
    }); */
    }

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
                            {/* <Abbildungen
                                register={register}
                                unregister={unregister}
                                fields={abbildungenFields}
                                append={abbildungenAppend}
                                remove={abbildungenRemove}
                            /> */}
                        </th>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};
/* eslint-enable max-lines-per-function */
