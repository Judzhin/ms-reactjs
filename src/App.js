import React, { Component, useEffect } from "react";
import "./App.css";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal";
import AddTodo from "./Todo/AddTodo";
// import TodoList from "./Todo/TodoList";

const TodoList = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./Todo/TodoList"));
      }, 0);
    })
);

// function App() {
//   return (
//     <h1>React tutorial</h1>
//   )
// }

// class App extends Component {
function App() {
  // const [todos, setTodos] = React.useState([
  //   { id: 1, completed: true, title: "Купить хлеб" },
  //   { id: 2, completed: false, title: "Построить дом" },
  //   { id: 3, completed: false, title: "Посадить дерево" },
  // ]);

  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => response.json())
      // .then(json => console.log(json))
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
      });
  }, []);

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

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

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">

        <Modal />

        <h1>React tutorial</h1>
        <AddTodo onCreate={addTodo} />

        {/* {loading && <Loader />} */}

        {loading ? (
          <Loader />
        ) : todos.length ? (
          // <TodoList todos={todos} onToggle={toggleTodo} />
          // <React.Suspense fallback={<p>Please wait ...</p>}>
          <React.Suspense fallback={<Loader />}>
            <TodoList todos={todos} onToggle={toggleTodo} />
          </React.Suspense>
        ) : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
