let countdownTimer;
let stopwatchTimer;
let isRunning = false;
let isCountdown = false;
let countdownTime = 0;
let stopwatchTime = 0;

function startTimer() {
    const display = document.getElementById('timer');
    if (isCountdown) {
        if(isRunning) return;
        isRunning = true;
        countdownTimer = setInterval(() => {
            if(countdownTime <= 0){
                clearInterval(countdownTimer);
                alert("Time's up!");
                isRunning = false;
                return;
            }
            countdownTime--;
            updateDisplay(countdownTime);
        }, 1000);
    } else {
        if(stopwatchTimer) return;
        stopwatchTimer = setInterval(() => {
            stopwatchTime++;
            updateDisplay(stopwatchTime);
        }, 1000);
    }
}

function pauseTimer() {
    if (isCountdown) {
        clearInterval(countdownTimer);
    } else {
        clearInterval(stopwatchTimer);
    }
    isRunning = false;
}

function resetTimer() {
    if (isCountdown) {
        clearInterval(countdownTimer);
        countdownTime = 0;
        isRunning = false;
    } else {
        clearInterval(stopwatchTimer);
        stopwatchTime = 0;
    }
    updateDisplay(0);
}

function setTime(seconds) {
    clearInterval(countdownTimer);
    clearInterval(stopwatchTimer);
    countdownTime = seconds;
    isCountdown = true;
    updateDisplay(countdownTime);
    isRunning = false;
}

function updateDisplay(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
