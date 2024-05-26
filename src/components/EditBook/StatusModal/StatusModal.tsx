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

import Button from 'react-bootstrap/Button';
import { type Dispatch } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface StatusModalProps {
    updateMessage: {
        visible: boolean;
        nachricht: string;
        error: boolean;
    };
    setUpdateMessage: Dispatch<{
        visible: boolean;
        nachricht: string;
        error: boolean;
    }>;
    routingPath: string;
}

export const StatusModal = ({
    updateMessage,
    setUpdateMessage,
    routingPath,
}: StatusModalProps) => {
    const navigate = useNavigate();

    return (
        <>
            <Modal
                show={updateMessage.visible}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {updateMessage.nachricht}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            if (updateMessage.error) {
                                setUpdateMessage({
                                    visible: false,
                                    nachricht: 'N/A',
                                    error: updateMessage.error,
                                });
                            } else {
                                navigate(routingPath);
                            }
                        }}
                    >
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
