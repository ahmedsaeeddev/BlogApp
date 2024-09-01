import {
    storage,
    addDoc,
    collection,
    db,
    uploadBytes,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    // doc,
    // getDoc,
    getDocs,
} from "../firebase.js";

let btn = document.querySelector("button");
let image = document.querySelector("input#image");
let title = document.querySelector("#title");
let content = document.querySelector("#content");
let getImg;

const uploadFiles = () => {
    const files = image.files[0];
    const imgRef = ref(storage, `images/${files.name}`);
    const uploadTask = uploadBytesResumable(imgRef, files);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
                case "paused":
                    console.log("Upload is paused");
                    break;
                case "running":
                    console.log("Upload is running");
                    break;
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
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                getImg = downloadURL;
                console.log("File available at", getImg);
            });
        }
    );

    uploadBytes(imgRef, files).then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
    });
};

let uploadData = async () => {
    try {
        const docRef = await addDoc(collection(db, "Blog"), {
            title: title.value,
            content: content.value,
            image: getImg
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};
btn.addEventListener('click', () => {
    uploadData()
    uploadFiles()
})

const showBlogs = async () => {
    const querySnapshot = await getDocs(collection(db, "Blog"));
    querySnapshot.forEach((doc) => {
    console.log(doc.data());    
    });
}

showBlogs();