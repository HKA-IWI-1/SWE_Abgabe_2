/*
 * Copyright (c) 2024 - present Florian Sauer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the “Software”), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions
 * of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

import './BackButton.scss';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const BackButton = ({ isDirty }: { isDirty: boolean }) => {
    const [backButtonTriggered, setBackButtonTriggered] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <OverlayTrigger
                placement={'right'}
                overlay={<Tooltip id={'tooltip-right'}>Zurück</Tooltip>}
            >
                <Button
                    className={'back-button'}
                    variant="outline-dark"
                    onClick={() => {
                        if (isDirty) {
                            setBackButtonTriggered(true);
                        } else {
                            navigate(-1);
                        }
                    }}
                >
                    <i className="bi bi-caret-left-fill"></i>
                </Button>
            </OverlayTrigger>
            {isDirty && backButtonTriggered && (
                <Modal
                    show={backButtonTriggered}
                    onHide={() => setBackButtonTriggered(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Ungespeicherte Änderungen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Möchten Sie tatsächlich zurück gehen?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => navigate(-1)}
                        >
                            Zurückgehen
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => setBackButtonTriggered(false)}
                        >
                            Nicht zurückgehen
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};
