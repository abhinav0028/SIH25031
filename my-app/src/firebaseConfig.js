import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACWVMwdXWUUDVXAaHY5qMHu7q3e-fAcNc",
  authDomain: "my-project-72e8d.firebaseapp.com",
  projectId: "my-project-72e8d",
  storageBucket: "my-project-72e8d.firebasestorage.app",
  messagingSenderId: "580133035283",
  appId: "1:580133035283:web:06c4c10ddcf8919d444ee6",
  measurementId: "G-6FHK2M1TJQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
