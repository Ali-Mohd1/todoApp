import { PlusIcon, Trash } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const todos = [
  {
    id: uuidv4(),
    task: "Read JavaScript documentation",
    completed: false,
  },
  {
    id: uuidv4(),
    task: "Write unit tests', completed",
    completed: true,
  },
];
function App() {
  const [todo, setTodo] = useState(todos);
  const [addTodo, setAddTodo] = useState("");

  const handleAddTodo = () => {
    if (addTodo === "") return;
    setTodo((prevValue) => {
      return [{ id: uuidv4(), task: addTodo }, ...prevValue];
    });
    setAddTodo("");
  };

  const handleRemoveTodo = (id) => {
    setTodo((todo) => {
      const filteredTodos = todo.filter((item) => item.id !== id);
      return filteredTodos;
    });
  };

  const handleTodoCompleted = (id) => {
    setTodo((current) => {
      return current.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      });
    });
  };
  return (
    <>
      <div className="flex items-center justify-center h-dvh bg-gray-900">
        <div className="bg-white rounded-lg w-full max-w-4xl p-4 md:p-10">
          <div className="flex items-center justify-between pb-5 border-b border-slate-200 md:flex-row flex-col gap-2">
            <div className="flex items-center gap-5 justify-between md:w-auto w-full">
              <h2 className="text-3xl text-black font-semibold">Todos app</h2>
              <div className="bg-green-200 rounded-lg text-green-700 px-4 py-2">
                <p className="capitalize">Todos: ({todo.length})</p>
              </div>
            </div>
            <div className="flex items-center rounded-lg bg-slate-200 md:w-auto w-full px-2">
              <input
                type="text"
                value={addTodo}
                className="bg-transparent focus:outline-none p-3 pl-0 text-black flex-1"
                placeholder="Add task..."
                onChange={(e) => setAddTodo(e.target.value)}
              />
              <button
                type="button"
                className="rounded-lg bg-green-400 transition-all duration-300 size-9 md:size-10 ease-in-out hover:bg-green-500 flex justify-center items-center text-base text-green-800"
                onClick={handleAddTodo}
              >
                <PlusIcon className="size-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            {todo.length === 0 && (
              <h2 className="text-xl text-black font-bold text-center">
                Your todo is empty
              </h2>
            )}
            {todo.map((todoItem) => (
              <div
                className="flex items-center w-full justify-between rounded-xl bg-slate-100 px-3 md:px-5 py-2 md:py-3"
                key={todoItem.id}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    onChange={() => handleTodoCompleted(todoItem.id)}
                  />
                  <p
                    className={`text-black text-base font-medium capitalize ${
                      todoItem.completed ? "line-through read-only:" : ""
                    }`}
                  >
                    {todoItem.task}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-lg bg-red-400 transition-all duration-300 size-9 md:size-10 ease-in-out hover:bg-red-500 flex justify-center items-center text-red-800 text-xs"
                  onClick={() => handleRemoveTodo(todoItem.id)}
                >
                  <Trash className="size-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
