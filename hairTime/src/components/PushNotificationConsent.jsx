import { useState } from 'react';
import { Row, Col, Form, Modal, Button } from 'react-bootstrap';
import { usePushSubscription } from '../hooks/usePushSubscription';

export function PushNotificationConsent({ axiosPrivate }) {
  const [showModal, setShowModal] = useState(false);
  const [enabled, setEnabled] = useState(false); // attiva la sottoscrizione
  const [checked, setChecked] = useState(false); // controlla visivamente il checkbox

  usePushSubscription(enabled, axiosPrivate);

  const handleChange = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setShowModal(true);      // mostro la modale
    } else {
      setEnabled(false);       // disattivo la sottoscrizione
      setChecked(false);       // deseleziono il checkbox
    }
  };

  const handleConfirm = () => {
    setEnabled(true);          // attivo la sottoscrizione
    setChecked(true);          // visivamente selezionato
    setShowModal(false);
  };

  const handleCancel = () => {
    setEnabled(false);         // non attivo la sottoscrizione
    setChecked(false);         // deseleziono la checkbox
    setShowModal(false);
  };

  return (
    <>
      {/* ✅ Checkbox controllato */}
      <Row className="mb-3">
        <Col>
          <Form.Check
            type="checkbox"
            id="notifiche"
            label="Abilita notifiche push"
            onChange={handleChange}
            checked={checked} // stato controllato
          />
        </Col>
      </Row>

      {/* ✅ Modale di conferma */}
      <Modal show={showModal} onHide={handleCancel} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Vuoi attivare le notifiche?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ti invieremo un promemoria il giorno prima del tuo appuntamento.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PushNotificationConsent;
