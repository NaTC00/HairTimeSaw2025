import { useState, useEffect } from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import { usePushSubscription } from "../hooks/usePushSubscription";
import { useAuth } from "../contexts/authContext/AuthContext"

export default function NotificationToggle() {
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const { userLoggedIn } = useAuth();

  // 🔎 Solo verifica iniziale (non attiva/disattiva nulla)
  const {
    subscribed,
    subscriptionId,
    error,
    subscribePush, unsubscribePush 
  } = usePushSubscription(userLoggedIn); // checkOnly = true

  // ✅ All'avvio: imposta lo stato visivo della checkbox
  useEffect(() => {
    setChecked(subscribed);
  }, [subscribed]);

  const handleChange = (e) => {
    const isChecked = e.target.checked;

    if (!isChecked && subscribed) {
      setShowDisableModal(true);
      return;
    }

    if (isChecked && !subscribed) {
      setShowModal(true);
      return;
    }

    setChecked(isChecked);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    setChecked(true);
    await subscribePush()
   
  };

  const handleCancel = () => setShowModal(false);

  const handleDisableConfirm = async () => {
    setShowDisableModal(false);
    setChecked(false);
    await unsubscribePush()
  };

  const handleDisableCancel = () => setShowDisableModal(false);

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

      {/* Modale attivazione */}
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

      {/* Modale disattivazione */}
      <Modal
        show={showDisableModal}
        onHide={handleDisableCancel}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Disattivare le notifiche?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Non riceverai più promemoria per i tuoi appuntamenti. Sei sicuro?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDisableCancel}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDisableConfirm}>
            Disattiva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
