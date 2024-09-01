    import {
        createUserWithEmailAndPassword,
        auth,
        onAuthStateChanged
    } from '../firebase.js'

    let email = document.querySelector('#email');
    let password = document.querySelector('#password');


    let btn = document.querySelector('button');

    let signin = () => {
        let emailValue = email.value;
        let passwordValue = password.value;
        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    btn.addEventListener('click', signin);