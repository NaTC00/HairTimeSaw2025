import axios from "axios";
import axiosPrivate from "./axiosPrivate";
import axiosPublic from "./axiosPublic";
import qs from "qs";

export const getAllServices = async () => {
  try {
    const response = await axiosPublic.get("appointments/services");
    console.log("Recupero servizi andato a buon fine");
    return response.data;
  } catch (error) {
    console.error(
      "Errore nel recupero dei servizi:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getSlotAvailable = async (services) => {
  try {
    console.log("Servizi selezionati (client):", services);
    const response = await axiosPublic.get("appointments/availability", {
      params: { services },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }), // ✅ questo evita services[]
    });

    return response.data;
  } catch (error) {
    console.error(
      "Errore nel recupero dei giorni disponibili:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const signUp = async (username, email, password) => {
  try {
    const response = await axiosPublic.post("auth/register", {
      username,
      email,
      password,
    });

    console.log("Registrazione avvenuta con successo:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Errore durante la registrazione:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const signInApi = async (email, password) => {
  const response = await axiosPublic.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const bookAppointment = async (
  axiosPrivate,
  services,
  phone_number,
  date,
  time_slot,
) => {
  try {
    const response = await axiosPrivate.post("appointments/book", {
      services,
      phone_number,
      date,
      time_slot,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Errore nella prenotazione:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getAllAppointments = async (axiosPrivate) => {
  try {
    const response = await axiosPrivate.get("appointments/user");
    return response.data;
  } catch (error) {
    console.error(
      "Errore durante il recupero delle prenotazioni:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const deleteAppointment = async (axiosPrivate, appointmentId) => {
  try {
    const response = await axiosPrivate.delete(`appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Errore durante l'eliminazione della prenotazione:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const submitReview = async (axiosPrivate, rating, comment) => {
  try {
    const response = await axiosPrivate.post("reviews/sumbit_review", {
      rating,
      comment,
    });
    console.log("Invio recensione andato a buon fine");
    return response.data;
  } catch (error) {
    console.error(
      "Errore durante l'invio della recensione",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getReviews = async () => {
  try {
    const response = await axiosPublic.get("reviews");
    console.log("Recupero recensioni andato a buon fine");
    return response.data;
  } catch (error) {
    console.error("Errore durante il recupero recensioni");
    throw error;
  }
};

export const subscribeNotification = async (axiosPrivate, subscription) => {
  try {
    const response = await axiosPrivate.post("push/subscribe", {
      subscription,
    });
    console.log("Iscrizione al servizio di notifica anadato a buon fine");
    return response.data;
  } catch (error) {
    console.error("Errore durante l'iscrizione al servizio di notifica");
    throw error;
  }
};
