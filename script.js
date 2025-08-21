// Variables globales
let currentOrder = [];
let currentSandwich = [];
let money = 0;
const moneyGoal = 40;
let currentLevel = 1;
let soundEnabled = true;
let musicInitialized = false;

         // Éléments audio
        const musicSandwich = document.getElementById("music-sandwich");
        const soundToggle = document.querySelector(".sound-toggle");
        const cashSound = document.getElementById("cash-sound");



        // Fonction pour initialiser la musique après une interaction utilisateur
        function initializeMusic() {
            if (!musicInitialized) {
                musicSandwich.volume = 0.7;
                musicSandwich.play().catch(e => {
                    console.log("La lecture automatique a été bloquée:", e);
                });
                musicInitialized = true;
            }
        }

        // Toggle son ON/OFF
        soundToggle.addEventListener("click", () => {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                musicSandwich.play();
                soundToggle.textContent = "🔊";
            } else {
                musicSandwich.pause();
                soundToggle.textContent = "🔇";
            }
        });

        // Au chargement de la page
        document.addEventListener('DOMContentLoaded', function() {
            // Écran d'accueil -> Intro (déclencheur pour la musique)
            document.querySelector('.start-button').addEventListener('click', function() {
                initializeMusic(); // Initialiser la musique au premier clic
                document.querySelector('.welcome-screen').classList.add('hidden');
                document.querySelector('.intro-screen').classList.remove('hidden');
            });

            // Intro -> Jeu
            document.querySelector('.intro-screen .start-button').addEventListener('click', function() {
                document.querySelector('.intro-screen').classList.add('hidden');
                document.querySelector('.main-game-screen').classList.remove('hidden');
                initGame();
            });
        });

const intermissionVideos = {
  1: "https://github.com/BambieStudio/ASSETS-Divers---projets-code-/raw/refs/heads/main/sunsetSandwiches/niveau2.mp4",
  2: "https://github.com/BambieStudio/ASSETS-Divers---projets-code-/raw/refs/heads/main/sunsetSandwiches/niveau3.mp4",
  3: "https://github.com/BambieStudio/ASSETS-Divers---projets-code-/raw/refs/heads/main/sunsetSandwiches/niveau4.mp4"
};
// Liste des ingrédients possibles par niveau
const ingredientsByLevel = {
  1: ['bread-bottom', 'ketchup', 'mayo', 'ham', 'cheese', 'tomato', 'salad', 'bread-top'],
  2: ['bread-bottom', 'ketchup', 'mayo', 'ham', 'veggie', 'cheese', 'tomato', 'mushrooms', 'cucumber', 'salad', 'bread-top'],
  3: ['bread-bottom', 'ketchup', 'mayo', 'ham', 'veggie', 'bacon', 'cheese', 'tomato', 'mushrooms', 'egg', 'cucumber', 'pepper', 'salad', 'bread-top']
};

const customers = [ 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(1).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(2).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(3).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(4).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(5).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(6).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(7).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(8).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(9).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(10).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(21).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(12).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(13).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(14).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(15).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(16).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(17).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(18).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(19).webp',
                   'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/client%20(20).webp'
                   
];

let currentCustomerIndex = 0;

// Éléments DOM (on les déclare mais on les initialisera dans initGame)
let plate, serveButton, moneyCounter, resetButton, orderText;


//changezr les fond en fonction des niveau 
function updateBackground() {
    document.body.classList.remove('level-1', 'level-2', 'level-3');
    document.body.classList.add(`level-${currentLevel}`);
}


// Fonction d'initialisation du jeu
function initGame() {
    // Initialiser les éléments DOM
    plate = document.getElementById('sandwich-building-area');
    changeCustomer()
    updateBackground();

    // Changer le fond d’écran
    document.body.classList.add('main-background');
    document.body.classList.remove('welcome-background');

    serveButton = document.querySelector('.serve-button');
    moneyCounter = document.getElementById('money-counter');
    resetButton = document.querySelector('.reset-button');
    orderText = document.getElementById('order-text');
    
    setupIngredientDrag();
    filterIngredientsByLevel();
    generateNewOrder();
    updateMoneyDisplay();

    // Ajouter les événements
    serveButton.addEventListener('click', serveSandwich);
    resetButton.addEventListener('click', resetSandwich);
}

