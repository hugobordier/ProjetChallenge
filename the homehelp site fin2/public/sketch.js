let myPort; //Variable pour la communication série (commentée, non utilisée dans le code actuel).
let startTimer; //Objet Timer pour gérer le temps.
let resetbutton; //Objet Button pour le bouton de réinitialisation.

let appuye = false;
let bouton2 = false;
let bouton3 = false;
let bouton4 = false;
let essai = 0;
let lapse = 0;
let Mesure = 0;

let myText = ""; //Chaîne de caractères pour le texte reçu depuis la communication série.
let myVal = 0;
let Valeur;
let coin = 20;
let DEP = 600; //Valeur de référence pour calculer la jauge.
//Dimensions de la jauge
let h_barre = 500;
let l_barre = 150;

let hauteur;
let largeur;
let echelle = (h_barre - coin) / 1.1;
//Valeurs pour définir les zones de couleur dans la jauge
let z_verte = 0.8;
let z_orange = 0.5;
//Marges et dimensions utilisées dans le dessin.
let bord = 30;
let bord_l = bord + 10;
let bord_h = 310;
//Dimensions du graphique.
let hauteur_g = 900;
let largeur_g = 900;
let Maximum = 0;
let MaxEnregistre = 0;
let souffleValues; //Tableau pour stocker les valeurs du souffle.
let maxValue = 0; //Valeur maximale enregistrée dans le graphique.
let time = 0; //Temps écoulé.
let xOffset = 0;
let scaleFactor; //Facteur d'échelle basé sur les dimensions de la fenêtre.
let taille;
let compte = 20;

let colors; //Tableau des couleurs utilisées dans le graphique.

function preload() {
    // Load any external resources here
    // myFont = loadFont('Bahnschrift.ttf'); // Uncomment and use if necessary
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    hauteur = height;
    largeur = width;
    taille = width;
    souffleValues = new Array(taille).fill(0);
    colors = [color(0, 0, 255), color(0, 255, 0), color(255, 255, 0), color(255, 0, 0)];
    background(245, 245, 245);
    textSize(30);
    // textFont(myFont); // Uncomment if font is loaded

    // Serial port initialization (Replace with appropriate p5.serialport usage if needed)
    // myPort = new p5.SerialPort();
    // myPort.list();
    // myPort.open("COM5", { baudrate: 115200 });
    // myPort.on('data', serialEvent);

    // Calcul du facteur d'échelle
    let scaleX = windowWidth / 1920;
    let scaleY = windowHeight / 1080;
    let scaleFactor = min(scaleX, scaleY);

    // Ajustement des dimensions en fonction du facteur d'échelle
    let boutonLargeur = 400 * scaleFactor; // Réduire la largeur du bouton à 300 pixels ajustés par le facteur d'échelle
    let boutonHauteur = 100 * scaleFactor; // Réduire la hauteur du bouton à 100 pixels ajustés par le facteur d'échelle

    // Création du bouton avec les nouvelles dimensions
    resetbutton = new Button(460 * scaleFactor, 200 * scaleFactor, boutonLargeur, boutonHauteur, "COMMENCER LA TENTATIVE", 100, 200, 200); // Adjusted y position

    // Initialize button and timer
    startTimer = new Timer(compte, 0);

    frameRate(10);
}


