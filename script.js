const startButton = document.querySelector("#startBtn");
const message = document.querySelector("#message");

startButton.addEventListener("click", function () {
  message.textContent =
    "Let's build something awesome! Day 1 completed.";

  startButton.textContent = "Journey Started!";
});
