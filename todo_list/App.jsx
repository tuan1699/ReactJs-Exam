const InputTodo = (props) => {
  const [input, setInput] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      title: input,
      isCompleted: false,
    });

    setInput("");
  };

  return (
    <div className="input-todo">
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn-add">
          Add
        </button>
      </form>
    </div>
  );
};

const ItemTodo = ({ todos, deleteTodo, completedTodo, editTodo }) => {
  return todos.map((todo) => {
    return (
      <div key={todo.id} className="todo-item">
        <input
          type="checkbox"
          id={todo.id}
          className="checkbox"
          onChange={() => completedTodo(todo.id)}
          checked={todo.isCompleted ? "checked" : ""}
        />
        <div
          className={
            todo.isCompleted ? "todo-content completed" : "todo-content"
          }
        >
          {todo.title}
        </div>
        <div className="btn-todo" onClick={() => deleteTodo(todo.id)}>
          Del
        </div>
        <div className="btn-todo" onClick={() => editTodo(todo.id)}>
          Edit
        </div>
      </div>
    );
  });
};

const ListTodo = () => {
  const [todos, setTodos] = React.useState(() => {
    const todoList = JSON.parse(localStorage.getItem("todoList"));

    return todoList ?? [];
  });
  const navs = ["All", "Active", "Completed"];
  const [type, setType] = React.useState("All");

  React.useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    let todoFilted;
    if (type === "All") {
      todoFilted = [...todoList];
    } else if (type === "Completed") {
      todoFilted = todoList.filter((todo) => todo.isCompleted === true);
    } else {
      todoFilted = todoList.filter((todo) => todo.isCompleted === false);
    }

    setTodos(todoFilted);
  }, [type]);

  const addTodo = (todo) => {
    setTodos((prev) => {
      const newTodos = [...prev, todo];

      const stringTodos = JSON.stringify(newTodos);
      localStorage.setItem("todoList", stringTodos);

      return newTodos;
    });
  };

  const deleteTodo = (id) => {
    const todosRest = [...todos].filter((todo) => todo.id !== id);
    localStorage.setItem("todoList", JSON.stringify(todosRest));
    setTodos(todosRest);
  };

  const completedTodo = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }

      return todo;
    });

    localStorage.setItem("todoList", JSON.stringify(updateTodos));

    setTodos(updateTodos);
  };

  const editTodo = (id) => {
    const todoEdited = todos.find((todo) => todo.id === id);

    console.log(todoEdited);
    const title = prompt("Enter new title", todoEdited.title);

    todoEdited.title = title;
    const updateTodos = [...todos];

    setTodos(updateTodos);
  };

  return (
    <div className="todo-list">
      <InputTodo onSubmit={addTodo} />
      <div className="filter-field">
        {navs.map((nav) => (
          <div
            className="btn-filter"
            style={type === nav ? { color: "red" } : {}}
            key={nav}
            onClick={() => setType(nav)}
          >
            {nav}
          </div>
        ))}
      </div>
      <ItemTodo
        todos={todos}
        deleteTodo={deleteTodo}
        completedTodo={completedTodo}
        editTodo={editTodo}
      />
    </div>
  );
};

const App = () => {
  return (
    <div className="container">
      <div className="heading">Todo List App</div>
      <ListTodo />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