function draw() {
    // Calculer le facteur d'échelle
    let scaleX = windowWidth / 1920;
    let scaleY = windowHeight / 1080;
    let scaleFactor = min(scaleX, scaleY);
    
    // Ajuster les dimensions selon le facteur d'échelle
    let coin_scaled = coin * scaleFactor;
    let bord_scaled = bord * scaleFactor;
    let bord_l_scaled = bord_l * scaleFactor;
    let bord_h_scaled = bord_h * scaleFactor;
    let h_barre_scaled = h_barre * scaleFactor;
    let l_barre_scaled = l_barre * scaleFactor;
    let echelle_scaled = echelle * scaleFactor;
    let hauteur_g_scaled = (height - 400) * scaleFactor;
    let largeur_g_scaled = (width / 2 - bord) * scaleFactor;

    // Drawing code
    background(245, 245, 245);
    let x_graph = (width / 2) + 2 * coin_scaled;
    let y_graph = 200; // Adjusted y position
    hauteur_g = height - 400;
    largeur_g = (width / 2) - bord;

    // Titre
    fill('#2D9EDB');
    textSize(70 * scaleFactor);
    textAlign(CENTER, TOP);
    text("TEST D'INTENSITE DE FLUX", width / 2, 50 * scaleFactor);

    // Rectangles de fond
    stroke(30, 30, 60);
    fill(30, 30, 60);
    rect(bord_scaled, 200 * scaleFactor, (width / 2) - 2 * bord_scaled, height - 400 * scaleFactor, coin_scaled, coin_scaled, coin_scaled, coin_scaled); // Adjusted y position

    // Bannière
    stroke(210, 220, 230);
    fill(210, 220, 230);
    rect(0, height - 150 * scaleFactor, width, 150 * scaleFactor, 0);

    // Jauge
    myVal = parseFloat(myText);
    Valeur = parseFloat(myText);
    myVal = (myVal / DEP) * ((h_barre_scaled - coin_scaled) / 1.1);

    // Zones de couleur
    stroke(0);
    fill('#2DDB32');
    rect(bord_l_scaled, hauteur - (h_barre_scaled + bord_h_scaled), l_barre_scaled, echelle_scaled * (1.1 - z_verte), coin_scaled, coin_scaled, 0, 0);
    fill('#FFA433');
    rect(bord_l_scaled, hauteur - (echelle_scaled * z_verte + bord_h_scaled + coin_scaled), l_barre_scaled, echelle_scaled * (z_verte - z_orange), 0);
    fill('#F14032');
    rect(bord_l_scaled, hauteur - (echelle_scaled * z_orange + bord_h_scaled + coin_scaled), l_barre_scaled, echelle_scaled * z_orange + coin_scaled, 0, 0, coin_scaled, coin_scaled);

    // Lignes de séparation
    stroke('#2DDB32');
    line(bord_l_scaled + 1, hauteur - (echelle_scaled * z_verte + bord_h_scaled + coin_scaled), bord_l_scaled + l_barre_scaled - 1, hauteur - (echelle_scaled * z_verte + bord_h_scaled + coin_scaled));
    stroke('#FFA433');
    line(bord_l_scaled + 1, hauteur - (echelle_scaled * z_orange + bord_h_scaled + coin_scaled), bord_l_scaled + l_barre_scaled - 1, hauteur - (echelle_scaled * z_orange + bord_h_scaled + coin_scaled));
    stroke(250, 250, 250);
    line(bord_l_scaled + 1, hauteur - (echelle_scaled + bord_h_scaled + coin_scaled), bord_l_scaled + l_barre_scaled - 1, hauteur - (echelle_scaled + bord_h_scaled + coin_scaled));

    // Texte des jauges
    fill(250);
    textSize(40 * scaleFactor);
    textAlign(LEFT, CENTER);
    text(int(z_verte * 100) + "% du DEP", bord_l_scaled + l_barre_scaled - 1 + 130 * scaleFactor, hauteur - 5 - (echelle_scaled * z_verte + bord_h_scaled + coin_scaled));
    text(int(z_orange * 100) + "% du DEP", bord_l_scaled + l_barre_scaled - 1 + 130 * scaleFactor, hauteur - 5 - (echelle_scaled * z_orange + bord_h_scaled + coin_scaled));
    text("100% du DEP", bord_l_scaled + l_barre_scaled - 1 + 140 * scaleFactor, hauteur - 5 - (echelle_scaled + bord_h_scaled + coin_scaled));

    // Jauge actuelle
    fill(200, 220, 250);
    rect(bord_l_scaled, hauteur - (myVal + bord_h_scaled + coin_scaled), l_barre_scaled, myVal + coin_scaled, coin_scaled);

    // Affichage de la valeur
    fill(250);
    textSize(50 * scaleFactor);
    text("Flux en L/min : " + int(Valeur), (width / 2) - 2 * (bord_l_scaled + l_barre_scaled - coin_scaled - 20), 725 * scaleFactor); // Adjusted y position

    // Conditions des zones
    textSize(70 * scaleFactor); // Taille de texte réduite
    textAlign(CENTER, CENTER); // Centrage horizontal et vertical
    let textY = height - 400 * scaleFactor; // Ajustement de la position verticale vers le bas

    if (myVal > echelle_scaled * z_verte) {
        fill('#2DDB32');
        text("Bravo !", width / 2, height - 230 * scaleFactor);
    } else if (myVal > echelle_scaled * z_orange) {
        fill('#FFA433');
        text("Presque !", width / 2, height - 230 * scaleFactor);
    } else {
        fill('#F14032');
        text("Soufflez !", width / 2, height - 230 * scaleFactor);
    }

    // Programme pour le graphe
    fill(30, 30, 60);
    rect((width / 2) + bord_scaled, 200 * scaleFactor, (width / 2) - 2 * bord_scaled, height - 400 * scaleFactor, coin_scaled, coin_scaled, coin_scaled, coin_scaled); // Adjusted y position

    fill(250);
    stroke(255);
    strokeWeight(1 * scaleFactor);
    line(x_graph + 100 * scaleFactor, y_graph + hauteur_g_scaled - 100 * scaleFactor, x_graph + largeur_g_scaled - 100 * scaleFactor, y_graph + hauteur_g_scaled - 100 * scaleFactor);
    line(x_graph + 100 * scaleFactor, y_graph + hauteur_g_scaled - 100 * scaleFactor, x_graph + 100 * scaleFactor, y_graph + 100 * scaleFactor);

    // Unités des axes
    textSize(25 * scaleFactor);
    text("Temps (s)", x_graph + largeur_g_scaled - 100 * scaleFactor, y_graph + hauteur_g_scaled - 100 * scaleFactor + 40 * scaleFactor);
    text("Flux (L/min)", x_graph + 100 * scaleFactor, y_graph + 100 * scaleFactor - 40 * scaleFactor);

    // Quadrillage pointillé
    stroke(240);
    for (let i = 0; i <= 10; i++) {
        let y = map(i, 0, 10, hauteur_g_scaled - 100 * scaleFactor, 100 * scaleFactor);
        drawDottedLine(x_graph + 100 * scaleFactor, y_graph + y, x_graph + largeur_g_scaled - 100 * scaleFactor, y_graph + y);
    }
    for (let i = 0; i <= 10; i++) {
        let x = map(i, 0, 10, 100 * scaleFactor, largeur_g_scaled - 100 * scaleFactor);
        drawDottedLine(x_graph + x, y_graph + hauteur_g_scaled - 100 * scaleFactor, x_graph + x, y_graph + 100 * scaleFactor);
    }

    // Graphe des valeurs
    if (startTimer.timeLeft() > 0) {
        souffleValues[time] = Valeur;
        maxValue = Math.max(maxValue, Valeur);
        time++;
    }

    stroke(colors[0]);
    noFill();
    beginShape();
    for (let i = 0; i < souffleValues.length; i++) {
        let x = map(i, 0, souffleValues.length - 1, x_graph + 100 * scaleFactor, x_graph + largeur_g_scaled - 100 * scaleFactor);
        let y = map(souffleValues[i], 0, DEP, y_graph + hauteur_g_scaled - 100 * scaleFactor, y_graph + 100 * scaleFactor);
        vertex(x, y);
    }
    endShape();

    // Texte du temps restant
    fill(30, 30, 60);
    textAlign(CENTER);
    textSize(70 * scaleFactor);
    text(startTimer.timeLeft(), width / 2, height - 110 * scaleFactor);

    // Affichage du bouton
    resetbutton.display(scaleFactor);
}

