const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');
const mainSection = document.getElementById('main');
const clearCompletedBtn = document.getElementById('clear-completed');

let todos = [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
function loadTodos() {
  const stored = localStorage.getItem('todos');
  if (stored) {
    todos = JSON.parse(stored);
  }
}
function createTodoElement(todo, index) {
  const li = document.createElement('li');
  li.className = todo.completed ? 'completed' : '';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-checkbox';
  checkbox.checked = todo.completed;

  checkbox.addEventListener('change', () => {
    todos[index].completed = checkbox.checked;
    saveTodos();
    renderTodos();
  });
  const span = document.createElement('span');
  span.className = 'todo-text';
  span.textContent = todo.text;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '❌';
  removeBtn.title = 'Remover tarefa';
  removeBtn.style.background = 'transparent';
  removeBtn.style.border = 'none';
  removeBtn.style.cursor = 'pointer';
  removeBtn.style.fontSize = '1.2rem';

  removeBtn.addEventListener('click', () => {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(removeBtn);

  return li;
}
function renderTodos() {
  todoList.innerHTML = '';
  if (todos.length === 0) {
    mainSection.style.display = 'none';
  } else {
    mainSection.style.display = 'block';
  }
  todos.forEach((todo, index) => {
    const li = createTodoElement(todo, index);
    todoList.appendChild(li);
  });
}
todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text === '') return;
  todos.push({
    text,
    completed: false,
  });
  todoInput.value = '';
  saveTodos();
  renderTodos();
});
clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  renderTodos();
});
loadTodos();
renderTodos();