// dialogue de bienvenue avec Mario 
const dialogues = [
  { text: "Salut mon petit! Bienvenue chez  Sunset Sandwiches.", img: "https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/mario_superheureux.webp" },
  { text: "Les clients ont faim, aide-moi à préparer leurs commandes!", img: "https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/mario_sourit.webp" },
  { text: "Ton objectif est de gagner assez de pièces pour m'aider à rénover l'échope !", img: "https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/mario_superheureux.webp" }
];

let currentDialogue = 0;
const textEl = document.getElementById('dialogue-text');
const marioEl = document.getElementById('mario-img');
const nextBtn = document.getElementById('next-button');
const startBtn = document.querySelector('.intro-screen .start-button');


//effet de type writting 
let isTyping = false;

function typeWriter(text, element = textEl, i = 0) {
  if (i === 0) isTyping = true;
  if (i < text.length) {
    element.textContent += text.charAt(i);
    setTimeout(() => typeWriter(text, element, i + 1), 20);
  } else {
    isTyping = false;
  }
}

function showDialogue(index) {
  if (isTyping) return;
  textEl.textContent = '';
  marioEl.src = dialogues[index].img;
  typeWriter(dialogues[index].text);
}

nextBtn.addEventListener('click', () => {
  currentDialogue++;
  if (currentDialogue < dialogues.length - 1) {
    showDialogue(currentDialogue);
  } else if (currentDialogue === dialogues.length - 1) {
    showDialogue(currentDialogue);
    nextBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
  }
});

// Lancer le premier dialogue
showDialogue(currentDialogue);


// Configuration du drag & drop - CORRIGÉ
function setupIngredientDrag() {
    const ingredients = document.querySelectorAll('.ingredient');
    
    ingredients.forEach(ingredient => {
        // Supprimer les anciens écouteurs pour éviter les doublons
        ingredient.replaceWith(ingredient.cloneNode(true));
    });
    
    // Référencer à nouveau les éléments après le clone
    const newIngredients = document.querySelectorAll('.ingredient');
    
    newIngredients.forEach(ingredient => {
        ingredient.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            addIngredientToSandwich(type);
        });
    }); 
}

// Masquer ou afficher les ingrédients selon le niveau actuel
function filterIngredientsByLevel() {
  const allowed = ingredientsByLevel[currentLevel];
  document.querySelectorAll('.ingredient').forEach(ing => {
    const type = ing.getAttribute('data-type');
    if (allowed.includes(type)) {
      ing.style.display = 'flex'; // visible
    } else {
      ing.style.display = 'none'; // masqué
    }
  });
  highlightNewIngredients();
}

// Ajouter un ingrédient au sandwich
function addIngredientToSandwich(type) {
    currentSandwich.push(type);
    updateSandwichVisual();
    
    // Animation de l'ingrédient
    const ingredientElement = document.querySelector(`[data-type="${type}"]`);
    ingredientElement.style.transform = 'scale(0.9)';
    setTimeout(() => {
        ingredientElement.style.transform = 'scale(1)';
    }, 100);
}

// Mettre à jour l'affichage du sandwich - CORRIGÉ
function updateSandwichVisual() {
    plate.innerHTML = '';
    
    
    // Empiler les ingrédients du bas vers le haut
    currentSandwich.forEach((ingredient, index) => {
        const img = document.createElement('img');
        img.src = getIngredientImage(ingredient);
        img.className = 'sandwich-layer';
        img.style.position = 'absolute';
        img.style.width = '85%';
        img.style.height = 'auto';
        img.style.zIndex = index + 1;
        
        // POSITIONNEMENT CORRECT :
        const baseOffset = -4; // Position de base (bas de l'assiette)
        const layerSpacing = 9; // Espacement entre les couches
        
        // Calcul de la position Y (plus l'index est grand, plus on monte)
        const offsetY = baseOffset + (index * layerSpacing);
        
        // Appliquer le positionnement
        img.style.bottom = `${offsetY}px`;
        img.style.left = '50%';
        img.style.transform = 'translateX(-50%)';
        
        plate.appendChild(img);
    });
}

