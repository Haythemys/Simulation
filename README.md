Explication détaillée des fonctions et choix

PHP : Initialisation des paramètres

PHP lit le fichier de configuration config.json, ce qui permet de rendre les paramètres modifiables sans toucher au code.
La grille est initialisée en PHP, et les positions initiales en feu sont mises à jour. Cela simplifie le code JavaScript en s’assurant que l’état initial de la grille est directement fourni au front-end.


JavaScript : Visualisation et Simulation

initialize : Cette fonction charge la grille initiale et la probabilité de propagation depuis le backend (PHP). Cela assure que la simulation commence avec les paramètres souhaités.

drawGrid : Fonction responsable de l'affichage de la grille en temps réel. En redessinant l’ensemble de la grille à chaque étape, on visualise l’avancée de la propagation.

propagateFire : Cœur de la simulation, cette fonction parcourt la grille pour appliquer les règles de propagation. Une copie (newGrid) est utilisée pour éviter de modifier l’état actuel en milieu de calcul. La probabilité de propagation est simulée avec Math.random(), et chaque case adjacente est vérifiée.

startSimulation : Lance la simulation en appelant propagateFire, initiant le processus de propagation.