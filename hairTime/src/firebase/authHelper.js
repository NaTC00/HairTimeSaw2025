import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile} from "firebase/auth";
import { auth } from "./firebase"

// Funzione per registrare un nuovo utente con username
export const doCreateUserWithEmailAndPassword = async (email, password, username) => {
    // Crea l'utente con email e password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
    // Aggiorna il profilo utente con lo username come displayName
    await updateProfile(userCredential.user, {
      displayName: username,
    });
  
    return userCredential;
  };

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};

export const doSignOut = () => {
    return auth.signOut();
}