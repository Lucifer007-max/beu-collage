import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  imgUrl: 'https://beu-bih.ac.in/backend/',
  apiUrl: 'https://beu-bih.ac.in/backend/v1/',
  backendUrl : 'https://beu-bih.ac.in/backend/v1/',
  firebaseConfig : {
    apiKey: "AIzaSyASbS80xS1_w2UWb_UlBxngzeAGDaIbCsc",
    authDomain: "beu-app-10946.firebaseapp.com",
    projectId: "beu-app-10946",
    storageBucket: "beu-app-10946.firebasestorage.app",
    messagingSenderId: "49555334698",
    appId: "1:49555334698:web:1eadefbc40cfa6fe898553",
    measurementId: "G-BZZ81KMPXJ"
  }

};
