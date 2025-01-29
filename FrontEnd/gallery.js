function afficherProjets(projets) {
    // On vide la galerie
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML = '';

    // Créer une boucle pour afficher tous les projets dans la galerie
    for (let i = 0; i < projets.length; i++) {
        const article = projets[i];
        const maFigure = document.createElement("figure");
        const imageProjet = document.createElement("img");
        imageProjet.src = article.imageUrl;
        const descriptionImage = document.createElement("figcaption");
        descriptionImage.innerText = article.title;

        maFigure.appendChild(imageProjet);
        maFigure.appendChild(descriptionImage);
        sectionGallery.appendChild(maFigure);
    }
}

async function menuCategorie() {
    // Récupérer les projets via l'API
    const reponse = await fetch('http://localhost:5678/api/works');
    const projets = await reponse.json();

    // Afficher tous les projets au début
    afficherProjets(projets);

    // Extraire les catégories et les rendre uniques avec Set
    const categorie = projets.map(projet => projet.category);
    const monSet = new Set(categorie.map(categorie => categorie.name));

    const navigation = document.querySelector(".navigation");

    // Bouton "Tous"
    const tousLesProjets = document.createElement("button");
    tousLesProjets.innerText = "Tous";
    tousLesProjets.addEventListener("click", function () {
        afficherProjets(projets);
    });

    navigation.appendChild(tousLesProjets);

    // Créer un bouton pour chaque catégorie
    monSet.forEach(function(categorie) {
        const choix = document.createElement("button");
        choix.innerText = categorie;
        navigation.appendChild(choix);

        // Ajouter un événement pour chaque bouton de catégorie
        choix.addEventListener("click", function () {
            const projetsObjet = projets.filter(function(projet) {
                return projet.category.name === choix.innerText;
            });

            afficherProjets(projetsObjet);
        });
    });
}

menuCategorie();