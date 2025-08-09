// Game data with words for different subjects
const wordsBySubject = {
    accounting: [
        "ASSET", "LIABILITY", "EQUITY", "DEBIT", "CREDIT", "REVENUE",
        "EXPENSE", "JOURNAL", "LEDGER", "BALANCE", "ACCOUNT", "FINANCE",
        "BUDGET", "FISCAL", "AUDIT", "INCOME", "TAXES", "RECEIVABLE",
        "PAYABLE", "DEPRECIATION", "PROFIT", "LOSS"
    ],
    biology: [
        "CELL", "GENE", "DNA", "PROTEIN", "PHOTOSYNTHESIS", "ORGANISM",
        "ECOSYSTEM", "HEREDITY", "EVOLUTION", "MITOCHONDRIA", "CHLOROPLAST",
        "NUCLEUS", "BACTERIA", "VIRUS", "SPECIES", "BIOSPHERE",
        "RESPIRATION", "POPULATION", "MUTATION", "ENZYME", "CHROMOSOME"
    ],
    building: [
        "CONCRETE", "FOUNDATION", "SCAFFOLD", "PLUMBING", "CARPENTRY",
        "WIRING", "BRICKLAYING", "ROOFING", "MASONRY", "INSULATION",
        "PLANNING", "BLUEPRINT", "SQUARE", "LEVEL", "HAMMER", "NAIL",
        "GIRDER", "TRUSS", "DRYWALL", "DUCTWORK", "FAUCET", "GUTTER"
    ],
    chemistry: [
        "ELEMENT", "ATOM", "MOLECULE", "BONDING", "CATALYST", "SOLUTION",
        "REACTION", "COMPOUND", "ACID", "BASE", "ALKALINE", "PERIODIC",
        "NEUTRON", "PROTON", "ELECTRON", "ISOTOPE", "OXIDATION",
        "REDUCTION", "POLYMER", "SYNTHESIS", "VALENCE", "COMBUSTION"
    ],
    law: [
        "JUDGMENT", "STATUTE", "LAWYER", "COURT", "WITNESS", "JURY",
        "DEFENSE", "PROSECUTION", "EVIDENCE", "CONTRACT", "TORT",
        "CONSTITUTION", "LEGISLATION", "CRIMINAL", "CIVIL", "PLAINTIFF",
        "DEFENDANT", "APPEAL", "SENTENCE", "VERDICT", "SUBPOENA", "ALIBI"
    ],
    medicine: [
        "DIAGNOSIS", "SURGERY", "SYMPTOM", "THERAPY", "ANATOMY",
        "PHYSIOLOGY", "PHARMACY", "HOSPITAL", "DISEASE", "TREATMENT",
        "PATHOLOGY", "IMMUNITY", "VIRUS", "BACTERIA", "HEART", "BLOOD",
        "BRAIN", "PATIENT", "DOCTOR", "PRESCRIPTION", "ANTIBIOTIC", "VACCINE"
    ],
    physics: [
        "FORCE", "ENERGY", "VECTOR", "MASS", "GRAVITY", "VELOCITY",
        "ACCELERATION", "MOMENTUM", "WAVELENGTH", "FRICTION", "CIRCUIT",
        "VOLTAGE", "CURRENT", "MAGNETISM", "NUCLEAR", "THERMODYNAMICS",
        "PHOTON", "QUASAR", "QUANTUM", "RELATIVITY", "ENTROPY", "DENSITY"
    ],
    vetMed: [
        "VETERINARY", "ANIMAL", "ZOONOSIS", "DIAGNOSTIC", "SURGICAL",
        "EQUINE", "FELINE", "CANINE", "BOVINE", "AVIAN", "RADIOLOGY",
        "VACCINATION", "PARASITE", "TREATMENT", "SYMPTOM", "CLINIC",
        "PATIENT", "HEALTH", "INJECTION", "DISEASE", "ANESTHESIA", "SURGEON"
    ]
};

