/*
 * Copyright (c) 2024 - present Luca Breisinger
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
import { Button, Modal } from 'react-bootstrap';
import { DELETE_MUTATION } from './mutations';
import { StatusModal } from '../StatusModal/StatusModal';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

interface DeleteModalProps {
    id: number | undefined;
    hideModal: () => void;
}

export const DeleteModal = ({ id, hideModal }: DeleteModalProps) => {
    const [deleteMessage, setDeleteMessage] = useState({
        visible: false,
        nachricht: 'N/A',
        error: false,
    });
    const [deleteBook, { loading }] = useMutation(DELETE_MUTATION, {
        onCompleted: () => {
            setDeleteMessage({
                visible: true,
                nachricht: 'Das Löschen war erfolgreich.',
                error: false,
            });
        },
        onError: (err) => {
            setDeleteMessage({
                visible: true,
                nachricht: `Fehler: ${err.message}`,
                error: true,
            });
            console.error(err);
        },
    });

    const DeleteBook = async () => {
        await deleteBook({ variables: { id } });
    };

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={true}
                onHide={hideModal}
            >
                <Modal.Header closeButton onClick={hideModal}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sind Sie sicher?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button onClick={() => DeleteBook()}>Ja</Button>
                    <Button onClick={hideModal}> Nein </Button>
                    {loading && <p>Laden...</p>}
                </Modal.Body>
            </Modal>
            {deleteMessage.visible && (
                <StatusModal
                    deleteMessage={deleteMessage}
                    hideModal={hideModal}
                />
            )}
        </>
    );
};
