let timerInterval;
let remainingTime = 0;

function setTimer() {
    const days = Math.max(0, parseInt(document.getElementById('daysIn').value) || 0);
    const hours = Math.max(0, Math.min(23, parseInt(document.getElementById('hoursIn').value) || 0));
    const minutes = Math.max(0, Math.min(59, parseInt(document.getElementById('minsIn').value) || 0));
    const seconds = Math.max(0, Math.min(59, parseInt(document.getElementById('secsIn').value) || 0));

    remainingTime = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;

    updateDisplay();
}

function start() {
    if (timerInterval || remainingTime <= 0) return;

    timerInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Timer has finished!");
        } else {
            remainingTime--;
            updateDisplay();
        }
    }, 1000);
}

function stop() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    remainingTime = 0;
    updateDisplay();
    document.getElementById('daysIn').value = '0';
    document.getElementById('hoursIn').value = '0';
    document.getElementById('minsIn').value = '0';
    document.getElementById('secsIn').value = '0';
}

function updateDisplay() {
    const days = Math.floor(remainingTime / (24 * 60 * 60));
    const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
    const seconds = remainingTime % 60;

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('mins').innerText = String(minutes).padStart(2, '0');
    document.getElementById('secs').innerText = String(seconds).padStart(2, '0');
}

// Input validation to ensure numeric and within bounds
document.getElementById('daysIn').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

document.getElementById('hoursIn').addEventListener('input', (e) => {
    e.target.value = Math.min(Math.max(parseInt(e.target.value.replace(/[^0-9]/g, '') || 0), 0), 23);
});

document.getElementById('minsIn').addEventListener('input', (e) => {
    e.target.value = Math.min(Math.max(parseInt(e.target.value.replace(/[^0-9]/g, '') || 0), 0), 59);
});

document.getElementById('secsIn').addEventListener('input', (e) => {
    e.target.value = Math.min(Math.max(parseInt(e.target.value.replace(/[^0-9]/g, '') || 0), 0), 59);
});
