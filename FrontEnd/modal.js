
const laModale = document.getElementById("modal1");
const laModale2 = document.getElementById("modal2");
const btnModifier = document.querySelector(".modifier");
const galleryModale = document.querySelector(".gallery-modale");

// Fontcion pour afficher la modale1
function AfficherModale1() {
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
    supprimerProjets();
})
}

// Fonction pour supprimer les projets
function supprimerProjets() {
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
             console.log("tout est supprimer");
             event.target.closest("figure").remove();
             menuCategorie();
         }
        })
    })
}

// Fermer les modales 
function fermerLesModales(){
const modales = document.querySelectorAll(".modale");
const closeBtns = document.querySelectorAll(".close-btn");  

closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
        modales.forEach(modale => {
            modale.style.display = "none";
            resetImage();
        });
    });
});
modales.forEach(modale => {
    modale.addEventListener("click", (event) => {
        if (event.target === modale) {
            modales.forEach(function(modale) {
                modale.style.display = "none";
                resetImage(); 
            });
        };
    });
});
};

// Afficher la modale2
function afficherModale2 () {
const addPhotos = document.querySelector(".add-photos");

addPhotos.addEventListener("click", () => {
    laModale2.style.display = "flex";
})
}

// fonction retour a la modale1
function retourModale1() {
    const retour = document.getElementById("retour");
    retour.addEventListener("click", () => {
        laModale2.style.display = "none";
        laModale.style.display ="flex";
        resetImage();
})
};

//Appel des fonctions 
AfficherModale1();
afficherModale2();
fermerLesModales();
retourModale1();




