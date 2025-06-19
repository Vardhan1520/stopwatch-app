let timer, startTime;
let running = false;
let lapCount = 0;
let elapsed = 0;

function updateDisplay(time) {
  const display = document.getElementById("display");
  const ms = Math.floor(time % 1000).toString().padStart(3, "0");
  const totalSeconds = Math.floor(time / 1000);
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  const m = (Math.floor(totalSeconds / 60) % 60).toString().padStart(2, "0");
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
  display.innerText = `${h}:${m}:${s}.${ms}`;
}

function toggleStartStop() {
  const startBtn = document.getElementById("startBtn");

  if (!running) {
    startTime = Date.now() - elapsed;
    timer = setInterval(() => {
      elapsed = Date.now() - startTime;
      updateDisplay(elapsed);
    }, 10);
    startBtn.innerText = "Pause";
    running = true;
  } else {
    clearInterval(timer);
    startBtn.innerText = "Start";
    running = false;
  }
}

function reset() {
  clearInterval(timer);
  running = false;
  elapsed = 0;
  lapCount = 0;
  updateDisplay(0);
  document.getElementById("startBtn").innerText = "Start";
  document.getElementById("laps").innerHTML = "";
}

function recordLap() {
  if (!running) return;
  lapCount++;
  const laps = document.getElementById("laps");
  const li = document.createElement("li");

  const ms = Math.floor(elapsed % 1000).toString().padStart(3, "0");
  const totalSeconds = Math.floor(elapsed / 1000);
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  const m = (Math.floor(totalSeconds / 60) % 60).toString().padStart(2, "0");
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");

  li.innerHTML = `<span>Lap ${lapCount}:</span> ${h}:${m}:${s}.${ms}`;
  laps.appendChild(li);
}

function clearLaps() {
  lapCount = 0;
  document.getElementById("laps").innerHTML = "";
}

function exportLaps() {
  const laps = document.querySelectorAll("#laps li");
  if (laps.length === 0) return alert("No laps to export!");

  let csv = "Lap,Time\n";
  laps.forEach((lap, index) => {
    const time = lap.textContent.split(": ")[1];
    csv += `${index + 1},${time}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "stopwatch_laps.csv";
  link.click();
}
