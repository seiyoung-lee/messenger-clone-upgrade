import firebase from 'firebase';


const firebaseapp = firebase.initializeApp({
        apiKey: "AIzaSyCrzJqECHBzi5El_PIFWNmuMJJTPxhtjRw",
        authDomain: "messenger-facebook-app.firebaseapp.com",
        projectId: "messenger-facebook-app",
        storageBucket: "messenger-facebook-app.appspot.com",
        messagingSenderId: "1089295362996",
        appId: "1:1089295362996:web:cd059784a16bece88a60e1",
        measurementId: "G-FZ9HVZDKW2"
});

const db = firebaseapp.firestore();

export default db;