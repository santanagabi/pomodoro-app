const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const resetBtn = document.querySelector(".btn-reset");
const pauseBtn = document.querySelector(".btn-pause");
const session = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
let myInterval;
let state = true;
let isPaused = false;
let totalSeconds; // guarda o tempo restante

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);

  if (state) {
    state = false;
    let totalSeconds = sessionAmount * 60;

    const updateSeconds = () => {
      if (!isPaused) {
        totalSeconds--;

        let minutesLeft = Math.floor(totalSeconds / 60);
        let secondsLeft = totalSeconds % 60;

        if (secondsLeft < 10) {
          seconds.textContent = "0" + secondsLeft;
        } else {
          seconds.textContent = secondsLeft;
        }
        session.textContent = `${minutesLeft}`;

        if (minutesLeft === 0 && secondsLeft === 0) {
          bells.play();
          clearInterval(myInterval);
        }
      }
    };

    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert("Session has already started.");
  }
};

const resetTime = () => {
  clearInterval(myInterval);
  session.textContent = "25";
  seconds.textContent = "00";
  state = true;
  isPaused = false;
};

const togglePause = () => {
  if (!state) {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
  } else {
    alert("You need to start the timer first.");
  }
};

startBtn.addEventListener("click", appTimer);

// TODO: Create a "Reset" button that pauses the timer and brings it back to its initial time.
resetBtn.addEventListener("click", resetTime);

// TODO: Add a "Pause" button that stops the timer when pressed and resumes the timer when pressed again.
pauseBtn.addEventListener("click", togglePause);
