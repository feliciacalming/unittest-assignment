import { removeAllTodos, changeTodo, addTodo } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

describe("changeTodo", () => {
  test("should change false to true", () => {
    //Arrange
    let todo: Todo = new Todo("äta", false);
    // console.log(todo);
    //Act
    changeTodo(todo);
    // console.log(todo);

    //Arrest
    expect(todo.done).toBe(!false);
    expect(todo.done).toBe(true);
  });

  test("should change true to false", () => {
    //Arrange
    let todo: Todo = new Todo("äta", true);
    // console.log(todo);
    //Act
    changeTodo(todo);
    // console.log(todo);

    //Arrest
    expect(todo.done).toBe(!true);
    expect(todo.done).toBe(false);
  });
});

describe("removeAllTodos", () => {
  test("should remove all todos", () => {
    //Arrange
    let todos: Todo[] = [];
    console.log(todos);
    let newtodo = new Todo("handla", true);
    todos.push(newtodo);
    console.log(todos);

    //Act
    removeAllTodos(todos);
    console.log(todos);
    //skickar hela listan till funktionen removeAllTodos

    //Arrest
    expect(todos.length).toBe(0);
  });
});

describe("addTodo", () => {
  test("should not add task to list", () => {
    //Arrange
    let todos: Todo[] = [];
    let length: number = todos.length;
    console.log(todos);
    let todoText: string = "plugga";

    //Act
    addTodo(todoText, todos);
    console.log(todos);

    //Assert
    expect(todos.length).toBe(length + 1);
  });
});
