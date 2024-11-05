let grid = []; // Tableau 2D représentant la grille de la forêt
let spreadProbability; // Probabilité de propagation du feu (définie par le fichier de configuration JSON)

// Fonction pour initialiser la simulation en récupérant les données de configuration depuis le serveur
async function initialize() {
    // Effectuer une requête vers le fichier PHP pour obtenir l'état initial de la grille
    const response = await fetch("initialize.php");
    const data = await response.json(); // Décoder la réponse JSON

    // Stocker la grille et la probabilité de propagation dans les variables globales
    grid = data.grid;
    spreadProbability = data.spread_probability;

    // Afficher la grille initiale
    drawGrid();
}

// Fonction pour afficher la grille de la forêt dans le conteneur HTML
function drawGrid() {
    const forest = document.getElementById("forest");
    forest.innerHTML = ""; // Effacer l'ancien contenu avant d'afficher le nouvel état

    // Parcourir chaque cellule de la grille et créer un élément HTML correspondant
    grid.forEach(row => {
        row.forEach(cell => {
            const div = document.createElement("div"); // Créer un div pour chaque cellule
            div.className = `cell ${cell}`; // Assigner une classe correspondant à l'état (empty, fire, ou ash)
            forest.appendChild(div); // Ajouter la cellule au conteneur "forest"
        });
    });
}

// Fonction pour gérer la propagation du feu d'une étape à l'autre
function propagateFire() {
    // Créer une copie de la grille pour stocker l'état à la prochaine étape
    let newGrid = grid.map(row => row.slice()); // map avec slice pour faire une copie profonde

    // Parcourir chaque cellule de la grille
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            // Si la cellule est en feu, elle devient cendre à l'étape suivante
            if (grid[i][j] === "fire") {
                newGrid[i][j] = "ash";

                // Liste des coordonnées de déplacement vers les cases adjacentes (haut, droite, bas, gauche)
                [[0, 1], [1, 0], [0, -1], [-1, 0]].forEach(([di, dj]) => {
                    const ni = i + di, nj = j + dj; // Calculer les coordonnées de la case adjacente

                    // Vérifier que la case adjacente est dans la grille et qu'elle est vide
                    if (ni >= 0 && ni < grid.length && nj >= 0 && nj < grid[i].length && newGrid[ni][nj] === "empty") {
                        // Propager le feu selon la probabilité de propagation
                        if (Math.random() < spreadProbability) {
                            newGrid[ni][nj] = "fire"; // La case adjacente prend feu
                        }
                    }
                });
            }
        }
    }

    // Mettre à jour la grille avec le nouvel état pour cette étape
    grid = newGrid;
    drawGrid(); // Rafraîchir l'affichage de la grille

    // Si au moins une case est encore en feu, continuer la simulation avec un léger délai
    if (grid.flat().includes("fire")) {
        setTimeout(propagateFire, 500); // Délai de 500 ms entre chaque étape
    }
}

// Fonction pour démarrer la simulation quand l'utilisateur clique sur le bouton
function startSimulation() {
    propagateFire(); // Appel initial pour lancer la simulation
}

// Appeler la fonction d'initialisation pour charger la configuration et afficher la grille initiale
initialize();
