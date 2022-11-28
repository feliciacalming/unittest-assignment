/**
 *@jest-environment jsdom
 */

import * as functions from "../ts/main";
import * as functions2 from "../ts/functions";
import { Todo } from "../ts/models/Todo";
import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import { addTodo, changeTodo } from "../ts/functions";

console.log("hej");

describe("clearTodos", () => {
  test("should call function removeAllTodos", () => {
    //Arrange
    let spy = jest.spyOn(functions2, "removeAllTodos");
    let todos: Todo[] = [];
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;

    //Act
    functions.clearTodos(todos);

    //Assert
    expect(spy).toHaveBeenCalled();
  });
});

describe("displayError", () => {
  test("should add class 'show' to div", () => {
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let error: string = "errormsg";
    let show: boolean = true;

    //Act
    functions.displayError(error, show);

    //Assert
    expect(
      (document.getElementById("error") as HTMLDivElement).classList.length
    ).toBe(2);
    expect((document.getElementById("error") as HTMLDivElement).className).toBe(
      "error show"
    );
  });

  test("should remove class 'show' from div", () => {
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let error: string = "errormsg";
    let show: boolean = false;

    //Act
    functions.displayError(error, show);

    //Assert
    expect(
      (document.getElementById("error") as HTMLDivElement).classList.length
    ).toBe(1);
    expect((document.getElementById("error") as HTMLDivElement).className).toBe(
      "error"
    );
  });
});

describe("createNewTodo", () => {
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
  test("should call function changeTodo", () => {
    //Arrange
    let spyOne = jest.spyOn(functions2, "changeTodo").mockReturnValue();
    let todo = new Todo("text", false);

    //Act
    functions.toggleTodo(todo);

    //Assert
    expect(spyOne).toHaveBeenCalled();
  });
});

/***  får inte allt med createHtml att funka, får fortsätta med den senare  ***/

// describe("createHtml", () => {
//   beforeEach(() => {
//     jest.resetModules();
//     jest.resetAllMocks();
//   });
//   test("should set item in localstorage", () => {
//     //Arrange
//     let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
//     todos.push(new Todo("bli klar med inlämningsuppgiften", false));
//     // let list: Todo[] = [
//     //   new Todo("köpa mat", false),
//     //   new Todo("städa kök", false),
//     // ];

//     //Act
//     functions.createHtml(todos);
//     console.log("Nu e den " + localStorage.length);

//     //Assert
//     expect(localStorage.length).toBeGreaterThan(0);
//   });

//   // test("should empty innerhtml in container", () => {
//   //   //Arrange
//   //   document.body.innerHTML = ``;
//   //   //Act
//   //   //Assert
//   // });

//   test("should create HTML-elements", () => {
//     //Arrange
//     let todos: Todo[] = [new Todo("testa funktioner", false)];
//     document.body.innerHTML = `<ul id="todos" class="todo"><li id="list-item"></li></ul>`;

//     //Act
//     functions.createHtml(todos);

//     //Assert
//     // expect(document.getElementById("todos")?.innerHTML).toBe(
//     //   "testa funktioner"
//     // );
//     // expect(document.getElementById("todos") as HTMLUListElement.innerHTML).toBe("testa funktioner");
//     expect(document.getElementById("list-item")?.innerHTML).toBe(
//       "testa funktioner"
//     );
//   });

//   /********************** */

//   test("should add class 'todo__text--done' to li", () => {
//     //Arrange
//     let todos: Todo[] = [new Todo("testa funktioner", true)];
//     document.body.innerHTML = `<ul id="todos" class="todo"><</ul>`;
//     let todosContainer: HTMLUListElement = document.getElementById(
//       "todos"
//     ) as HTMLUListElement;

//     //Act
//     functions.createHtml(todos);
//     console.log(document.querySelector("li")?.className);

//     //Assert
//     expect(todosContainer.innerHTML).toBe(
//       `<li class="todo__text--done>testa funktioner</li>`
//     );
//   });
// });

test("should call function 'createNewTodo' on click", () => {
  //Arrange
  let spy = jest.spyOn(functions, "createNewTodo").mockReturnValue();
  document.body.innerHTML = `<form id="newTodoForm"> 
  <input type="text" id="newTodoText"/>
  <button id="create-btn">Skapa</button>
   </form>`;

  //Act
  functions.init();
  document.getElementById("create-btn")?.click();

  //Assert
  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledTimes(1);
});

describe("init", () => {
  test("should call function 'clearTodos' on click", () => {
    //Arrange
    let spy = jest.spyOn(functions, "clearTodos").mockReturnValue();
    document.body.innerHTML = `<button type="button" id="clearTodos">Rensa lista<button>`;
    functions.init();

    //Act
    document.getElementById("clearTodos")?.click();

    //Assert
    expect(spy).toHaveBeenCalled();
  });
});
