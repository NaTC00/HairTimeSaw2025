import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

function FailureAlert({ error }) {
  const [show, setShow] = useState(true);

  
  useEffect(() => {
    if (error) setShow(true);
  }, [error]);

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
        <Alert.Heading>{error.heading}</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    </div>
  );
}

export default FailureAlert;