// Hangman image URLs
const hangmanImages = [
    "https://upload.wikimedia.org/wikipedia/commons/8/8b/Hangman-0.png",
    "https://upload.wikimedia.org/wikipedia/commons/3/30/Hangman-1.png",
    "https://upload.wikimedia.org/wikipedia/commons/7/70/Hangman-2.png",
    "https://upload.wikimedia.org/wikipedia/commons/9/97/Hangman-3.png",
    "https://upload.wikimedia.org/wikipedia/commons/2/27/Hangman-4.png",
    "https://upload.wikimedia.org/wikipedia/commons/6/6b/Hangman-5.png",
    "https://upload.wikimedia.org/wikipedia/commons/d/d6/Hangman-6.png"
];

// Game state
let gameState = {
    selectedWord: "",
    incorrectGuesses: 0,
    guessedLetters: [],
    maxIncorrectGuesses: 6,
    currentSubject: "",
    wins: 0,
    losses: 0,
    gameActive: false
};

// DOM elements
const elements = {
    hangmanImage: document.getElementById("hangman-image"),
    wordDisplay: document.getElementById("word-display"),
    lettersContainer: document.getElementById("letters-container"),
    winMessage: document.getElementById("win-message"),
    loseMessage: document.getElementById("lose-message"),
    winWord: document.getElementById("win-word"),
    loseWord: document.getElementById("lose-word"),
    winsCounter: document.getElementById("wins-counter"),
    lossesCounter: document.getElementById("losses-counter"),
    guessesCounter: document.getElementById("guesses-counter"),
    subjectSelector: document.getElementById("subject-selector"),
    playAgainBtn: document.getElementById("play-again-btn"),
    tryAgainBtn: document.getElementById("try-again-btn"),
    newSubjectBtn: document.getElementById("new-subject-btn"),
    changeSubjectBtn: document.getElementById("change-subject-btn"),
    soundToggle: document.getElementById("sound-toggle"),
    musicToggle: document.getElementById("music-toggle")
};

// Audio elements
const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const buttonSound = document.getElementById("button-sound");
const backgroundMusic = document.getElementById("background-music");

// Sound settings
let soundEnabled = true;
let musicEnabled = true;
backgroundMusic.volume = 0.4;

// Initialize the game
function initGame() {
    createAlphabetButtons();
    setupEventListeners();
    showSubjectSelector();
}

// Create alphabet buttons
function createAlphabetButtons() {
    elements.lettersContainer.innerHTML = "";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    for (const letter of alphabet) {
        const button = document.createElement("button");
        button.classList.add("letter-btn");
        button.textContent = letter;
        button.addEventListener("click", () => handleGuess(letter));
        elements.lettersContainer.appendChild(button);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Subject selection
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', () => {
            playSound(buttonSound);
            const subject = card.getAttribute('data-subject');
            startGame(subject);
        });
    });
    
    // Game controls
    elements.playAgainBtn.addEventListener("click", () => {
        playSound(buttonSound);
        resetGame();
    });
    
    elements.tryAgainBtn.addEventListener("click", () => {
        playSound(buttonSound);
        resetGame();
    });
    
    elements.newSubjectBtn.addEventListener("click", () => {
        playSound(buttonSound);
        showSubjectSelector();
    });
    
    elements.changeSubjectBtn.addEventListener("click", () => {
        playSound(buttonSound);
        showSubjectSelector();
    });
    
    // Sound controls
    elements.soundToggle.addEventListener("click", () => {
        soundEnabled = !soundEnabled;
        elements.soundToggle.textContent = soundEnabled ? "🔊" : "🔇";
        playSound(buttonSound);
    });
    
    elements.musicToggle.addEventListener("click", () => {
        musicEnabled = !musicEnabled;
        elements.musicToggle.textContent = musicEnabled ? "🎵" : "🔇";
        playSound(buttonSound);
        
        if (musicEnabled && gameState.gameActive) {
            backgroundMusic.play().catch(e => console.log("Music play error:", e));
        } else {
            backgroundMusic.pause();
        }
    });
}

