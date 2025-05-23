import axiosPrivate from "./axiosPrivate";
import axiosPublic from "./axiosPublic";

export const getAllServices = async () => {
    try{
        const response = await axiosPublic.get('services');
        return response.data;
    }catch(error){
        console.error('Errore nel recuper dei servizi:', error.response?.data || error.message);
        throw error;
    }
}