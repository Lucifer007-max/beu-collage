// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  imgUrl: 'https://beu-bih.ac.in/backend/',
  // apiUrl: 'https://beu-bih.ac.in/backend/',
  // backendUrl : 'https://beu-bih.ac.in/backend/',
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
// prod === 'https://prod.anantdrishti.com/v1/'
// dev ==='https://beu-prod.anantdrishti.com/v1/'
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
