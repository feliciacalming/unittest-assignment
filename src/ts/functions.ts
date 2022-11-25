import { createHtml } from "./main";
import { IAddResponse } from "./models/IAddResult";
import { Todo } from "./models/Todo";

export function addTodo(todoText: string, todos: Todo[]): IAddResponse {
  if (todoText.length > 2) {
    let newTodo = new Todo(todoText, false);
    todos.push(newTodo);
    return { success: true, error: "Du måste ange minst två bokstäver" };
  } else {
    return { success: false, error: "Du måste ange minst två bokstäver" };
  }
}

export function changeTodo(todo: Todo) {
  todo.done = !todo.done;
}

export function removeAllTodos(todos: Todo[]) {
  todos.splice(0, todos.length);
}

//min egna funktion för att sortera efter done
// export function sortTodos(todos: Todo[]) {
//   for (let i = 0; i < todos.length; i++) {
//     if (todos[i].done === true) {
//       // console.log(todos[i].text + "U did it!!!");
//       // todos.push(todos.splice(todos.indexOf(todos[i]), 1)[0]);
//       // todos.splice(i, 1);
//       // todos.push(d);
//       createHtml(todos);
//     }
//   }
// }
