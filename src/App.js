import React, { Component } from "react";
import "./App.css";
import TodoList from "./Todo/TodoList";

// function App() {
//   return (
//     <h1>React tutorial</h1>
//   )
// }

// class App extends Component {
function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, completed: true, title: "Купить хлеб" },
    { id: 2, completed: false, title: "Построить дом" },
    { id: 3, completed: false, title: "Посадить дерево" },
  ]);

  // let todos = [
  //   { id: 1, completed: false, title: "Купить хлеб" },
  //   { id: 2, completed: false, title: "Построить дом" },
  //   { id: 3, completed: false, title: "Посадить дерево" },
  // ];

  // render() {
  //   return (
  //    <div className='wrapper'>
  //       <h1>React tutorial</h1>
  //      <TodoList />
  //    </div>
  //   );
  // }

  function toggleTodo(id) {
    // todos = todos.map(todo => {
    //   if (todo.id === id) {
    //     todo.completed = !todo.completed
    //   }
    //   return todo;
    // })
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  return (
    <div className="wrapper">
      <h1>React tutorial</h1>
      <TodoList todos={todos} onToggle={toggleTodo} />
    </div>
  );
}

export default App;