// Obtenir l'image d'un ingrédient
function getIngredientImage(type) {
    const ingredientMap = {
        'bread-bottom': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_bunBottom.webp',
        'mayo': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_mayo.webp',
        'ketchup': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_ketchup.webp',
        'ham': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_jambon.webp',
        'bacon': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_bacon.webp',
        'veggie': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_vege.webp',
        'cheese': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_fromage.webp',
        'tomato': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_tomate.webp',
        'salad': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_salade.webp',
        'mushrooms': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_champi.webp',
        'cucumber': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_concombre.webp',
        'pepper': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_poivron.webp',
        'egg': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_oeuf.webp',
        'bread-top': 'https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/sand_bunTop.webp'
    };
    
    return ingredientMap[type] || '';
}

// Générer une nouvelle commande cohérente avec le niveau
function generateNewOrder() {
  const available = ingredientsByLevel[currentLevel];

  // On retire les pains pour composer la garniture
  const middle = available.filter(ing => ing !== 'bread-bottom' && ing !== 'bread-top');

  // Déterminer le nombre d’ingrédients selon le niveau
  let nbMiddle;
  if (currentLevel === 1) nbMiddle = 3;
  else if (currentLevel === 2) nbMiddle = 4;
  else if (currentLevel === 3) nbMiddle = 5;

  const randomMiddle = [];
  const middleCopy = [...middle]; // copie pour retirer les ingrédients déjà choisis

  for (let i = 0; i < nbMiddle; i++) {
    if (middleCopy.length === 0) break; // sécurité
    const index = Math.floor(Math.random() * middleCopy.length);
    randomMiddle.push(middleCopy[index]);
    middleCopy.splice(index, 1); // on retire pour éviter les doublons
  }

  currentOrder = ['bread-bottom', ...randomMiddle, 'bread-top'];

  // Afficher la commande texte
  const orderTextEl = document.querySelector('.order-bubble span:last-child');
  orderTextEl.textContent = currentOrder.map(ing => getIngredientName(ing)).join(' + ');
}

// Calculer les gains
function calculateEarnings(score) {
    if (score === 1) return 15;
    if (score >= 0.8) return 10;
    if (score >= 0.5) return 5;
    return 0;
}

// Mettre à jour l'affichage de l'argent
function updateMoneyDisplay(gain = 0) {
    moneyCounter.textContent = money;

    if (gain > 0) {
        const display = document.querySelector('.money-display');
        display.classList.add('money-glow');

        // Supprime la classe après l'animation pour pouvoir la rejouer
        setTimeout(() => display.classList.remove('money-glow'), 800);
    }

    if (money >= moneyGoal) showLevelComplete();
}



function changeCustomer() {
    let newIndex;
    // Évite d'avoir le même client deux fois de suite
    do {
        newIndex = Math.floor(Math.random() * customers.length);
    } while (newIndex === currentCustomerIndex && customers.length > 1);
    
    currentCustomerIndex = newIndex;
    document.getElementById("customer-image").src = customers[currentCustomerIndex];
    generateNewOrder();
}

// Servir le sandwich
function serveSandwich() {
    if (currentSandwich.length === 0) {
        showMessage('Le sandwich est vide!', 'error');
        return;
    }
    
    const score = checkOrder();
    const earnings = calculateEarnings(score);
    
    money += earnings;
    updateMoneyDisplay(earnings);
    //son quand cash augmente 
if (soundEnabled && cashSound) {
  cashSound.currentTime = 0; // remet au début
  cashSound.play();
}
    showCustomerReaction(score, earnings);
    
    // Réinitialiser pour la prochaine commande
    setTimeout(() => {
        currentSandwich = [];
        updateSandwichVisual();
        generateNewOrder();
              changeCustomer();
    }, 2000);
}

