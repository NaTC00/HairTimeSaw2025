import { useState, useEffect } from "react";

export function useAlert() {
  const [alert, setAlert] = useState(null);

  const showAlert = ({ title, message, error }) => {
    setAlert({ title, message, error });
  };

  const hideAlert = () => {
    setAlert(null);
  };

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
