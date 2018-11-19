//Der angives en variabel som søger i URL'en
let urlPrams = new URLSearchParams(window.location.search);
//Her benyttes variablen urlPrams sammen med "get" og på den måde trækkes id'et ud af URL'en og gemmes i variablen "id"
let id = urlPrams.get("id");
console.log(id);

let dest = document.querySelector(".data-container"),
    personer;

let all = [];

document.addEventListener("DOMContentLoaded", getJSON);

document.querySelector("#backToHome").addEventListener("click", function () {
    location.href = "index.html";
})

document.querySelector("#kontakt").addEventListener("click", function () {
    location.href = "kontakt.html";
})

async function getJSON() {

    let myMusik = await fetch("https://designhagenow.dk/kea/huset-kbh/wordpress/wp-json/wp/v2/musikevents");
    myMusikPosts = await myMusik.json();

    let myFilm = await fetch("https://designhagenow.dk/kea/huset-kbh/wordpress/wp-json/wp/v2/filmevents");
    myFilmPosts = await myFilm.json();

    let myTeater = await fetch("https://designhagenow.dk/kea/huset-kbh/wordpress/wp-json/wp/v2/teaterevent");
    myTeaterPosts = await myTeater.json();



    myMusikPosts.forEach(post => {
        all.push(post);
    })

    myFilmPosts.forEach(post => {
        all.push(post);
    })

    myTeaterPosts.forEach(post => {
        all.push(post);
    })

    console.log(all);
    showPosts();

}

function showPosts() {
    let dest = document.querySelector(".singelview_event_container");
    //løb personlisten igennem og lav en klon
    all.forEach((post, i) => {
        if (i == id) {
            dest.querySelector("h2").innerHTML = post.acf.titel;
            dest.querySelector(".data-dato").innerHTML = post.acf.dato;
            dest.querySelector(".data-tidspunkt").innerHTML = "kl. " + post.acf.tidspunkt;
            dest.querySelector("img").src = post.acf.billede;
            dest.querySelector(".data_textarea").innerHTML = post.acf.tekst;
            dest.querySelector(".data_pris").innerHTML = "Pris: " + post.acf.pris + "kr.";
        }
    })
}