function drawDottedLine(x1, y1, x2, y2) {
    let dashLength = 5;
    let gapLength = 5;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let dashes = dist(x1, y1, x2, y2) / (dashLength + gapLength);
    let dashX = dx / dashes;
    let dashY = dy / dashes;

    for (let i = 0; i < dashes; i++) {
        line(x1, y1, x1 + dashX, y1 + dashY);
        x1 += dashX + gapLength;
        y1 += dashY + gapLength;
    }
}

class Button {
    constructor(x, y, w, h, label, r, g, b) {
        this.x = x; // Position x (peut être ajustée pour le centrage horizontal)
        this.y = y; // Position y (peut être ajustée pour le centrage vertical)
        this.w = w; // Largeur du bouton
        this.h = h; // Hauteur du bouton
        this.label = label; // Texte du bouton
        this.r = r; // Couleur rouge du bouton
        this.g = g; // Couleur verte du bouton
        this.b = b; // Couleur bleue du bouton
    }

    display(scaleFactor) {
        fill(this.r, this.g, this.b);
        //position
        rect(this.x * scaleFactor, this.y * scaleFactor, this.w * scaleFactor, this.h * scaleFactor, 20 * scaleFactor);
        fill(0);
        textSize(20 * scaleFactor);
        textAlign(CENTER, CENTER);
        text(this.label, this.x * scaleFactor + this.w * scaleFactor / 2, this.y * scaleFactor + this.h * scaleFactor / 2);
    }

    isPressed() {
        return (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h && mouseIsPressed);
    }
}

class Timer {
    constructor(seconds, initialTime) {
        this.totalTime = seconds;
        this.startTime = millis() + initialTime * 1000;
    }

    timeLeft() {
        let elapsed = millis() - this.startTime;
        return Math.max(this.totalTime - int(elapsed / 1000), 0);
    }

    reset() {
        this.startTime = millis();
    }
}

function serialEvent() {
    myText = myPort.readStringUntil('\n');
    if (myText) {
        myText = myText.trim();
    }
}

function mousePressed() {
    if (resetbutton.isPressed()) {
        startTimer.reset();
        souffleValues.fill(0);
        time = 0;
        maxValue = 0;
    }
}
