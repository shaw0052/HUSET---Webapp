document.addEventListener("DOMContentLoaded", getJSON);

let myMusikPosts;
let myFilmPosts;
let myTeaterPosts;
let eventet;
let closeModal = document.querySelector(".luk");
let destination = document.querySelector(".data-content");

let post;

let all = [];


let dest = document.querySelector(".data-content");

eventFilter = "alle";

document.querySelector("#kontakt").addEventListener("click", function () {
    location.href = "kontakt.html";
})

document.querySelectorAll(".event-item").forEach(knap => {
    knap.addEventListener("click", filtrering)
});

function filtrering() {
    dest.textContent = "";

    // denne data-attribute  = et sted hvor man kan gemme værdier //
    eventFilter = this.getAttribute("data-kategori");
    showPosts();
}

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
    let myTemplate = document.querySelector("#data-template");

    console.log("showPosts kørt");

    all.forEach((post, i) => {
        console.log(i);
        post.id = i;
        if (post.acf.eventtype == eventFilter || eventFilter == "alle") {
            let klon = myTemplate.cloneNode(true).content;

            klon.querySelector("img").src = post.acf.billede;
            klon.querySelector("img").addEventListener("click", () => {
                window.location.href = "singelevent.html?id=" + i;
            });
            klon.querySelector("h2").innerHTML = post.acf.titel;
            klon.querySelector(".data-dato").innerHTML = post.acf.dato;
            klon.querySelector(".data-tidspunkt").innerHTML = "kl. " + post.acf.tidspunkt;
            destination.appendChild(klon);
        }
    })
}
