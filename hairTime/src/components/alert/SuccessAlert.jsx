import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

function SuccessAlert({ content }) {
  const [show, setShow] = useState(true);

  
  useEffect(() => {
    if (content) setShow(true);
  }, [content]);

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
      <Alert variant="success" onClose={() => setShow(false)} dismissible className="text-center">
        <Alert.Heading>{content.heading}</Alert.Heading>
        <p>{content.message}</p>
      </Alert>
    </div>
  );
}

export default SuccessAlert;
