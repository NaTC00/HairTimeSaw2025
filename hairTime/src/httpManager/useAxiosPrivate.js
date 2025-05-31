import { useEffect } from 'react';
import { useAuth } from '../contexts/authContext/AuthContext';
import axiosPrivate from './axiosPrivate';

export default function useAxiosPrivate() {
  const { token } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(

         //Serve a modificare la richiesta per aggiungere l’Authorization header con il token.
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    //rimuove l’interceptor per non accumularne più di uno quando il token cambia o useAxiosPrivate viene smontato 
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [token]); //il blocco viene eseguito ogni volta che il token cambia

  return axiosPrivate;
}
