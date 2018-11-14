let urlPrams = new URLSearchParams(window.location.search);
let id = urlPrams.get("id");
console.log(id);

let dest = document.querySelector(".data-container"),
    personer, civilFilter = "alle";

document.addEventListener("DOMContentLoaded", hentJson);

async function hentJson() {
    let myJson = await fetch("personliste.json");
    personer = await myJson.json();
    visPerson();
}

document.querySelectorAll(".menu-item").forEach(knap => {
    knap.addEventListener("click", filtrering)
});

function filtrering() {
    dest.textContent = "";
    civilFilter = this.getAttribute("data-civilstatus");

    visPerson();
}

function visPerson() {
    let dest = document.querySelector(".data-container");
    //løb personlisten igennem og lav en klon
    personer.forEach((person, i) => {
        if (i == id) {
            dest.querySelector("h2").textContent = person.navn;
            dest.querySelector("img").src = person.billede;
            dest.querySelector(".data-civilstatus").textContent = person.civilstatus;
            dest.querySelector(".data-github").textContent = person.github;
        }
    })
}
