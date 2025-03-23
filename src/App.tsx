import { FormEvent, useRef, useState, useEffect } from "react";
import "./App.css";
import logo1 from "../src/assets/asd.png";
import Todo, { Todos } from "./componnents/Todo";



const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {

  
  const loadInitialTodos = (): Array<Todos> => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) {
      const parsed = JSON.parse(storedTodos);
      return parsed.map((todo: any) => ({
        ...todo,
        date: new Date(todo.date),
      }));
    }

    const currentDate = new Date();
    return [
      {
        text: "Dinner",
        date: currentDate,
        isActive: false,
      },
      {
        text: "Walk with Coby",
        date: currentDate,
        isActive: false,
      },
      {
        text: "Buy Groceries",
        date: currentDate,
        isActive: false,
      },
      {
        text: "Go to repair shop",
        date: currentDate,
        isActive: false,
      },
    ];
  };

  const [todo, setTodo] = useState<Array<Todos>>(loadInitialTodos);
  const commentRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todo));
  }, [todo]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (commentRef.current && commentRef.current.value) {
      const now = new Date();

      const newTodo: Todos = {
        text: commentRef.current.value,
        date: now,
        isActive: false,
      };
      setTodo([...todo, newTodo]);
      commentRef.current.value = "";
    }
  };

  const handleDelete = (index: number) => {
    const newTodos = [...todo];
    newTodos.splice(index, 1);
    setTodo(newTodos);
  };

  return (
    <>
      <div className="all-in">
        <h1 style={{ color: "#007FDB" }}>Todo</h1>
        <div className="foreveryome">
          <div className="one-wrap">
            <div className="two-sectionns">
              <img id="forlogostick" src={logo1} alt="" />
            </div>


            <div className="thre-sections">
              <form action="" onSubmit={handleSubmit}>
                <input
                  id="first"
                  type="text"
                  ref={commentRef}
                  placeholder="Note"
                />
                <button id="plusbutton">+</button>
              </form>
            </div>

            <div className="fourth-section">
              {todo.length > 0 ? (
                todo.map((todos, index) => (
                  <Todo
                    key={index}
                    text={todos.text}
                    date={todos.date}
                    isActive={todos.isActive}
                    onDelete={() => handleDelete(index)}
                  />
                ))
              ) : (
                <div className="no-todosyet">No todos yet. Add one above!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
