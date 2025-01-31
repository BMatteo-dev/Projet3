
const laModale = document.getElementById("modal1");
const laModale2 = document.getElementById("modal2");
const btnModifier = document.querySelector(".modifier");
const galleryModale = document.querySelector(".gallery-modale");

// Afficher la modale1 et supprimer projets
btnModifier.addEventListener("click", async () => {
    laModale.style.display = "flex";
    const reponse = await fetch('http://localhost:5678/api/works');
    const projets = await reponse.json();

    galleryModale.innerHTML="";

    for (let i = 0; i < projets.length; i++) {
        const article = projets[i];
        const id = article.id
        const maFigure = document.createElement("figure");
        maFigure.id = id;
        const imageProjet = document.createElement("img");
        imageProjet.src = article.imageUrl;
        const suppImage = document.createElement("span");
        suppImage.className = "icone-supp";
        suppImage.innerHTML = `<i class='fa-regular fa-trash-can' id='${id}'></i>`;

        maFigure.appendChild(suppImage);
        maFigure.appendChild(imageProjet);
        galleryModale.appendChild(maFigure);
    } 

    // Supprimer Projets

    const supprimerProjets = galleryModale.querySelectorAll(".fa-trash-can");
    supprimerProjets.forEach(suppProjet => {
        suppProjet.addEventListener("click",async (event) =>{
            event.preventDefault();
            let ids = event.target.id

            const response = await fetch(`http://localhost:5678/api/works/${ids}`, {
                 method : "DELETE",
                 headers :  {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                 }
         });
         if (response.ok) {
             console.log("tout est supprimer")
         }
        })
    })
})



// Fermer les modales 
const modales = document.querySelectorAll(".modale");
const closeBtns = document.querySelectorAll(".close-btn");  

closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
        modales.forEach(modale => {
            modale.style.display = "none";
        });
    });
});
modales.forEach(modale => {
    modale.addEventListener("click", (event) => {
        if (event.target === modale) {
            modales.forEach(function(modale) {
                modale.style.display = "none"; 
            });
        }
    });
});


// Afficher la modale2

const addPhotos = document.querySelector(".add-photos");

addPhotos.addEventListener("click", () => {
    laModale2.style.display = "flex";
})

const retour = document.getElementById("retour");

// retour a la modale1

retour.addEventListener("click", () => {
    laModale2.style.display = "none";
    laModale.style.display ="flex";
})



