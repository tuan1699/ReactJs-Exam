function TodoInput({ baseURL, todo, handleSaveEditTodo }) {
    const [todoInput, setTodoInput] = React.useState(todo);
    const [isSubmit, setIsSubmit] = React.useState(false);
    const todoInputRef = React.useRef();
  
    React.useEffect(() => {
      setTodoInput(todo);
    }, [todo]);
  
    const addOrEditTodo = (url, method, data) => {
      try {
        setIsSubmit(true);
        fetch(url, {
          method: method,
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) =>
            handleSaveEditTodo({
              ...json,
              isEdit: method === "PUT" ? true : false,
            })
          )
          .finally(() => {
            setTodoInput({ id: null, title: "" });
            setIsSubmit(false);
            todoInputRef.current.focus();
          });
      } catch (error) {
        alert(error);
      }
    };
  
    const handleSubmitTodo = (e) => {
      e.preventDefault();
      const inputText = e.target[0].value.trim();
      if (inputText !== "") {
        if (todoInput.id === null) {
          const data = {
            userId: 1,
            title: inputText,
            completed: false,
          };
          addOrEditTodo(baseURL, "POST", data);
        } else {
          const data = {
            ...todoInput,
            title: inputText,
          };
          addOrEditTodo(baseURL + "/" + data.id, "PUT", data);
        }
      }
    };
  
    const handleInputChange = (e) => {
      const inputText = e.target.value;
      if (inputText.length === 0) {
        setTodoInput((prev) => ({ id: null, title: "" }));
      } else {
        setTodoInput((prev) => ({ ...prev, title: e.target.value }));
      }
    };
  
    return (
      <form className="task-input" onSubmit={(e) => handleSubmitTodo(e)}>
        <i className="fa-solid fa-list-ol"></i>
        <input
          type="text"
          placeholder="Add a New Task"
          value={todoInput.title}
          ref={todoInputRef}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn-submit"
          id="btn-submit"
          style={isSubmit ? { opacity: "0.5" } : {}}
          disabled={isSubmit}
        >
          {todoInput.id === null ? "Add" : "Save"}
        </button>
      </form>
    );
  }
  
  function TodoControls({ handleFilter }) {
    const [filter, setFilter] = React.useState("All");
  
    const handleFilterTodos = (value) => {
      handleFilter(value);
      setFilter(value);
    };
  
    return (
      <div className="controls">
        <div className="filters">
          <span
            id="all"
            className={filter === "All" ? "active" : ""}
            onClick={(e) => handleFilterTodos(e.target.textContent)}
          >
            All
          </span>
          <span
            id="pending"
            className={filter === "Pending" ? "active" : ""}
            onClick={(e) => handleFilterTodos(e.target.textContent)}
          >
            Pending
          </span>
          <span
            id="completed"
            className={filter === "Completed" ? "active" : ""}
            onClick={(e) => handleFilterTodos(e.target.textContent)}
          >
            Completed
          </span>
        </div>
        {/* <button className="clear-btn">Clear All</button> */}
      </div>
    );
  }
  
  TodoControls.propTypes = {
    handleFilter: PropTypes.func,
  };
  
  TodoControls.defaultProps = {
    handleFilter: () => {},
  };
  
  function TodoItem({
    todo,
    baseURL,
    handleEditTodo,
    handleDeleteTodo,
    handleSaveEditTodo,
  }) {
    const [settings, setSettings] = React.useState(false);
    const [isEditing, setIsEditting] = React.useState(false);
    const settingsRef = React.useRef();
  
    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (settingsRef.current && !settingsRef.current.contains(event.target)) {
          setSettings(false);
        }
      };
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }, [todo]);
  
    const handleToggleTodoStatus = (todo) => {
      const data = {
        ...todo,
        completed: !todo.completed,
      };
  
      try {
        setIsEditting(true);
        fetch(baseURL + "/" + data.id, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            handleSaveEditTodo({ ...json, isEdit: true });
          })
          .finally(() => setIsEditting(false));
      } catch (error) {
        alert(error);
      }
    };
  
    const { id, completed, title } = todo;
  
    return (
      <li className="task">
        <label htmlFor={id}>
          <input
            disabled={isEditing}
            type="checkbox"
            id={id}
            defaultChecked={completed}
            onChange={(e) => handleToggleTodoStatus(todo)}
          />
          <p className={completed ? "checked" : ""}>{title}</p>
        </label>
        <div className="settings" ref={settingsRef}>
          <i
            className="fa-solid fa-ellipsis"
            onClick={() => setSettings(!settings)}
          ></i>
  
          <ul className={settings ? "task-menu show" : "task-menu"}>
            <li
              onClick={() => {
                setSettings(false);
                handleEditTodo(todo);
              }}
            >
              <i className="fa-regular fa-pen-to-square"></i>
              <span>Edit</span>
            </li>
            <li
              onClick={() => {
                setSettings(false);
                handleDeleteTodo(todo.id);
              }}
            >
              <i className="fa-regular fa-trash-can"></i>
              <span>Delete</span>
            </li>
          </ul>
        </div>
      </li>
    );
  }
  
  function App() {
    const baseURL = "https://jsonplaceholder.typicode.com/todos";
  
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState({
      id: null,
      title: "",
    });
    const [filter, setFilter] = React.useState("All");
  
    React.useEffect(() => {
      const abortController = new AbortController();
  
      const fetchData = async () => {
        try {
          fetch(baseURL, { signal: abortController.signal })
            .then((response) => response.json())
            .then((json) => setTodos(json));
        } catch (error) {
          alert(error);
        }
      };
  
      fetchData();
  
      return () => {
        abortController.abort();
      };
    }, []);
  
    const handleSaveEditTodo = (data) => {
      if (data) {
        if (data.isEdit) {
          delete data.isEdit;
          setTodos((prev) => {
            return prev.map((todo) => (todo.id === data.id ? data : todo));
          });
        } else {
          setTodos((prev) => [...prev, data]);
        }
      }
    };
  
    const handleFilter = (filter) => {
      setFilter(filter);
    };
  
    const handleEditTodo = (todo) => {
      setTodo(todo);
    };
  
    const handleDeleteTodo = (id) => {
      try {
        fetch(baseURL + "/" + id, {
          method: "DELETE",
        }).then((response) => {
          if (response.status === 200) {
            setTodos((prev) => {
              return prev.filter((todo) => todo.id !== id);
            });
          }
        });
      } catch (error) {
        alert(error);
      }
    };
  
    let todosList;
    if (filter === "Pending") {
      todosList = todos.filter((todo) => !todo.completed);
    } else if (filter === "Completed") {
      todosList = todos.filter((todo) => todo.completed);
    } else {
      todosList = todos;
    }
  
    todosList = [...todosList].reverse();
  
    return (
      <div className="wrapper">
        <TodoInput
          handleSaveEditTodo={handleSaveEditTodo}
          baseURL={baseURL}
          todo={todo}
        />
        <TodoControls handleFilter={handleFilter} />
  
        <ul className="task-box">
          {todosList.length > 0 &&
            todosList.map((todo) => (
              <TodoItem
                key={todo.title}
                todo={todo}
                baseURL={baseURL}
                handleEditTodo={handleEditTodo}
                handleDeleteTodo={handleDeleteTodo}
                handleSaveEditTodo={handleSaveEditTodo}
              />
            ))}
          {todosList.length === 0 && <span>You don't have any todo here</span>}
        </ul>
      </div>
    );
  }
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
  