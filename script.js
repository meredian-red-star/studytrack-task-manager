// Keep this UI-only form from submitting and reloading the page.
const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Task creation will be added in a future step.
});
