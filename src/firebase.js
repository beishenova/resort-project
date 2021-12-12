import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseapp = initializeApp( {

   apiKey: "AIzaSyAXilkJcNuWtRR7WqYsg9H_OoEZVfUByJo",
 
   authDomain: "resort-project-2b903.firebaseapp.com",
 
   projectId: "resort-project-2b903",
 
   storageBucket: "resort-project-2b903.appspot.com",
 
   messagingSenderId: "543578112383",
 
   appId: "1:543578112383:web:4aed2addf0a147fb129a4a",
 
   measurementId: "G-T58W93SN7E"
 
 });

export const auth = getAuth(firebaseapp);