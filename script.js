let startTime, elapsedTime = 0, interval;
let lapsContainer = document.getElementById("laps");
const clearLapsBtn = document.getElementById("clearLaps");
const display = document.getElementById('display');

// Adding the click sound
const clickSound = new Audio('asserts/audio_sound_trim.mp3'); // Ensure this file exists in your project

// Function to format time into HH:MM:SS
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

// Function to start the stopwatch
function start() {
    clickSound.play(); // Play sound on button click
    startTime = Date.now() - elapsedTime;
    interval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        display.innerHTML = timeToString(elapsedTime);
    }, 1000);
    document.getElementById('start').disabled = true;
}

// Function to stop the stopwatch
function stop() {
    clickSound.play(); // Play sound on button click
    clearInterval(interval);
    document.getElementById('start').disabled = false;
}

// Function to reset the stopwatch
function reset() {
    clickSound.play(); // Play sound on button click
    clearInterval(interval);
    display.innerHTML = "00:00:00";
    elapsedTime = 0;
    lapsContainer.innerHTML = "";
    document.getElementById('start').disabled = false;
    clearLapsBtn.style.display = "none";
}

// Function to log lap times
function lap() {
    clickSound.play(); // Play sound on button click
    let lapTime = timeToString(elapsedTime);
    let lapDiv = document.createElement('div');
    lapDiv.innerText = lapTime;
    lapsContainer.appendChild(lapDiv);
    // Show the "Clear All" button after the first lap is added
    if (lapsContainer.children.length > 0) {
        clearLapsBtn.style.display = "block"; // Make Clear All button visible
    }
    // Scroll to the bottom of the laps container
    lapsContainer.scrollTop = lapsContainer.scrollHeight;
}

// Function to clear all laps
function clearLaps() {
    clickSound.play(); // Play sound on button click
    lapsContainer.innerHTML = ""; // Clear the laps container
    clearLapsBtn.style.display = "none"; // Hide Clear All button after clearing
}

// Event listeners for the buttons
document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);
clearLapsBtn.addEventListener('click', clearLaps);
