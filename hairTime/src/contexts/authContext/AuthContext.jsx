import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";

//creo un contesto per l'autenticazione
const AuthContext = React.createContext();

//hook per accedere al contesto
export function useAuth(){
    return useContext(AuthContext);
}

//componente che fornisce il contesto di autenticazione
export function AuthProvider({children}){
    const [currentUser, setCurrentuser] = useState(null); //utente corrente
    const [userLoggedIn, setUserLoggedIn] = useState(false); //stato login
    const [loading, setLoading] = useState(true); //stato di caricamento

    useEffect(()=>{
        //si attiva quando cambia lo stato di autenticazione
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        //rimuovo il listner
        return unsubscribe;
    })

    //inizializzazione utente
    async function initializeUser(user) {
        if(user){
            //se esiste un utente loggato lo inserisco nell'utente corrente
            setCurrentuser({ ...user});
            setUserLoggedIn(true);
        }else{
            //altrimenti resetto lo stato
            setCurrentuser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading
    }
    return(
        // Fornisce il contesto ai componenti figli
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}