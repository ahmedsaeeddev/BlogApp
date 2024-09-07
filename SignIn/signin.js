import {
    createUserWithEmailAndPassword,
    auth,
} from '../firebase.js'

let email = document.querySelector('#email');
let password = document.querySelector('#password');


let btn = document.querySelector('button');
let signin = () => {

    if (email.value.trim() === "" || password.value.trim() === "") {
        Toastify({
            text: "Error! One or more fields are empty",
            className: "error",
            style: {
                background: "#ED4337",
            }
        }).showToast();
    }
    else {
        let emailValue = email.value;
        let passwordValue = password.value;
        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                Toastify({
                    text: "Sign in Successfull",
                    className: "info",
                    style: {
                        background: "#008CBA",
                    }
                }).showToast();
                window.location.href = '../Dashboard/dashboard.html';

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                Toastify({
                    text: errorMessage,
                    className: "error",
                    style: {
                        background: "#ed4337",
                    }
                }).showToast();

            });
    }
}

btn.addEventListener('click', signin);