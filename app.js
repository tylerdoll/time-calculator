  const FORM = document.getElementById("calcTime");
  const START_INPUT = document.getElementById("start");
  const STOP_INPUT = document.getElementById("stop");
  const LOG = document.getElementById("log");

  let totalTime = 0;

  function init() {
    updateTotalTime(0);
    document.getElementById("today").textContent = new Date().toDateString();
  }

  function calcTime(start, stop) {
    return Math.ceil(Math.abs(stop - start) / (60 * 60 * 1000) * 10) / 10;
  }

  function updateTotalTime(time) {
    totalTime += time;
    document.getElementById("totalTime").textContent = `Total Time: ${totalTime.toFixed(1)}`;

  }

  function updateLog(start, stop, time) {
    const entry = document.createElement("tr");
    const startTd = document.createElement("td")
    const stopTd = document.createElement("td");
    const timeTd = document.createElement("td");

    startTd.textContent = start;
    stopTd.textContent = stop;
    timeTd.textContent = time;

    entry.appendChild(startTd)
    entry.appendChild(stopTd)
    entry.appendChild(timeTd)
    LOG.appendChild(entry);
  }

  FORM.addEventListener("submit", e => {
    e.preventDefault();

    const timeWorked = calcTime(
      START_INPUT.valueAsNumber,
      STOP_INPUT.valueAsNumber
    );

    updateLog(
      START_INPUT.value,
      STOP_INPUT.value,
      timeWorked
    );
    updateTotalTime(timeWorked);

    FORM.reset();
    START_INPUT.focus();

    return true;
  });
