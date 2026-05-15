/* ===== TOTAL COUNTER ===== */

fetch("https://countapi.mileshilliard.com/api/v1/hit/afoolhippo/kabagame-total")
  .then(res => res.json())
  .then(data => {

    document.getElementById("totalCounter")
      .textContent =
        String(data.count)
          .padStart(5, "0");

  })
  .catch(() => {

    document.getElementById("totalCounter")
      .textContent = "ERROR";

  });

/* ===== TODAY COUNTER ===== */

const todayKey =
  new Date()
    .toISOString()
    .split("T")[0];

fetch(`https://countapi.mileshilliard.com/api/v1/hit/afoolhippo/${todayKey}`)
  .then(res => res.json())
  .then(data => {

    document.getElementById("todayCounter")
      .textContent =
        String(data.count)
          .padStart(4, "0");

  })
  .catch(() => {

    document.getElementById("todayCounter")
      .textContent = "ERR";

  });