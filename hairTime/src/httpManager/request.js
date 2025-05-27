import axiosPrivate from "./axiosPrivate";
import axiosPublic from "./axiosPublic";
import qs from 'qs';

export const getAllServices = async () => {
    try{
        const response = await axiosPublic.get('services');
        return response.data;
    }catch(error){
        console.error('Errore nel recupero dei servizi:', error.response?.data || error.message);
        throw error;
    }
}

export const getSlotAvailable = async (services) => {
    try{

        console.log("Servizi selezionati (client):", services);
        const response = await axiosPublic.get('availability', {
        params: { services },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }) // ✅ questo evita services[]
        });


        return response.data;

    }catch(error){
        console.error('Errore nel recupero dei giorni disponibili:', error.response?.data || error.message)
        throw error
    }
}