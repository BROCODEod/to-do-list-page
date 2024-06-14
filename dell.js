document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('new-task');
    if (taskInput.value.trim() === '') return;

    const task = {
        text: taskInput.value,
        completed: false
    };

    saveTask(task);
    appendTaskToDOM(task);

    taskInput.value = '';
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => appendTaskToDOM(task));
}

function appendTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');
    if (task.completed) listItem.classList.add('completed');

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.contentEditable = false;
    listItem.appendChild(taskText);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.onclick = () => {
        if (editButton.textContent === 'Edit') {
            taskText.contentEditable = true;
            taskText.focus();
            editButton.textContent = 'Save';
        } else {
            taskText.contentEditable = false;
            task.text = taskText.textContent;
            updateTaskInLocalStorage(task);
            editButton.textContent = 'Edit';
        }
    };
    listItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = () => {
        taskList.removeChild(listItem);
        removeTaskFromLocalStorage(task);
    };
    listItem.appendChild(deleteButton);

    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Uncomplete' : 'Complete';
    completeButton.className = 'complete';
    completeButton.onclick = () => {
        if (listItem.classList.contains('completed')) {
            listItem.classList.remove('completed');
            completeButton.textContent = 'Complete';
            task.completed = false;
        } else {
            listItem.classList.add('completed');
            completeButton.textContent = 'Uncomplete';
            task.completed = true;
        }
        updateTaskInLocalStorage(task);
    };
    listItem.appendChild(completeButton);

    taskList.appendChild(listItem);
}

function updateTaskInLocalStorage(updatedTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.text === updatedTask.text ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskToRemove.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}