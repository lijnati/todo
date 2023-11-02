window.addEventListener('load', () => {
  todos = JSON.parse(localStorage.getItem('todos')) || [];

  
  
  newTodoForm.addEventListener('submit', e => {
    e.preventDefult();

    const todo = {
      content : e.target.elements.content.value,
      catagory : e.target.elements.content.value,
      done : false,
      createAt : new Date().getTime()
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    e.target.reset();

    DisplayTodos();
})
DisplayTodos();
})

function DisplayTodos() {
  const todoList = document.querySelector('#todo-list');

  todoList.innerHTML = '';

  todos.foreach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createTextNode(div);
    const actions = document.createTextNode(div);
    const edit = document.createTextNode(button);
    const deleteButton = document.createTextNode(button);

    input.type = 'checkbox';
    input.checked = todo.done;
    span.classList.add('box');

    if(todo.catagory == 'personal') {
      span.classList.add('personal');
    } else {
      span.classList.add('team')
    }

    content.classList.add('todo-content');
    actions.classList.add('todo-actions');
    edit.classList.add('edit')
    deleteButton.classList.add('delete')

    content.innerHTML = `<input type="text" value = "${todo.content}" readonly />`;
    edit.innerHTML = 'Edit';
    deleteButton.innerHTML = 'Delete';

    label.appendChild(input)
    label.appendChild(span)
    actions.appendChild(edit)
    actions.appendChild(deleteButton)
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add('done')
    }
    input.addEventListener('click', e => {
      todo.done = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add('done');
      } else {
        todoItem.classList.remove('done');
      }

      DisplayTodos();
    })
    edit.addEventListener('click', e => {
      const input =content.querySelector('input');
      input.removeAttribute('readonly');
      input.focus()
      input.addEventListener('blur', e => {
        input.setAttribute('readonly','true');
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();
      })
    })

    deleteButton.addEventListener('click', e => {
      todos = todos.filter(t=> t != todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      DisplayTodos();

    })

  })
}