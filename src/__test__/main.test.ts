/**
 *@jest-environment jsdom
 */

import * as functions from "../ts/main";
import * as functions2 from "../ts/functions";
import { Todo } from "../ts/models/Todo";
// import { expect, describe, test } from "@jest/globals";
import { addTodo, changeTodo } from "../ts/functions";

//clearTodos kör removeAllTodos och sen createHtml
//så den tömmer själva listan [ ] och skriver sen ut html
//så att den synliga listan på skärmen töms
describe("clearTodos", () => {
  test("should empty todosContainers' inner.html", () => {
    //Arrange
    let todos: Todo[] = [new Todo("plugga", false), new Todo("städa", false)];
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    let todoContainer = document.getElementById("todos");

    functions.createHtml(todos);
    console.log(todoContainer?.innerHTML);

    //Act
    functions.clearTodos(todos);

    //Assert
    expect(todoContainer?.innerHTML).toBe("");
  });
});

test("should be able to click", () => {
  //Arrange
  let spy = jest.spyOn(functions, "clearTodos").mockReturnValue();
  document.body.innerHTML = `<button type="button" id="clearTodos">Rensa lista<button>`;
  functions.init();

  //Act
  document.getElementById("clearTodos")?.click();

  //Assert
  expect(spy).toHaveBeenCalled();
});

describe("changeTodo", () => {
  test("should change boolean value from false to true", () => {
    //Arrange
    let todo = new Todo("handla", false);

    //Act
    changeTodo(todo);

    //Assert
    expect(todo.done).toBe(true);
  });

  test("should change boolean value from true to false", () => {
    //Arrange
    let todo = new Todo("handla", true);

    //Act
    changeTodo(todo);

    //Assert
    expect(todo.done).toBe(false);
  });
});

describe("displayError", () => {
  test("should add innerHTML to error-div", () => {
    //Arrange
    //createNewTodo anropar displayError och skickar med(result.error, true)
    //result är av IAddresponse, och är hela addTodo(todoText, todos)
    //så om det är mindre än två bokstäver visas errormsg
    //error = result.error, show = true
    //Arrange

    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let error: string = "errormsg";
    let show: boolean = true;

    //Act
    functions.displayError(error, show);

    //Assert
    expect((document.getElementById("error") as HTMLDivElement).innerHTML).toBe(
      "errormsg"
    );
  });
});

describe("createNewTodo", () => {
  //let result = anropar addTodo(skickar med TodoText, todos)
  /*let result = addTodo(todoText, todos);

  if (result.success) {
    createHtml(todos);*/

  test("should run function createHtml if result.success = true", () => {
    //Arrange
    let spy = jest.spyOn(functions, "createHtml").mockReturnValue();
    let todos: Todo[] = [];
    let todoText: string = "testa";
    // addTodo(todoText, todos);

    //Act
    functions.createNewTodo(todoText, todos);

    //Assert
    expect(spy).toHaveBeenCalled();
  });

  test("should run function displayError if result.success = false", () => {
    //Arrange
    let spy = jest.spyOn(functions, "displayError").mockReturnValue();
    let todos: Todo[] = [];
    let todoText: string = "te";
    addTodo(todoText, todos);

    //Act
    functions.createNewTodo(todoText, todos);

    //Assert
    expect(spy).toHaveBeenCalled();
  });
});

describe("toggleTodo", () => {
  test("should anropa changeTodo", () => {
    //Arrange
    let spyOne = jest.spyOn(functions2, "changeTodo").mockReturnValue();
    let todo = new Todo("text", false);

    //Act
    functions.toggleTodo(todo);

    //Assert
    expect(spyOne).toHaveBeenCalled();
  });
});
