import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

function FailureAlert({ error, title }) {
  const [show, setShow] = useState(true);
  const [heading, setHeading] = useState('');
  const [message, setMessage] = useState('');


  const getErrorMessageFromStatus = () => {
    const status = error?.response?.status || 0;
    const msg =
        typeof error?.response?.data === 'object' && error.response.data?.error
        ? error.response.data.error
        : 'Errore sconosciuto.';

   
    switch (status) {
        case 400:
        case 409:
        return {
            heading: title,
            message: msg,
        };
        case 500:
        return {
            heading: title,
            message: "Qualcosa è andato storto. Riprova più tardi.",
        };
        case 401:
        return{
            heading: title,
            message: "Prima di prenotare un appuntamento devi effettuare l'accesso",
        }
        default:
        return {
            heading: title,
            message: "Si è verificato un errore. Controlla la connessione e riprova.",
        };
    }
    };

  
  useEffect(() => {
    if (error){
        const { heading, message } = getErrorMessageFromStatus(error, title);
        setShow(true);
        setHeading(heading);
        setMessage(message);
    } 
  }, [error, title]);

  if (!show || !error) return null;

   

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
      <Alert variant="danger" onClose={() => setShow(false)} dismissible className="text-center">
        <Alert.Heading>{heading}</Alert.Heading>
        <p>{message}</p>
      </Alert>
    </div>
  );
}

export default FailureAlert;
