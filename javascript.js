document.addEventListener("DOMContentLoaded", getJSON);

let myMusikPosts;
let myFilmPosts;
let myTeaterPosts;
let eventet;
let closeModal = document.querySelector(".luk");
let destination = document.querySelector(".data-content");

let post;


//"all" variablen benyttes til at samle de forskellige arrays som hentes i funktionen "getJSON"
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


    //Via en forEach løkke køres arrayet igennem og push benyttes til at tilføje elementerne fra det oprindelige array ind i det nye (all)
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

    //post.id finder id på et element i arrayet og gør det lig i

    all.forEach((post, i) => {
        console.log(i);
        post.id = i;
        if (post.acf.eventtype == eventFilter || eventFilter == "alle") {
            let klon = myTemplate.cloneNode(true).content;

            klon.querySelector("img").src = post.acf.billede;
            klon.querySelector(".event_content").addEventListener("click", () => {
                window.location.href = "singelevent.html?id=" + i;
                //i tilføjes en predefineret URL og på den måde tilføjes et elements id URL'en
            });
            klon.querySelector("h2").innerHTML = post.acf.titel;
            klon.querySelector(".data-dato").innerHTML = post.acf.dato;
            klon.querySelector(".data-tidspunkt").innerHTML = "kl. " + post.acf.tidspunkt;
            destination.appendChild(klon);
        }
    })


    if (eventFilter == "alle") {
        document.querySelector(".teaterImgPink").classList.add("hide");
        document.querySelector(".musikImgPink").classList.add("hide");
        document.querySelector(".filmImgPink").classList.add("hide");
        document.querySelector(".homeImgPink").classList.remove("hide");

        document.querySelector(".teaterImgWhite").classList.remove("hide");
        document.querySelector(".musikImgWhite").classList.remove("hide");
        document.querySelector(".filmImgWhite").classList.remove("hide");
        document.querySelector(".homeImgWhite").classList.add("hide");


    }

    if (eventFilter == "film") {
        document.querySelector(".homeImgPink").classList.add("hide");
        document.querySelector(".teaterImgPink").classList.add("hide");
        document.querySelector(".musikImgPink").classList.add("hide");
        document.querySelector(".filmImgPink").classList.remove("hide");

        document.querySelector(".homeImgWhite").classList.remove("hide");
        document.querySelector(".teaterImgWhite").classList.remove("hide");
        document.querySelector(".musikImgWhite").classList.remove("hide");
        document.querySelector(".filmImgWhite").classList.add("hide");
    }

    if (eventFilter == "musik") {
        document.querySelector(".homeImgPink").classList.add("hide");
        document.querySelector(".teaterImgPink").classList.add("hide");
        document.querySelector(".musikImgPink").classList.remove("hide");
        document.querySelector(".filmImgPink").classList.add("hide");

        document.querySelector(".homeImgWhite").classList.remove("hide");
        document.querySelector(".teaterImgWhite").classList.remove("hide");
        document.querySelector(".musikImgWhite").classList.add("hide");
        document.querySelector(".filmImgWhite").classList.remove("hide");
    }

    if (eventFilter == "teater") {
        document.querySelector(".homeImgPink").classList.add("hide");
        document.querySelector(".teaterImgPink").classList.remove("hide");
        document.querySelector(".musikImgPink").classList.add("hide");
        document.querySelector(".filmImgPink").classList.add("hide");

        document.querySelector(".homeImgWhite").classList.remove("hide");
        document.querySelector(".teaterImgWhite").classList.add("hide");
        document.querySelector(".musikImgWhite").classList.remove("hide");
        document.querySelector(".filmImgWhite").classList.remove("hide");
    }


}
