const form = document.getElementById("eventForm");
const eventContainer = document.getElementById("eventContainer");
const clearAllBtn = document.getElementById("clearAll");
const addSampleBtn = document.getElementById("addSample");
const keyPressedSpan = document.getElementById("keyPressed");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  addEventCard(title, date, category, description);
  form.reset();
});

function addEventCard(title, date, category, description) {
  const emptyMsg = document.querySelector(".empty");
  if (emptyMsg) emptyMsg.remove();

  const card = document.createElement("div");
  card.className = "event-card";

  card.innerHTML = `
  <h3>${title}</h3>
  <p><b>Date:</b> ${date}</p>
  <p><b>Category:</b> ${category}</p>
  <p>${description}</p>
  <button class="delete-btn" title="Delete Event">✕</button>
`;

  eventContainer.appendChild(card);
}

eventContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
  }
});

clearAllBtn.addEventListener("click", function () {
  eventContainer.innerHTML = `<p class="empty">No events yet. Add your first event!</p>`;
});

addSampleBtn.addEventListener("click", function () {
  addEventCard("Tech Conference", "2026-02-16", "Conference", "Annual tech meetup");
  addEventCard("React Workshop", "2026-03-01", "Workshop", "Hands-on React session");
});

document.addEventListener("keydown", function (e) {
  keyPressedSpan.innerText = e.key;
});