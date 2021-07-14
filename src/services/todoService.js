const todoName = 'todoLocal';

export function getTodo() {
  return new Promise(resolve => {
    const todo = JSON.parse(localStorage.getItem(todoName));

    resolve(Array.isArray(todo) ? todo : []);
  })
}

export function addTodo(newTodo) {
  return new Promise(async resolve => {
    const todo = JSON.parse(localStorage.getItem(todoName));

    let newStorage;
    if(Array.isArray(todo)) {
      newStorage = [...todo];
      newStorage.push(newTodo);
    } else {
      newStorage = [newTodo];
    }

    newStorage = JSON.stringify(newStorage)
    localStorage.setItem(todoName, newStorage);

    const refreshTodo = JSON.parse(localStorage.getItem(todoName))
    resolve(refreshTodo);
  })
}

export function setCheck(id) {
  return new Promise(resolve => {
    const todo = JSON.parse(localStorage.getItem(todoName));

    let newStorage = todo.map(el => {
      if (el.id === id) {
        return {
          ...el,
          check: !el.check,
        }
      }

      return el;
    })

    newStorage = JSON.stringify(newStorage)
    localStorage.setItem(todoName, newStorage);

    const refreshTodo = JSON.parse(localStorage.getItem(todoName))
    resolve(refreshTodo);
  })
}

export function deleteTodo(id) {
  return new Promise(resolve => {
    const todo = JSON.parse(localStorage.getItem(todoName));

    let newStorage = todo.filter(el => el.id !== id);

    newStorage = JSON.stringify(newStorage)
    localStorage.setItem(todoName, newStorage);

    const refreshTodo = JSON.parse(localStorage.getItem(todoName))
    resolve(refreshTodo);
  })
}

export function deleteChecked() {
  return new Promise(resolve => {
    const todo = JSON.parse(localStorage.getItem(todoName));

    let newStorage = todo.filter(el => !el.check);

    newStorage = JSON.stringify(newStorage)
    localStorage.setItem(todoName, newStorage);

    const refreshTodo = JSON.parse(localStorage.getItem(todoName))
    resolve(refreshTodo);
  })
}
