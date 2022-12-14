import { removeAllTodos, changeTodo, addTodo } from "../ts/functions";
import { Todo } from "../ts/models/Todo";
import { expect, describe, test } from "@jest/globals";

describe("changeTodo", () => {
  test("should change false to true", () => {
    //Arrange
    let todo: Todo = new Todo("äta", false);

    //Act
    changeTodo(todo);

    //Assert
    expect(todo.done).toBe(!false);
    expect(todo.done).toBe(true);
  });

  test("should change true to false", () => {
    //Arrange
    let todo: Todo = new Todo("äta", true);

    //Act
    changeTodo(todo);
    // console.log(todo);

    //Assert
    expect(todo.done).toBe(!true);
    expect(todo.done).toBe(false);
  });
});

describe("removeAllTodos", () => {
  test("should remove all todos from list", () => {
    //Arrange
    let todos: Todo[] = [];
    let newtodo = new Todo("handla", true);
    todos.push(newtodo);

    //Act
    removeAllTodos(todos);

    //Assert
    expect(todos.length).toBe(0);
  });
});

describe("addTodo", () => {
  test("should add task to list", () => {
    //Arrange
    let todos: Todo[] = [];
    let length: number = todos.length;
    let todoText: string = "plugga";

    //Act
    let result = addTodo(todoText, todos);
    // console.log("Du la till en todo i listan = " + result.success);

    //Assert
    expect(todos.length).toBe(length + 1);
  });

  test("should not add task to list", () => {
    //Arrange
    let todos: Todo[] = [];
    let length: number = todos.length;
    let todoText: string = "p";

    //Act
    let result = addTodo(todoText, todos);
    // console.log("Du la till en todo i listan = " + result.success);

    //Assert
    expect(todos.length).toBe(length);
  });
});
