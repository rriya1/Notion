let timers = [];
let activeTimerId = null;

function addCustomTimer() {
    const minutes = document.getElementById('custom-minutes').value;
    const name = document.getElementById('timer-name').value.trim() || `Timer ${timers.length + 1}`;
    if (minutes > 0) {
        createTimer(parseInt(minutes, 10) * 60, name);
        document.getElementById('custom-minutes').value = ''; // Reset the value
        document.getElementById('timer-name').value = ''; // Reset the value
    } else {
        alert("Please enter a valid number of minutes.");
    }
}

function createTimer(seconds, name) {
    const timer = {
        id: timers.length,
        name: name,
        duration: seconds,
        remaining: seconds,
        interval: null
    };
    timers.push(timer);
    displayTimers();
}

function displayTimers() {
    const list = document.getElementById('timers-list');
    list.innerHTML = ''; // Clear existing timers display
    timers.forEach((timer, index) => {
        const timerElement = document.createElement('div');
        timerElement.textContent = `${timer.name} - ${formatTime(timer.remaining)}`;
        timerElement.id = `timer-${index}`;
        timerElement.onclick = function() { toggleTimer(index); };
        list.appendChild(timerElement);
    });
    updateTimerSelectOptions();
}

function updateTimerSelectOptions() {
    const select = document.getElementById('timer-select');
    select.innerHTML = ''; // Clear existing options
    timers.forEach(timer => {
        const option = document.createElement('option');
        option.value = timer.name;
        option.textContent = timer.name;
        select.appendChild(option);
    });
}

function sumTimers() {
    const selectedName = document.getElementById('timer-select').value;
    const totalTime = timers
        .filter(timer => timer.name === selectedName)
        .reduce((acc, timer) => acc + timer.duration, 0);
    document.getElementById('total-time').textContent = `Total Time: ${formatTime(totalTime)}`;
}

function deleteTimersInfo() {
    timers.forEach(timer => {
        if (timer.interval) {
            clearInterval(timer.interval);
        }
    });
    timers = [];
    displayTimers();
    updateTimerSelectOptions();
    document.getElementById('total-time').textContent = `Total Time: 00:00`;
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    return [hours, minutes, secondsLeft]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
}

function toggleTimer(index) {
    const timer = timers[index];
    if (activeTimerId !== null && activeTimerId !== index) {
        // Pause the currently running timer
        const activeTimer = timers[activeTimerId];
        clearInterval(activeTimer.interval);
        activeTimer.interval = null;
        updateTimerDisplay(activeTimerId);
    }

    if (timer.interval) {
        clearInterval(timer.interval);
        timer.interval = null;
    } else {
        timer.interval = setInterval(() => {
            if (timer.remaining > 0) {
                timer.remaining--;
                updateTimerDisplay(index);
            } else {
                clearInterval(timer.interval);
                timer.interval = null;
                playSound();
            }
        }, 1000);
    }
    activeTimerId = (timer.interval) ? index : null;
}

function updateTimerDisplay(index) {
    const timerElement = document.getElementById(`timer-${index}`);
    if (timerElement) {
        timerElement.textContent = `${timers[index].name} - ${formatTime(timers[index].remaining)}`;
    }
}

function playSound() {
    const sound = document.getElementById('timer-sound');
    sound.play();
}

window.onload = function() {
    displayTimers(); // Initialize the display
};
