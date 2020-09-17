const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const CompleteEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementsByClassName("complete-button")[0];

let countdownTitle = ""
let countdownDate = ""
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min With Todays Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = Date.now();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        // Hide Input
        inputContainer.hidden = true;

        // If countdown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            CompleteEl.hidden = false;
        } else {
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        CompleteEl.hidden = true;
        countdownEl.hidden = false
        }
    }, second);
}

// Take Values From Form Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem("countdown", JSON.stringify(savedCountdown));
    // Check for Valid Date
    if (countdownDate === "") {
        throw new Error;
        
    } else {
         // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        console.log("countdown value:", countdownValue);
        updateDOM()
    }
}


// Reset All Values
function reset() {
    // Hide Countdowns, Show Input
    countdownEl.hidden = true;
    CompleteEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the Countdown
    clearInterval(countdownActive);
    // Reset Values
    countdownTitle = "";
    countdownDate = "";
    localStorage.removeItem("countdown");
}

function restorePrevCountdown() { 
// Get countdown from localStorage if available
if (localStorage.getItem("countdown")) {
    inputContainer.hiddem = true; 
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedcountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM()
    } 
}
// Event Listener
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// On Load, check localStorage
restorePrevCountdown();