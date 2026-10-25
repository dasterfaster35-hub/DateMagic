
const person = document.getElementById("person");
const message = document.getElementById("message");
const theme = document.getElementById("theme");

const previewName = document.getElementById("previewName");
const previewMessage = document.getElementById("previewMessage");
const previewCard = document.getElementById("previewCard");
const answer = document.getElementById("answer");
const no = document.getElementById("no");

document.getElementById("preview").addEventListener("click", () => {
  previewName.textContent = person.value.trim()
    ? `Для ${person.value.trim()} 💗`
    : "Для тебя 💗";

  previewMessage.textContent = message.value;

  previewCard.classList.remove("night", "cute");
  if (theme.value === "night") previewCard.classList.add("night");
  if (theme.value === "cute") previewCard.classList.add("cute");

  answer.textContent = "";
  no.hidden = false;
  no.textContent = "Нет 🙈";
});

document.getElementById("yes").addEventListener("click", () => {
  answer.textContent = "УРААА! 💖 Не забудь договориться о дате!";
  no.hidden = true;
});

function dodge() {
  no.textContent = "Не поймаешь 😜";
  no.style.position = "fixed";
  no.style.left = Math.max(0, Math.random() *
    (window.innerWidth - no.offsetWidth)) + "px";
  no.style.top = Math.max(0, Math.random() *
    (window.innerHeight - no.offsetHeight)) + "px";
}

no.addEventListener("pointerenter", dodge);
no.addEventListener("click", dodge);
