// Select the DOM elements
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// create the array to store the to-do's
let todos = [];

// load the todo from localStorage
const loadTodos = () => {
  const storedTodos = localStorage.getItem('todos')
  if(storedTodos) {
    //convert back to array
    todos = JSON.parse(storedTodos);
    renderTodos();
  }
}

//create function to save to do in localStorage
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
}


// create function to add new todo's
const addTodo = () => {
  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    const newTodo = {
      text: todoText,
      completed: false
    }

    todos.push(newTodo);
    todoInput.value = '';
    renderTodos();
    saveTodos();
  }
}

addButton.addEventListener('click', addTodo);

// function to render the to-do list
const renderTodos = () => {
  // clear the current list
  todoList.innerHTML = '';

  // loop through the to-dos and create the list items <li>test</li>
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    // add 'completed' class if the to  do is completed
    if (todo.completed) {
      li.classList.add('completed');
    }
    
    //add 'favorited' class if the to do is favorited
    if (todo.favorited) {
      li.classList.add('favorited');
    }
    //Create 'favorite' button
    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = 'Favorite';
    favoriteButton.addEventListener('click', () => {
      toggleFavorite(index);
    });

    //Create 'complete' button
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Collected';
    completeButton.addEventListener('click', () => {
      toggleComplete(index);
    });
    
    //add the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Forget';
    deleteButton.addEventListener('click', () => {
      deleteTodo(index);
    });

    //add the favorite button to the list item
    li.appendChild(favoriteButton);

    //add the complete button to the list item
    li.appendChild(completeButton);

    //add the delete button to the list item
    li.appendChild(deleteButton);

    todoList.appendChild(li);
  })
}

//create function to toggle the favorite status
const toggleFavorite = (index) => {
  todos[index].favorited = !todos[index].favorited;
  renderTodos();
  saveTodos();
}
// create the function to toggle the completed status
const toggleComplete = (index) => {
  todos[index].completed = !todos[index].completed;
  renderTodos();
  saveTodos();
}

// create the delete to-do function
const deleteTodo = (index) => {
todos.splice(index, 1);
renderTodos();
saveTodos();
}
 loadTodos();
//