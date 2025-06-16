import axios from 'axios';
import { auth } from './firebase/firebase';

const instance = axios.create({
    baseURL:'http://localhost:3000/appointments/',
    headers:{
        'Content-Type': 'application/json',
    }
});

instance.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if(user){
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
},(error) => {
  return Promise.reject(error);
});

export default instance;