// Get a reference to the airplane
const airplane = document.querySelector('.plane');

// Define initial position and speed of the airplane
let airplanePositionY = 0;
let airplaneSpeed = 5;
let isFlying = false; // To track if the airplane is flying
let flyingTime = 0; // To store the flying time in seconds
let isLanded = false; // To track if the airplane has landed
let instructionsAcknowledged = false; // To track if the user has acknowledged the instructions

// Track when the mouse button is held down
document.addEventListener('mousedown', () => {
    if (instructionsAcknowledged && !isLanded) { // Check if instructions are acknowledged
        isFlying = true;
        startFlyingTimer();
    }
});

// Track when the mouse button is released
document.addEventListener('mouseup', () => {
    if (instructionsAcknowledged && !isLanded) {
        isFlying = false;
        stopFlyingTimer();
        if (flyingTime >= 2) { // You can adjust the threshold for a successful landing
            isLanded = true;
            displayRestartButton();
        }
    }
});

// Function to update the airplane's position
function updateAirplanePosition() {
    if (isFlying) {
        flyingTime += 0.1; // Increase flying time while the mouse button is held down
    }
    airplane.style.bottom = `${airplanePositionY}px`;
}

// Function to start the flying timer
function startFlyingTimer() {
    const timerInterval = 100; // Update every 0.1 second (100 milliseconds)
    const timerElement = document.getElementById('timer');

    const timer = setInterval(() => {
        if (isFlying) {
            flyingTime += 0.1; // Increase flying time every 0.1 second
            timerElement.textContent = `Flying Time: ${flyingTime.toFixed(1)} seconds`;
        }
    }, timerInterval);

    // Store the timer so we can clear it when needed
    airplane.timer = timer;
}

// Function to stop the flying timer
function stopFlyingTimer() {
    clearInterval(airplane.timer);
}

// Function to display the restart button
function displayRestartButton() {
    const restartButton = document.getElementById('restartButton');
    restartButton.classList.remove('hidden');
    const restart = document.getElementById('restart');
    restart.addEventListener('click', () => {
        restartGame();
    });
}

// Function to restart the game
function restartGame() {
    isLanded = false;
    flyingTime = 0;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = 'Flying Time: 0.0 seconds';
    const restartButton = document.getElementById('restartButton');
    restartButton.classList.add('hidden');
}

// Get a reference to the instruction div and the start button
const instructions = document.getElementById('instructions');
const startButton = document.getElementById('startButton');

// When the start button is clicked, hide the instructions and acknowledge the instructions
startButton.addEventListener('click', () => {
    instructions.classList.add('hidden');
    instructionsAcknowledged = true; // Acknowledge the instructions
});

// Show the instructions when the page loads
instructions.classList.remove('hidden');
