import {
    storage,
    addDoc,
    collection,
    db,
    uploadBytes,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getDocs,
    signOut,
    auth
} from "../firebase.js";
let btn = document.getElementById('upload');
let image = document.querySelector("#image");

let logoutBtn = document.querySelector("#logout");
let title = document.querySelector("#title");
let content = document.querySelector("#content");
let getImg;

let blogForm = document.querySelector("#blogForm");

let box = document.querySelector("div.box");
box.style.display = "none";

let doneBtn = document.querySelector('button.done')

let h2 = document.querySelector('h2#message')


logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        Toastify({
            text: "User Signed Out",
            className: "info",
            style: {
                background: "#008CBA",
            }
        }).showToast();
        window.location.href = '../Login/login.html';
    });
})

let showBlog = document.querySelector('#showBlogs');

const uploadFiles = () => {
    const files = image.files[0];
    const imgRef = ref(storage, `images/${files.name}`);
    const uploadTask = uploadBytesResumable(imgRef, files);

    uploadBytes(imgRef, files).then((snapshot) => { });

    box.style.display = 'flex';



    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            doneBtn.addEventListener('click', () => {
                if (progress !== 100) {
                    h2.innerText = 'Uploading... Please wait';
                } else {
                    box.style.display = 'none';
                }
            })

            h2.innerText = progress + "% done";
            switch (snapshot.state) {
                case "paused":
                    console.log("Upload is paused");
                    break;
                case "running":
                    console.log("Upload is running");
                    break;

            }
            if (progress === 100) {
                btn.innerText = 'Submit'
            }
        },
        (error) => {
            switch (error.code) {
                case "storage/unauthorized":
                    break;
                case "storage/canceled":
                    break;
                case "storage/unknown":
                    break;
            }
        },
        getDownloadURL(ref(storage, `images/${files.name}`))
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.open('GET', url);
                console.log(url);
                getImg = url

            })
            .catch((error) => {

            })
    )
}


image.addEventListener('change', uploadFiles)







let uploadData = async () => {
    try {
        const docRef = await addDoc(collection(db, "Blog"), {
            title: title.value,
            content: content.value,
            getImg: getImg
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

btn.addEventListener('click', () => {

    if (title.value.trim() === "" || content.value.trim() === "" || getImg === undefined) {
        Toastify({
            text: "Error! One or more fields are empty",
            className: "error",
            style: {
                background: "#ED4337",
            }
        }).showToast();
    }
    else {
        Toastify({
            text: "Blog Added Successfully",
            className: "error",
            style: {
                background: "#008CBA",
            }
        }).showToast();
        uploadData()
        box.style.display = "none";
        title.value = "";
        content.value = "";
        getImg = '';
    }
})

const showBlogs = async () => {
    const querySnapshot = await getDocs(collection(db, "Blog"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
    });
}
showBlogs();



export default { doc, showBlogs }