// Vérifier la commande
function checkOrder() {
    if (currentSandwich.length !== currentOrder.length) {
        return 0;
    }

    let correct = 0;
    for (let i = 0; i < currentOrder.length; i++) {
        if (currentSandwich[i] === currentOrder[i]) {
            correct++;
        }
    }


    return correct / currentOrder.length; 
}

function floatEmojis(parent, emoji, count = 7) {
    for (let i = 0; i < count; i++) {
        const el = document.createElement('span');
        el.textContent = emoji;
        el.style.position = 'absolute';
        el.style.left = '50%';
        el.style.top = '50%'; // 🔥 départ plus bas
        el.style.fontSize = `${Math.random() * 24 + 20}px`;
        el.style.transform = `translateX(-50%) rotate(${Math.random()*360}deg)`;
        el.style.opacity = 1;
        el.style.zIndex = 10; // au-dessus de tout
        parent.appendChild(el);

        // Animation
        const dx = (Math.random() - 0.5) * 200; // plus large dispersion horizontale
        const dy = - (Math.random() * 200 + 100); // monte plus haut
        const dr = (Math.random() - 0.5) * 720; // rotation aléatoire
        el.animate([
            { transform: `translateX(-70%) translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateX(${dx}px) translateY(${dy}px) rotate(${dr}deg)`, opacity: 0 }
        ], {
            duration: 1500 + Math.random()*500,
            easing: 'ease-out',
          fill: 'forwards' 
        });

        setTimeout(() => el.remove(), 2500);
    }
}

function showCustomerReaction(earnings) {
    const emojiEl = document.getElementById('customer-emoji');

    // Choix de l'emoji
    const emoji = earnings > 0 ? '😍' : '😠';

    // On fait flotter plusieurs emojis
    floatEmojis(emojiEl, emoji, 7);
}

// Helper functions
function getIngredientName(type) {
    const names = {
        'bread-bottom': 'Pain',
        'bread-top': 'Pain',
        'mayo': 'Mayo',
        'ketchup': 'Ketchup',
        'ham': 'Jambon',
        'bacon': 'Bacon',
        'veggie': 'Végétarien',
        'cheese': 'Fromage',
        'tomato': 'Tomate',
        'salad': 'Salade',
        'mushrooms': 'Champignons',
        'cucumber': 'Concombre',
        'pepper': 'Poivron',
        'egg': 'Œuf'
    };
    return names[type] || type;
}

function showMessage(text, type) {
    console.log(`${type}: ${text}`);
}

//montrer la rénovation entre chaque niveau 
function showIntermission() {
  const interScreen = document.querySelector('.intermission-screen');
  const videoEl = interScreen.querySelector('.intermission-video');
  interScreen.classList.remove('hidden');

  // Définir la vidéo selon le niveau
  videoEl.src = intermissionVideos[currentLevel] || "";
  videoEl.currentTime = 0;
  videoEl.play();

  interScreen.querySelector('.continue-button').onclick = () => {
    interScreen.classList.add('hidden');
    nextLevel();
  };
}

//persaonnaliser message a chaque niveaux 
function getCongratsContent(level) {
  const baseImgUrl = "https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/";
  let content = `<h2>Niveau Réussi!</h2>`;

  if (level === 1) {
    content += `<img src="${baseImgUrl}toque.webp" alt="Toque" class="congrats-img">`;
  } else if (level === 2) {
    // Ajouter la classe congrats-img à chaque image
    content += `<img src="${baseImgUrl}toque.webp" alt="Toque" class="congrats-img">`.repeat(2);
  } else if (level === 3) {
    content = `<img src="${baseImgUrl}coupe.webp" alt="Coupe" class="congrats-img">` + content;
    // Ajouter la classe congrats-img à chaque image
    content += `<img src="${baseImgUrl}toque.webp" alt="Toque" class="congrats-img">`.repeat(3);
  }

  return content;
}

