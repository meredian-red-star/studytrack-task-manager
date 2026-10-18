const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const emptyState = document.querySelector(".empty-state");

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const titleInput = document.getElementById("task-title");
  const subjectInput = document.getElementById("subject");
  const deadlineInput = document.getElementById("deadline");
  const statusInput = document.getElementById("status");

  const task = document.createElement("li");
  task.className = "task-card";

  const title = document.createElement("h3");
  title.textContent = titleInput.value;

  const subject = document.createElement("p");
  subject.textContent = "Subject: " + subjectInput.value;

  const deadline = document.createElement("p");
  deadline.textContent = "Deadline: " + deadlineInput.value;

  const status = document.createElement("p");
  status.textContent = "Status: " + statusInput.selectedOptions[0].text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function () {
    task.remove();
    emptyState.hidden = taskList.children.length > 0;
  });

  task.append(title, subject, deadline, status, deleteButton);
  taskList.appendChild(task);
  emptyState.hidden = true;
  taskForm.reset();
});
