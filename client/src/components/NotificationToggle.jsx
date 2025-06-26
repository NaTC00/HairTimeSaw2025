import { useState, useEffect } from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import { usePushSubscription } from "../hooks/usePushSubscription";
import { useAuth } from "../contexts/authContext/AuthContext"

export default function NotificationToggle() {
   // Stato per sapere se la checkbox è selezionata
  const [checked, setChecked] = useState(false);
  // Stato per mostrare il modale di conferma attivazione notifiche
  const [showModal, setShowModal] = useState(false);
  // Stato per mostrare il modale di conferma disattivazione notifiche
  const [showDisableModal, setShowDisableModal] = useState(false);
  // Stato per sapere sell'utente e loggato
  const { userLoggedIn } = useAuth();

  
  const {
    subscribed,
    error,
    subscribePush, unsubscribePush 
  } = usePushSubscription(userLoggedIn); 

 
  useEffect(() => {
    setChecked(subscribed);
  }, [subscribed]);

  // Gestisce il cambio della checkbox 
  const handleChange = (e) => {
    const isChecked = e.target.checked;
    //se l'utente deseleziona la checkbox ed è iscritto, mostra la modale per la conferma della disattivazione delle notifiche
    if (!isChecked && subscribed) {
    
      setShowDisableModal(true);
      return;
    }
    
    //se l'utente seleziona la checkbox e non è iscritto, mostra la modale di conferma
    if (isChecked && !subscribed) {
      setShowModal(true);
      return;
    }

    setChecked(isChecked);
  };

  // Conferma attivazione notifiche
  const handleConfirm = async () => {
    setShowModal(false);
   
    const success = await subscribePush(); // Prova a iscrivere l’utente

    if (success) {
      setChecked(true); // Aggiorna la checkbox
    }
  };

  const handleCancel = () => setShowModal(false);

  // Conferma disattivazione notifiche
  const handleDisableConfirm = async () => {

    setShowDisableModal(false);
    const success = await unsubscribePush() // Prova a disiscrivere l'utente
    if(success) setChecked(false); // Aggiorna la checkbox
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
