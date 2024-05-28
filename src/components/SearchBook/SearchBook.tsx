import { Button, Col, Container, Row } from 'react-bootstrap';
import { Buchart } from './Buchart/Buchart';
import { Isbn } from './Isbn/Isbn';
import { Lieferbar } from './Lieferbar/Lieferbar';
import { Rating } from './Rating/Rating';
import { Titel } from './Titel/Titel';
import { useForm } from 'react-hook-form';

export interface FormValues {
    buchart: string;
    isbn: string;
    lieferbar: boolean;
    rating: string;
    titel: string;
}

export const SearchInput = () => {
    const { register, watch } = useForm<FormValues>();
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Titel register={register} />
                    </Col>
                    <Col>
                        <Isbn register={register} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={5}>
                        <Rating register={register} watch={watch} />
                    </Col>
                    <Col md="auto">
                        <Buchart register={register} />
                    </Col>
                    <Col xs={1} className="justify-content-end">
                        <Lieferbar register={register} />
                    </Col>
                </Row>
                <Row></Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 d-flex justify-content-center"
                        >
                            Suchen
                        </Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
};