// Start the game
function startGame(subject) {
    gameState.currentSubject = subject;
    gameState.selectedWord = getRandomWord(subject);
    gameState.incorrectGuesses = 0;
    gameState.guessedLetters = [];
    gameState.gameActive = true;
    
    // Update body class for background
    document.body.className = `subject-${subject}`;
    
    // Hide subject selector
    elements.subjectSelector.style.display = "none";
    
    // Hide win/lose messages
    elements.winMessage.style.display = "none";
    elements.loseMessage.style.display = "none";
    
    // Start background music
    if (musicEnabled) {
        backgroundMusic.play().catch(e => console.log("Music play error:", e));
    }
    
    updateGameDisplay();
}

// Reset the game
function resetGame() {
    gameState.selectedWord = getRandomWord(gameState.currentSubject);
    gameState.incorrectGuesses = 0;
    gameState.guessedLetters = [];
    gameState.gameActive = true;
    
    // Hide win/lose messages
    elements.winMessage.style.display = "none";
    elements.loseMessage.style.display = "none";
    
    updateGameDisplay();
}

// Show subject selector
function showSubjectSelector() {
    document.body.className = "start-screen";
    elements.subjectSelector.style.display = "flex";
    elements.winMessage.style.display = "none";
    elements.loseMessage.style.display = "none";
    gameState.gameActive = false;
    backgroundMusic.pause();
}

// Get a random word from the selected subject
function getRandomWord(subject) {
    const words = wordsBySubject[subject];
    return words[Math.floor(Math.random() * words.length)];
}

// Handle a letter guess
function handleGuess(letter) {
    if (!gameState.gameActive || gameState.guessedLetters.includes(letter)) return;
    
    gameState.guessedLetters.push(letter);
    
    if (!gameState.selectedWord.includes(letter)) {
        gameState.incorrectGuesses++;
        playSound(incorrectSound);
    } else {
        playSound(correctSound);
    }
    
    updateGameDisplay();
    checkGameStatus();
}

// Update the game display
function updateGameDisplay() {
    // Update hangman image
    elements.hangmanImage.src = hangmanImages[gameState.incorrectGuesses];
    
    // Update word display
    let displayText = "";
    for (const char of gameState.selectedWord) {
        if (gameState.guessedLetters.includes(char)) {
            displayText += char + " ";
        } else {
            displayText += "_ ";
        }
    }
    elements.wordDisplay.textContent = displayText.trim();
    
    // Update scoreboard
    elements.winsCounter.textContent = gameState.wins;
    elements.lossesCounter.textContent = gameState.losses;
    elements.guessesCounter.textContent = gameState.maxIncorrectGuesses - gameState.incorrectGuesses;
    
    // Update letter buttons
    const letterButtons = elements.lettersContainer.querySelectorAll(".letter-btn");
    letterButtons.forEach(button => {
        const letter = button.textContent;
        if (gameState.guessedLetters.includes(letter)) {
            button.disabled = true;
            if (gameState.selectedWord.includes(letter)) {
                button.style.background = "linear-gradient(135deg, #4CAF50, #2E7D32)";
            } else {
                button.style.background = "linear-gradient(135deg, #f44336, #c62828)";
            }
        } else {
            button.disabled = !gameState.gameActive;
            button.style.background = "linear-gradient(135deg, #4e54c8, #8f94fb)";
        }
    });
}

// Check game status
function checkGameStatus() {
    // Check for win
    const wordGuessed = gameState.selectedWord.split("").every(letter => 
        gameState.guessedLetters.includes(letter)
    );
    
    if (wordGuessed) {
        gameState.wins++;
        elements.winWord.textContent = gameState.selectedWord;
        elements.winMessage.style.display = "block";
        gameState.gameActive = false;
        playSound(winSound);
        backgroundMusic.pause();
        return;
    }
    
    // Check for loss
    if (gameState.incorrectGuesses >= gameState.maxIncorrectGuesses) {
        gameState.losses++;
        elements.loseWord.textContent = gameState.selectedWord;
        elements.loseMessage.style.display = "block";
        gameState.gameActive = false;
        playSound(loseSound);
        backgroundMusic.pause();
    }
}

// Play sound if enabled
function playSound(sound) {
    if (!soundEnabled) return;
    
    try {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Sound play error:", e));
    } catch (e) {
        console.log("Sound error:", e);
    }
}

// Initialize the game when the page loads
window.addEventListener("DOMContentLoaded", initGame);
