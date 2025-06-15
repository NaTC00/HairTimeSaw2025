import { useState } from 'react';
import { Row, Col, Form, Modal, Button } from 'react-bootstrap';
import { usePushSubscription } from '../hooks/usePushSubscription';

export function PushNotificationConsent({ axiosPrivate }) {
  const [showModal, setShowModal] = useState(false);
  const [enabled, setEnabled] = useState(false); 
  const [checked, setChecked] = useState(false); 
  
  const error = usePushSubscription(enabled, axiosPrivate);


 

  const handleChange = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setShowModal(true);      
    } else {
      setEnabled(false);       
      setChecked(false);
      setError(null);       
    }
  };

  const handleConfirm = () => {
    setEnabled(true);          
    setChecked(true);          
    setShowModal(false);
  };

  const handleCancel = () => {
    setEnabled(false);         
    setChecked(false);         
    setShowModal(false);
  };

  return (
    <>
     
      <Row className="mb-3">
      <Col>
        <Form.Check
          className="mb-0"
          type="checkbox"
          id="notifiche"
          label="Abilita notifiche promemoria"
          onChange={handleChange}
          checked={checked}
        />

        {error && (
          <Form.Text className="text-danger">
            Errore: {error}
          </Form.Text>
        )}
      </Col>

      </Row>

      
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
