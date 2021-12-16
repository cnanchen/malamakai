# malamakai

malamakai is an Angular PWA powered by Firebase.

- [Live Demo](https://malamakai.wep.app/)

## Features

- Angular 9.x + Firebase
- Installable PWA
- OAuth and Email/Password Signup with Firebase
- Drag & drop Kanban demo with Firestore

## Usage

1.  Run

- `git clone https://github.com/davidmimay/malamakai.git malamakai`
- `cd malamakai`
- `npm install`

2.  Create a project at https://firebase.google.com/ and grab your web config:

![](https://firebasestorage.googleapis.com/v0/b/malamakai-96e46.appspot.com/o/project-config.PNG?alt=media&token=5eabb205-7ba2-4fc3-905f-e9547055e754)

3.  Add the config to your Angular environment

#### src/environments/

Update the `environment.prod.ts` and `environment.ts` files. 

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'APIKEY',
    authDomain: 'DEV-APP.firebaseapp.com',
    databaseURL: 'https://DEV-APP.firebaseio.com',
    projectId: 'DEV-APP',
    storageBucket: 'DEV-APP.appspot.com',
    messagingSenderId: '...',
    appId: '...',
  }
};
```

5.  Run `ng serve`