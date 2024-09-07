import {
    signInWithEmailAndPassword,
    auth,
    onAuthStateChanged,
    doc,
    sendPasswordResetEmail
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
            // console.log('User signed in:', user);
            Toastify({
                text: 'Login Sucessfull... Redirecting to  Dashboard',
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
            console.error('Error:', errorMessage);
            Toastify({
                text: errorMessage,
                className: "error",
                style: {
                    background: "#ED4337",
                }
            }).showToast();
        });
}

btn.addEventListener('click', login);




onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "../Dashboard/dashboard.html";
    }
});
const reset = () => {
    sendPasswordResetEmail(auth, email.value)
        .then(() => {
            Toastify({
                text: "Password reset email sent!",
                className: "info",
                style: {
                    background: "#008BCA",
                }
            }).showToast();
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            // console.error(errorMessage)
            Toastify({
                text: errorMessage,
                className: "error",
                style: {
                    background: "#ED4337",
                }
            }).showToast();


        });
}

document.getElementById('reset-password').addEventListener('click', reset);