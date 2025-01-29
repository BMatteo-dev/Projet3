

// Récuperer les différents info de mon formulaire
let eMail = document.querySelector(".e-mail");
let motDePasse = document.querySelector(".mot-de-passe");
const form = document.querySelector("form");

// Ajout d'un evenement a l envoi de mon formulaire
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Creation de l'objet identifiant (mail et password)
       const monObjet = {
            email : eMail.value,
            password : motDePasse.value
        }
        // Envoi des données a l'API
       const response = await fetch("http://localhost:5678/api/users/login", {
            method : "POST",
            headers :  {"Content-Type" : "application/json"},
            body : JSON.stringify (monObjet)
    });
        //Stockage de la reponse de l'API et traitement
        const data = await response.json();
        const token = data.token;

        if (response.ok) {
            localStorage.setItem("token", token);
            window.location.href="index.html";
        } else {
            alert("Erreur dans l'identifiant ou le mot de passe")
        }
    })

    const utilisateurConnecter = localStorage.getItem("token");

        if (utilisateurConnecter) {
            console.log(utilisateurConnecter);
            const logout = document.querySelector(".log");
            logout.innerText ="Logout";
            const modeEdition = document.querySelector(".edition");
            modeEdition.style.display = "block";
            const modeEditer = document.querySelector(".modifier");
            modeEditer.style.display = "flex";
            
            logout.addEventListener("click", () => {
                    localStorage.removeItem("token");
                    console.log(utilisateurConnecter);
                })
            
        } else {
            console.log("pas de token");
        };


