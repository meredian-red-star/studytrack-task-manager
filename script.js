const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const emptyState = document.querySelector(".empty-state");
const titleInput = document.getElementById("task-title");
const subjectInput = document.getElementById("subject");
const deadlineInput = document.getElementById("deadline");
const statusInput = document.getElementById("status");
const submitButton = taskForm.querySelector('button[type="submit"]');
let editingTask = null;

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const task = editingTask || createTask();
  task.dataset.title = titleInput.value;
  task.dataset.subject = subjectInput.value;
  task.dataset.deadline = deadlineInput.value;
  task.dataset.status = statusInput.value;

  task.querySelector("h3").textContent = titleInput.value;
  task.querySelector(".task-subject").textContent = "Subject: " + subjectInput.value;
  task.querySelector(".task-deadline").textContent = "Deadline: " + deadlineInput.value;
  task.querySelector(".task-status").textContent = "Status: " + statusInput.selectedOptions[0].text;

  if (!editingTask) {
    taskList.appendChild(task);
  }

  emptyState.hidden = true;
  resetForm();
});

function resetForm() {
  taskForm.reset();
  editingTask = null;
  submitButton.textContent = "Add Task";
}

function createTask() {
  const task = document.createElement("li");
  task.className = "task-card";

  const title = document.createElement("h3");

  const subject = document.createElement("p");
  subject.className = "task-subject";

  const deadline = document.createElement("p");
  deadline.className = "task-deadline";

  const status = document.createElement("p");
  status.className = "task-status";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "edit-button";
  editButton.textContent = "Edit";

  editButton.addEventListener("click", function () {
    editingTask = task;
    titleInput.value = task.dataset.title;
    subjectInput.value = task.dataset.subject;
    deadlineInput.value = task.dataset.deadline;
    statusInput.value = task.dataset.status;
    submitButton.textContent = "Update Task";
    titleInput.focus();
  });

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function () {
    if (editingTask === task) {
      resetForm();
    }
    task.remove();
    emptyState.hidden = taskList.children.length > 0;
  });

  task.append(title, subject, deadline, status, editButton, deleteButton);
  return task;
}
