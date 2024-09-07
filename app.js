import { collection, db, getDocs } from './firebase.js';

const show = async () => {
    const querySnapshot = await getDocs(collection(db, "Blog"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        const blog = doc.data();

        const info = document.querySelector('#info');
        info.innerHTML += `
         <div id="data">
                <div class="textSect">
                    <div class="blogTitle">
                        <h1 id="title">${blog.title}</h1>
                    </div>
                    <div class="blogContent">
                        <p id="content">${blog.content}</p>
                    </div>
                </div>
                <div class="imgSect">
                    <img src="${blog.getImg}" id="img" alt="">
                </div>
            </div>`

    });
}

show();