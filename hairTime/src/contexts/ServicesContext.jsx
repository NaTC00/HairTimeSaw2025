import React, {
  useState,
  useRef,
  useContext,
  createContext,
  useEffect
} from "react";
import { getAllServices } from "../httpManager/request";

const ServiceContext = createContext();

export const useServices = () => useContext(ServiceContext);

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  // 👇 Funzione stabile: nessuna dipendenza
  const loadServices = async () => {
  if (fetchedRef.current || loading) return;

  // 🔐 blocca immediatamente ulteriori chiamate
  fetchedRef.current = true;

  setLoading(true);
  try {
    console.log("Richiesta tutti i servizi");
    const data = await getAllServices();
    setServices(data);
  } catch (err) {
    setError(err);
    // ❗ se errore, sblocca per tentare di nuovo
    fetchedRef.current = false;
  } finally {
    setLoading(false);
  }
};


  return (
    <ServiceContext.Provider
      value={{ services, loading, error, loadServices }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
