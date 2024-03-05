let timer;
let isRunning = false;

function startTimer() {
    if(isRunning) return;
    isRunning = true;
    const display = document.getElementById('timer');
    let time = parseInt(display.textContent.split(":")[0]) * 60 + parseInt(display.textContent.split(":")[1]);
    
    timer = setInterval(() => {
        if(time <= 0){
            clearInterval(timer);
            alert("Time's up!");
            isRunning = false;
            return;
        }
        time--;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    document.getElementById('timer').textContent = "25:00";
    isRunning = false;
}

function setTime(seconds) {
    clearInterval(timer);
    let minutes = Math.floor(seconds / 60);
    document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:00`;
    isRunning = false;
}
