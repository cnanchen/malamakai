// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  webapp_url: 'http://localhost:4200',

  stripe: {
    restrictedKey: '',
    subsPrice: '',
  },
  
  youtube: {
    apikey: '',
    playlistCalm: '',
    nextpage: '',
  },
  
  // location: 'us-central1',
  
  firebaseConfig:  {
    apiKey: "AIzaSyDpcqDZQXZD_K3titfTXGHCcJssHUNnE_0",
    authDomain: "malamakai.firebaseapp.com",
    projectId: "malamakai",
    storageBucket: "malamakai.appspot.com",
    messagingSenderId: "198661698484",
    appId: "1:198661698484:web:e268c4a7fce89f689f78e1",
    measurementId: "G-GGSMH1XYJY"
  }
};