
function ajouterUnNouveauProjet (){
const validerPhoto = document.querySelector(".valider-photos");
const titleProjet = document.querySelector(".title");
const imageUpload = document.getElementById("imageUrl");
const inputCategory = document.getElementById("categoryId");

validerPhoto.addEventListener("click", async (event) => {
    event.preventDefault();

    // Id
    const choixCategory = {
        "Objets" : 1,
        "Appartements" : 2,
        "Hotels & restaurants" : 3
    }
    const categoryName = inputCategory.value;
    const categoryId = choixCategory[categoryName];

    // FormData
    const formData = new FormData();
    formData.append("title", titleProjet.value);
    formData.append("image", imageUpload.files[0]);  
    formData.append("category", categoryId);

    // Envoi requete
    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,  
            "Accept": "application/json" 
        },
        body: formData
    });

    if (response.ok) {
        console.log("Ajout projet réussi");
        alert("Nouveau projet ajouter avec succés")
        window.location.href="index.html";
        menuCategorie();
        
    } else {
        alert("Veuillez renseigner tous les champs")
        console.log("Erreur lors de l'ajout du projet:");
    }
})
};

const addImage = document.querySelector(".ajouter-photo");
const iconUpload = document.getElementById("icone-image");
const preview = document.getElementById("preview");
const imageUpload = document.getElementById("imageUrl");

    function ajouterImageNouveauProjet() {
    imageUpload.addEventListener("change", () => {
        const file = imageUpload.files[0]; 
        if (file) {
            iconUpload.style.display = "none";
            addImage.style.display = "none";
            preview.style.display ="flex";
            const reader = new FileReader();
    
            reader.onload = function (event) {
                const monImage = event.target.result; 
                preview.src = monImage; 
            };
    
            reader.readAsDataURL(file);
        }
    })
}

function resetImage() {
    iconUpload.style.display = "block";
    addImage.style.display = "inline";
    preview.style.display = "none";
    preview.innerHTML="";
    imageUpload.value = "";
}


ajouterUnNouveauProjet();
ajouterImageNouveauProjet();