//illuminer nouveau ingrédients aux nouveaux niveaux 
function highlightNewIngredients() {
  const allowed = ingredientsByLevel[currentLevel];
  const previousLevel = currentLevel - 1;
  const previousAllowed = previousLevel > 0 ? ingredientsByLevel[previousLevel] : [];
  
  const newIngredients = allowed.filter(ing => !previousAllowed.includes(ing));
  
  newIngredients.forEach(type => {
    const ingredientEl = document.querySelector(`[data-type="${type}"]`);
    if (ingredientEl) {
      ingredientEl.classList.add('money-glow');
      
      setTimeout(() => {
        ingredientEl.classList.remove('money-glow');
      }, 1000);
    }
  });
}

//niveau suivant
function nextLevel() {
  currentLevel++;
  money = 0;
  updateMoneyDisplay();

  if (currentLevel > 3) {
    showEndScreen(); 
  } else {
    initGame(); // relance un niveau normal
    document.querySelector('.main-game-screen').classList.remove('hidden');
  }
}

function showLevelComplete() {
  document.querySelector('.level-complete-screen').classList.remove('hidden');

  // Injecter le contenu personnalisé selon le niveau
  document.getElementById("congrats-title").innerHTML = getCongratsContent(currentLevel);

  // Quand on clique “Niveau Suivant” → bascule vers l’écran intermission
  document.querySelector('.next-level-button').onclick = () => {
    document.querySelector('.level-complete-screen').classList.add('hidden');
    showIntermission();
  };
}


// Fonction pour recommencer le sandwich
function resetSandwich() {
    currentSandwich = [];
    updateSandwichVisual();
    showMessage('Sandwich réinitialisé!', 'info');
}

// Gestion de la navigation entre les écrans
document.addEventListener('DOMContentLoaded', function() {
document.querySelector('.start-button').addEventListener('click', function() {
    document.querySelector('.welcome-screen').classList.add('hidden');
    document.querySelector('.intro-screen').classList.remove('hidden');
});

    document.querySelector('.intro-screen .start-button').addEventListener('click', function() {
        document.querySelector('.intro-screen').classList.add('hidden');
        document.querySelector('.main-game-screen').classList.remove('hidden');
        initGame();
    });
  }); 

// écran  de fin ----------------------------------------------------------------------
function showEndScreen(){
  const endScreen = document.querySelector('.end-screen');
  const endText = document.getElementById('end-text');
  const endNextBtn = document.getElementById('end-next-button');
  const endReplayBtn = document.getElementById('end-replay-btn');
  const endMarioImg = document.getElementById('end-mario-img');

  endScreen.classList.remove('hidden');

  let currentEndDialogue = 0;
  const endDialogues = [
    { text: "Merci pour ton aide ! La boutique a fière allure ❤️", img: "https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/mario_surpris.webp" },
    { text: "Reviens l'été prochain ! Tu es toujours le bienvenu chez Sunset Sandwiches, mon petit.", img: "https://raw.githubusercontent.com/BambieStudio/ASSETS-Divers---projets-code-/refs/heads/main/sunsetSandwiches/mario_superheureux.webp" }
  ];

  function showEndDialogue(index) {
    if (isTyping) return;
    endText.textContent = '';
    endMarioImg.src = endDialogues[index].img;
    typeWriter(endDialogues[index].text, endText);
  }

  endNextBtn.addEventListener('click', () => {
    currentEndDialogue++;
    if (currentEndDialogue < endDialogues.length) {
      showEndDialogue(currentEndDialogue);
    } else if (currentEndDialogue === endDialogues.length) {
      endNextBtn.classList.add('hidden');
      endReplayBtn.classList.remove('hidden');
    }
  });

  endReplayBtn.addEventListener('click', () => {
    location.reload();
  });

  // Lancer le premier dialogue
  showEndDialogue(currentEndDialogue);
}
