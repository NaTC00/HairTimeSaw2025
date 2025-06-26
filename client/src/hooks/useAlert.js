import { useState, useEffect } from "react";

// Custom hook per gestire un messaggio di alert temporaneo (successo o errore)
export function useAlert() {
  // Stato per contenere i dati dell'alert (titolo, messaggio e se è un errore)
  const [alert, setAlert] = useState(null);

  // Funzione per memorizzare i dati dell'alert
  const showAlert = ({ title, message, error }) => {
    setAlert({ title, message, error });
  };

  // Funzione per nascondere manualmente l'alert
  const hideAlert = () => {
    setAlert(null);
  };

  //Fa scomparire l'alert automaticamente dopo 3 secondi
  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  return { alert, showAlert, hideAlert };
}
