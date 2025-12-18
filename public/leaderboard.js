// leaderboard.js

async function loadLeaderboard() {
  const res = await fetch("/api/scores", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const scores = await res.json();
  const ul = document.getElementById("leaderboardList");
  ul.innerHTML = "";

  if (!scores.length) {
    ul.innerHTML = '<li class="empty">No scores yet. Be the first!</li>';
    return;
  }

  scores.forEach((entry, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="row">
        <span class="rank">${i + 1}</span>
        <span class="player">${escapeHtml(entry.name)}</span>
      </div>
      <div class="stats">
        <div><strong>${entry.wpm}</strong> WPM</div>
        <div><strong>${entry.mistakes}</strong> Mistakes</div>
        <div><strong>${entry.cpm}</strong> Chars</div>
      </div>
    `;
    ul.appendChild(li);
  });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

window.addEventListener("DOMContentLoaded", () => {
  // initial load
  loadLeaderboard();

  // refresh periodically
  setInterval(loadLeaderboard, 2500);

  // ✅ navigation without inline handlers
  document.getElementById("backToGame")?.addEventListener("click", () => {
    window.location.href = "/game/index.html";
  });

  document.getElementById("playNow")?.addEventListener("click", () => {
    window.location.href = "/game/index.html";
  });
});
