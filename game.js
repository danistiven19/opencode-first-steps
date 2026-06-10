// Global game variables
let snake = [{ x: 10, y: 10 }];
let food = { x: 0, y: 0 };
let dx = 1;
let dy = 0;
let score = 0;
let level = 1;
let gameInterval;
const BOARD_SIZE = 20;
const TILE_SIZE = 20;

// DOM elements (will be initialized in initGame)
let gameBoard, scoreDisplay, levelDisplay;

// Initialization function
function initGame() {
    // Initialize DOM elements here
    gameBoard = document.getElementById('game-board');
    scoreDisplay = document.getElementById('score');
    levelDisplay = document.getElementById('level');

    // Set up board dimensions
    gameBoard.style.width = `${BOARD_SIZE * TILE_SIZE}px`;
    gameBoard.style.height = `${BOARD_SIZE * TILE_SIZE}px`;
    gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, ${TILE_SIZE}px)`;
    gameBoard.style.gridTemplateRows = `repeat(${BOARD_SIZE}, ${TILE_SIZE}px)`;
    gameBoard.style.backgroundColor = '#1A1A1A'; // Even darker background for contrast
    gameBoard.style.border = '5px solid #607D8B'; // A subtle blue-grey border
    gameBoard.style.borderRadius = '10px';
    gameBoard.style.boxShadow = '0 0 20px rgba(0,0,0,0.8)'; // More pronounced shadow

    // Apply global body styles
    document.body.style.backgroundColor = '#303030';
    document.body.style.color = '#E0E0E0';
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.display = 'flex';
    document.body.style.flexDirection = 'column';
    document.body.style.alignItems = 'center';
    document.body.style.justifyContent = 'center';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden'; // Prevent body scroll

    // Set up the board (clear existing content)
    gameBoard.innerHTML = '';

    // Place initial food and start game
    placeFood();
    drawGame();
    
    // Add a small delay to ensure initial state is stable before starting the loop
    setTimeout(() => {
        const initialInterval = Math.max(50, 200 - (level * 15)); // Calculate initial speed based on selected level
        gameInterval = setInterval(gameLoop, initialInterval);
    }, 500);
    
    // Event listeners
    document.addEventListener('keydown', changeDirection);

    // Initial display update
    updateScoreAndLevelDisplay();
}

function gameLoop() {
    // 1. Check for food consumption before moving
    let ateFood = checkEatFood();

    // 2. Move snake
    moveSnake(ateFood);

    // --- CRITICAL FIX: Draw the new position immediately ---
    drawGame();

    // 3. Check for collision (self or wall)
    if (checkCollision()) {
        gameOver();
        return;
    }

    // 4. Update state (score, food, level)
    if (ateFood) {
        score += 10;
        placeFood();
        updateScoreAndLevelDisplay(); // Centralized display update

        if (score >= 50 * level) {
            levelUp();
        }
    }
}

function moveSnake(ateFood) {
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead); // Add new head

    // Only remove the tail if food was NOT eaten
    if (!ateFood) {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    // Wall collision
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        console.log("Collision: Wall at", head);
        return true;
    }
    // Self collision (check if head hits any body part starting from the second segment)
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            console.log("Collision: Self at", head);
            return true;
        }
    }
    return false;
}

function checkEatFood() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        return true;
    }
    return false;
}

function placeFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    food = newFood;
}


// Drawing functions
function drawGame() {
    // Clear previous state
    gameBoard.innerHTML = '';

    // Draw Snake
    snake.forEach((segment, index) => {
        const element = document.createElement('div');
        element.style.gridRowStart = segment.y + 1;
        element.style.gridColumnStart = segment.x + 1;
        element.style.width = '100%';
        element.style.height = '100%';
        element.style.background = index === 0 ? '#4CAF50' : '#8BC34A'; // Brighter green head, lighter green body
        element.style.borderRadius = '2px';
        gameBoard.appendChild(element);
    });

    // Draw Food
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y + 1;
    foodElement.style.gridColumnStart = food.x + 1;
    foodElement.style.width = '100%';
    foodElement.style.height = '100%';
    foodElement.style.background = '#F44336'; /* Bright Red Food */
    foodElement.style.borderRadius = '50%';
    gameBoard.appendChild(foodElement);
}


// Input handling
function changeDirection(event) {
    const keyPressed = event.key;

    // Prevent default scrolling for arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(keyPressed)) {
        event.preventDefault();
    }
    let newDx = dx;
    let newDy = dy;

    if (keyPressed === 'ArrowLeft' && dx === 0) {
        newDx = -1;
        newDy = 0;
    } else if (keyPressed === 'ArrowRight' && dx === 0) {
        newDx = 1;
        newDy = 0;
    } else if (keyPressed === 'ArrowUp' && dy === 0) {
        newDx = 0;
        newDy = -1;
    } else if (keyPressed === 'ArrowDown' && dy === 0) {
        newDx = 0;
        newDy = 1;
    }

    // Prevent reversing direction immediately
    if ((newDx !== 0 || newDy !== 0) && (newDx !== -dx || newDy !== -dy)) {
        dx = newDx;
        dy = newDy;
    }
}

function gameOver() {
    clearInterval(gameInterval);
    // Remove all listeners to prevent accidental movement
    document.removeEventListener('keydown', changeDirection);
    alert(`Game Over! ${score > 0 ? 'Congratulations!' : ''} Your final score: ${score} (Maximum Level Reached: ${level})`);
}

function levelUp() {
    level++;
    updateScoreAndLevelDisplay(); // Centralized display update

    clearInterval(gameInterval);

    if (level === 2) {
        alert("Level 2 Reached! The environment is more dangerous.");
    }

    // Update speed based on level (reduced complexity for level 2 and beyond)
    const newInterval = Math.max(50, 200 - (level * 15)); // Adjusted formula for less aggressive speed increase
    gameInterval = setInterval(gameLoop, newInterval);
}

function startBossBattle() {
    clearInterval(gameInterval);
    alert(`VICTORY! You reached Level ${level}! The final boss fight has begun!`);
    document.removeEventListener('keydown', changeDirection);
    console.log("Boss battle initiated. Needs specific logic implementation.");
}

function updateScoreAndLevelDisplay() {
    scoreDisplay.innerText = score;
    levelDisplay.innerText = level;
}

// --- UI Element Creation (runs once) ---

// Add a fancy game title
const gameTitle = document.createElement('h1');
gameTitle.id = 'game-title';
gameTitle.innerText = 'SNAKE ROYALE';
gameTitle.style.fontSize = '3.5em';
gameTitle.style.color = '#FFD700'; // Gold color
gameTitle.style.textShadow = '2px 2px 5px rgba(0,0,0,0.7)';
gameTitle.style.marginBottom = '30px';
document.body.insertBefore(gameTitle, gameBoard);

// Create and add a level selection dropdown
const levelSelectContainer = document.createElement('div');
levelSelectContainer.style.marginBottom = '20px';
levelSelectContainer.style.display = 'flex';
levelSelectContainer.style.alignItems = 'center';
levelSelectContainer.style.justifyContent = 'center';

const levelSelectLabel = document.createElement('label');
levelSelectLabel.innerText = 'Select Level: ';
levelSelectLabel.style.fontSize = '1.2em';
levelSelectLabel.style.color = '#B0BEC5'; // Light blue-grey
levelSelectLabel.style.marginRight = '10px';
levelSelectContainer.appendChild(levelSelectLabel);

const levelSelect = document.createElement('select');
levelSelect.id = 'level-select';
levelSelect.style.padding = '8px';
levelSelect.style.fontSize = '1em';
levelSelect.style.borderRadius = '5px';
levelSelect.style.backgroundColor = '#424242';
levelSelect.style.color = '#E0E0E0';
levelSelect.style.border = '1px solid #607D8B';
levelSelect.style.cursor = 'pointer';
levelSelect.style.marginRight = '10px';

// Populate dropdown with options
for (let i = 1; i <= 3; i++) { // Let's offer up to 3 levels initially
    const option = document.createElement('option');
    option.value = i;
    option.innerText = `Level ${i}`;
    levelSelect.appendChild(option);
}

levelSelectContainer.appendChild(levelSelect);

// Add a "Start Game" button
const startButton = document.createElement('button');
startButton.innerText = 'Start Game';
startButton.style.padding = '8px 16px';
startButton.style.fontSize = '1em';
startButton.style.borderRadius = '5px';
startButton.style.backgroundColor = '#4CAF50';
startButton.style.color = 'white';
startButton.style.border = 'none';
startButton.style.cursor = 'pointer';
startButton.style.fontWeight = 'bold';

// Event listener for Start button
startButton.addEventListener('click', () => {
    level = parseInt(levelSelect.value);
    initGame(); // Restart game with new level
});
levelSelectContainer.appendChild(startButton);

document.body.insertBefore(levelSelectContainer, gameBoard);

// Style score and level displays
// Create a container for score and level
const infoContainer = document.createElement('div');
infoContainer.style.display = 'flex';
infoContainer.style.justifyContent = 'space-around';
infoContainer.style.width = `${BOARD_SIZE * TILE_SIZE}px`; // Match board width
infoContainer.style.backgroundColor = '#424242'; // Darker background
infoContainer.style.padding = '10px 20px';
infoContainer.style.borderRadius = '8px';
infoContainer.style.marginBottom = '20px';
infoContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';

// Append score and level displays to this new container
infoContainer.appendChild(scoreDisplay);
infoContainer.appendChild(levelDisplay);

// Insert the container before the game board for better layout
document.body.insertBefore(infoContainer, gameBoard);

scoreDisplay.style.fontSize = '2em';
scoreDisplay.style.fontWeight = 'bold';
scoreDisplay.style.color = '#FFEB3B'; // Yellow for score
scoreDisplay.style.margin = '0 10px'; // Remove individual margins

levelDisplay.style.fontSize = '1.5em';
levelDisplay.style.fontWeight = 'bold';
levelDisplay.style.color = '#9C27B0'; // Purple for level
levelDisplay.style.margin = '0 10px'; // Remove individual margins

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);
