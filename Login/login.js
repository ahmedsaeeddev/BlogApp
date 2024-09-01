import {
    signInWithEmailAndPassword,
    auth,
    onAuthStateChanged
} from '../firebase.js'

let email = document.querySelector('#email');
let password = document.querySelector('#password');


let btn = document.querySelector('button');

let login = () => {
    let emailValue = email.value;
    let passwordValue = password.value;
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed in:', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error:', errorMessage);
        });
}

btn.addEventListener('click', login);


onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "../Dashboard/dashboard.html";
    }
});