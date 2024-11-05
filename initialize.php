<?php
// Lire le fichier de configuration 'config.json' et le décoder en un tableau associatif
$config = json_decode(file_get_contents("config.json"), true);

// Extraire la hauteur, la largeur, les positions initiales en feu, et la probabilité de propagation du feu
$height = $config["height"];
$width = $config["width"];
$initial_fire_positions = $config["initial_fire_positions"];
$spread_probability = $config["spread_probability"];


// Créer une grille initiale vide de dimensions height x width, chaque cellule est "empty" (vide)
$grid = array_fill(0, $height, array_fill(0, $width, "empty"));

// Placer les cases en feu en fonction des positions spécifiées dans le fichier de configuration
foreach ($initial_fire_positions as $pos) {
    $grid[$pos[0]][$pos[1]] = "fire";
}

// Encoder l'état initial de la grille et la probabilité en JSON, pour que JavaScript puisse les utiliser
echo json_encode([
    "grid" => $grid,
    "spread_probability" => $spread_probability
]);
?>