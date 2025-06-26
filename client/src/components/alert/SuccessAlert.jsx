import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

// Componente che mostra un messaggio di successo in un alert
function SuccessAlert({ content, onClose }) {
   // Stato per controllare se l'alert è visibile
  const [show, setShow] = useState(true);

  // Funzione chiamata quando l'utente chiude manualmente l'alert
  useEffect(() => {
    if (content) setShow(true);
  }, [content]);

  const handleClose = () => {
    setShow(false)
    if (onClose) { 
      onClose()
    }
  }

  if (!show || !content) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "90%",
        maxWidth: "500px",
      }}
    >
      <Alert variant="success" onClose={handleClose} dismissible className="text-center">
        <Alert.Heading>{content.heading}</Alert.Heading>
        <p>{content.message}</p>
      </Alert>
    </div>
  );
}

export default SuccessAlert;
