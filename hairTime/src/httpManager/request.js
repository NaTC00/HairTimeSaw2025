import axios from "axios";
import axiosPrivate from "./axiosPrivate";
import axiosPublic from "./axiosPublic";
import qs from 'qs';

export const getAllServices = async () => {
    try{
        const response = await axiosPublic.get('appointments/services');
        return response.data;
    }catch(error){
        console.error('Errore nel recupero dei servizi:', error.response?.data || error.message);
        throw error;
    }
}

export const getSlotAvailable = async (services) => {
    try{

        console.log("Servizi selezionati (client):", services);
        const response = await axiosPublic.get('appointments/availability', {
        params: { services },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }) // ✅ questo evita services[]
        });


        return response.data;

    }catch(error){
        console.error('Errore nel recupero dei giorni disponibili:', error.response?.data || error.message)
        throw error
    }
}

export const signUp = async (username, email, password) => {
  try {
    const response = await axiosPublic.post('auth/register', {
      username,
      email,
      password
    });

    console.log('Registrazione avvenuta con successo:', response.data);
    return response.data;
  } catch (error) {
    console.error('Errore durante la registrazione:', error.response?.data || error.message);
    throw error;
  }
};

export const signInApi = async (email, password) => {
  const response = await axiosPublic.post('/auth/login', {
    email,
    password,
  });
  return response.data;
}