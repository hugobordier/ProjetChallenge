let img;
let tableWidth = 600;
let tableHeight = 680;
let temps = [];

function preload() {
  img = loadImage('image_infrarouge.PNG');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  noLoop(); // Pour dessiner une fois et s'arrêter (pour l'affichage statique)
}

function draw() {
  background(176, 0, 100);

  // Dessiner le rectangle en haut avec le titre
  fill(136, 0, 99);
  rect(0, 0, width, 100 * (height / 1360));

  // Charger la police
  let police = loadFont("Calibri-Bold-48.vlw");
  textFont(police);
  fill(176, 98, 99);
  textSize(40 * (width / 1200));
  textAlign(CENTER, CENTER);
  text("Votre température :", width / 2, 50 * (height / 1360));

  // Afficher l'image
  image(img, 0, 600 * (height / 1360));

  // Remplir le tableau de températures avec des valeurs aléatoires pour l'exemple
  for (let i = 0; i < 64; i++) {
    temps[i] = random(0, 255); // Valeurs aléatoires pour les températures (à remplacer par vos données réelles)
  }

  // Dessiner les cases de température
  let xOffset = (width - tableWidth) / 2;
  let yOffset = (height - tableHeight) / 2;
  let x = xOffset;
  let y = yOffset;
  let index = 0;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let temperature = temps[index];
      fill(temperature, 100, 100);
      rect(x, y, tableWidth / 8, tableHeight / 8);

      // Afficher la valeur de température
      textAlign(CENTER, CENTER);
      textSize(11 * (width / 1200));
      fill(0);
      text(temperature.toFixed(2), x + (tableWidth / 16), y + (tableHeight / 16));

      // Afficher le numéro de chaque case
      textAlign(LEFT, LEFT);
      fill(100);
      text(index, x + 3 * (width / 1200), y + 12 * (height / 1360));

      x += tableWidth / 8;
      index++;
    }
    y += tableHeight / 8;
    x = xOffset;
  }

  // Afficher un message d'alerte si une température élevée est détectée
  let alert = false;
  for (let temp of temps) {
    if (temp >= 38.0) {
      alert = true;
      break;
    }
  }

  if (alert) {
    fill(0, 100, 90);
    textSize(50 * (width / 1200));
    textAlign(LEFT, CENTER);
    text("Attention !", xOffset + tableWidth + 50, yOffset + tableHeight / 2);
    text("Température", xOffset + tableWidth + 50, yOffset + tableHeight / 2 + 60);
    text("trop élevée", xOffset + tableWidth + 50, yOffset + tableHeight / 2 + 120);
  }
}
