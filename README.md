# malamakai

malamakai is an Angular PWA powered by Firebase.

- [Live Demo](https://malamakai.wep.app/)

![](./src/assets/social-preview.png)

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

![](./src/assets/firebase-config.png)

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

## Resources

- [Complete implementation with roles](https://docs.react2025.com/payments/checkout)
- [Delete users implementation](https://firebase.google.com/codelabs/stripe-firebase-extensions)
- [Delete users more info](https://firebase.google.com/docs/auth/web/manage-users#delete_a_user)
- [Custom claims](https://firebase.google.com/docs/auth/admin/custom-claims)
- [Stripe roles answers](https://stackoverflow.com/questions/64994680/firestore-rules-are-not-accepting-custom-claims-from-stripe-striperole)
