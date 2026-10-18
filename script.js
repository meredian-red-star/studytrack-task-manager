const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const emptyState = document.querySelector(".empty-state");
const titleInput = document.getElementById("task-title");
const subjectInput = document.getElementById("subject");
const deadlineInput = document.getElementById("deadline");
const statusInput = document.getElementById("status");
const submitButton = taskForm.querySelector('button[type="submit"]');
const statusFilter = document.getElementById("status-filter");
const storageKey = "studytrack-tasks";
const statusLabels = {
  "not-started": "Not started",
  "in-progress": "In progress",
  "completed": "Completed"
};
let editingTask = null;

statusFilter.addEventListener("change", filterTasks);

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const task = editingTask || createTask();
  updateTask(task, {
    title: titleInput.value,
    subject: subjectInput.value,
    deadline: deadlineInput.value,
    status: statusInput.value
  });

  if (!editingTask) {
    taskList.appendChild(task);
  }

  saveTasks();
  filterTasks();
  resetForm();
});

function updateTask(task, data) {
  task.dataset.title = data.title;
  task.dataset.subject = data.subject;
  task.dataset.deadline = data.deadline;
  task.dataset.status = data.status;

  task.querySelector("h3").textContent = data.title;
  task.querySelector(".task-subject").textContent = "Subject: " + data.subject;
  task.querySelector(".task-deadline").textContent = "Deadline: " + data.deadline;
  task.querySelector(".task-status").textContent = "Status: " + statusLabels[data.status];
}

function saveTasks() {
  const tasks = [];

  for (const task of taskList.children) {
    tasks.push({
      title: task.dataset.title,
      subject: task.dataset.subject,
      deadline: task.dataset.deadline,
      status: task.dataset.status
    });
  }

  try {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  } catch (error) {
    console.warn("Tasks could not be saved to localStorage.", error);
  }
}

function loadTasks() {
  try {
    const tasks = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(tasks)) {
      return;
    }

    for (const data of tasks) {
      if (!data || typeof data.title !== "string" || typeof data.subject !== "string"
        || typeof data.deadline !== "string"
        || !Object.keys(statusLabels).includes(data.status)) {
        continue;
      }

      const task = createTask();
      updateTask(task, data);
      taskList.appendChild(task);
    }
  } catch (error) {
    console.warn("Tasks could not be restored from localStorage.", error);
  }
}

function filterTasks() {
  let visibleTasks = 0;

  for (const task of taskList.children) {
    task.hidden = statusFilter.value !== "all" && task.dataset.status !== statusFilter.value;
    if (!task.hidden) {
      visibleTasks++;
    }
  }

  emptyState.hidden = visibleTasks > 0;
  emptyState.textContent = taskList.children.length === 0
    ? "No tasks yet. Your tasks will appear here."
    : "No tasks match this status.";
}

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
    saveTasks();
    filterTasks();
  });

  task.append(title, subject, deadline, status, editButton, deleteButton);
  return task;
}

loadTasks();
filterTasks();
